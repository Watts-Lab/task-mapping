"""Generate McGrath categorical mapping from a task map DataFrame.

This function is robust to either `task` or `task_name` as the identifier column
but otherwise reproduces the original selection logic exactly, including the
column-order dependent behavior (skip the first McGrath column; assume the last
selected column is Conceptual-Behavioral).
"""
import pandas as pd

MCGRATH_OBJECTIVE = "Type 3 and Type 4 (Objective Correctness)"
TYPE4_NAME = "Type 4 (Decision-Making)"
TYPE8_NAME = "Type 8 (Performance)"
CONCEPTUAL_BEHAVIORAL = "Conceptual-Behavioral"


def generate_mcgrath(df: pd.DataFrame) -> pd.DataFrame:
    # Normalize id column to `task_name`
    id_col = None
    if "task_name" in df.columns:
        id_col = "task_name"
    elif "task" in df.columns:
        df = df.rename(columns={"task": "task_name"}).copy()
        id_col = "task_name"
    else:
        raise KeyError("Expected either 'task_name' or 'task' column in DataFrame. Found: %s" % list(df.columns))

    # Identify McGrath dimension columns preserving DataFrame order
    mcgrath_colnames = [
        c for c in df.columns
        if c.startswith("Type ") or c == CONCEPTUAL_BEHAVIORAL
    ]
    if not mcgrath_colnames:
        raise ValueError("No McGrath columns found in DataFrame.")

    mcgrath_categorical_buckets: dict[str, str] = {}

    for i in range(len(df)):
        # Reproduce original behavior: skip the first McGrath column
        task_vec_mcgrath = df[mcgrath_colnames].iloc[i][1:].astype(float).copy()

        # Get Conceptual-Behavioral explicitly by name (robust to column order)
        conceptual_behavioral = float(df.loc[df.index[i], CONCEPTUAL_BEHAVIORAL])

        # Type 4 = inverse of Type 3/4
        if MCGRATH_OBJECTIVE in task_vec_mcgrath.index:
            task_vec_mcgrath[TYPE4_NAME] = 1 - task_vec_mcgrath[MCGRATH_OBJECTIVE]

        # get the naive max task type (could be conceptual)
        task_type = task_vec_mcgrath.idxmax()
        type_val = float(task_vec_mcgrath[task_type])

        # Type 4 must be assigned ONLY if it's not a Generate Task
        # Compare against all but the last element (exclude conceptual)
        if task_type == TYPE4_NAME:
            # Exclude Type 4 itself (original code used positional slice to drop the last element,
            # which after appending Type 4 was effectively dropping Type 4)
            types_wo_type4 = task_vec_mcgrath.drop(labels=[TYPE4_NAME]) if TYPE4_NAME in task_vec_mcgrath.index else task_vec_mcgrath
            if types_wo_type4.idxmax() == "Type 2 (Generate)":
                task_type = "Type 2 (Generate)"

        # Type 8 needs to be psychomotor; if not, take next biggest
        if task_type == TYPE8_NAME and conceptual_behavioral < 0.5:
            task_type = task_vec_mcgrath.drop(labels=[TYPE8_NAME]).idxmax()

        # Max type is Conceptual, reclassify as Type 8
        if task_type == CONCEPTUAL_BEHAVIORAL:
            task_type = TYPE8_NAME

        # Correctness + psychomotor → Type 8 or 3
        if task_type == MCGRATH_OBJECTIVE:
            if type_val >= 0.5 and conceptual_behavioral >= 0.5:
                task_type = TYPE8_NAME
            elif type_val >= 0.5 and conceptual_behavioral < 0.5:
                task_type = "Type 3 (Intellective)"

        mcgrath_categorical_buckets[df.loc[df.index[i], id_col]] = task_type

    # Build categorical DataFrame
    mcgrath_df = pd.DataFrame({
        "task_name": list(mcgrath_categorical_buckets.keys()),
        "mcgrath_category": list(mcgrath_categorical_buckets.values()),
    })

    mcgrath_df_categorical = pd.concat([
        mcgrath_df["task_name"],
        pd.get_dummies(mcgrath_df["mcgrath_category"], dtype=int).add_suffix("_cat"),
    ], axis=1)

    # Merge back to original DF on unified id column
    merged = df.merge(mcgrath_df_categorical, on="task_name")

    # Return merged DataFrame with one-hot mcgrath category columns appended

    return merged