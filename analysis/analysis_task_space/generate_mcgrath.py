"""Generate McGrath categorical mapping from data/task_map.csv
"""
import argparse
from pathlib import Path
import pandas as pd

MCGRATH_OBJECTIVE = "Type 3 and Type 4 (Objective Correctness)"
TYPE4_NAME = "Type 4 (Decision-Making)"
TYPE8_NAME = "Type 8 (Performance)"
CONCEPTUAL_BEHAVIORAL = "Conceptual-Behavioral"

def infer_task_col(df: pd.DataFrame) -> str:
    if "task" in df.columns:
        return "task"
    if "task_name" in df.columns:
        return "task_name"
    raise ValueError("Expected a task identifier column named 'task' or 'task_name'.")

def infer_mcgrath_cols(df: pd.DataFrame) -> list[str]:
    cols = []
    for c in df.columns:
        if c.startswith("Type ") or c == CONCEPTUAL_BEHAVIORAL:
            cols.append(c)
    required = {MCGRATH_OBJECTIVE, CONCEPTUAL_BEHAVIORAL}
    missing = [c for c in required if c not in cols]
    if missing:
        raise ValueError(f"Missing required McGrath columns: {missing}")
    # Ensure Conceptual-Behavioral is last to mimic original logic expectations
    cols = [c for c in cols if c != CONCEPTUAL_BEHAVIORAL] + [CONCEPTUAL_BEHAVIORAL]
    return cols

def choose_mcgrath_category(s: pd.Series) -> str:
    s = s.astype(float).fillna(0.0)
    conceptual_behavioral = float(s.get(CONCEPTUAL_BEHAVIORAL, 0.0))

    s_ext = s.copy()
    s_ext[TYPE4_NAME] = 1.0 - float(s.get(MCGRATH_OBJECTIVE, 0.0))

    # naive max
    task_type = s_ext.idxmax()
    type_val = float(s_ext[task_type])

    # Type 4 must be assigned ONLY if it's not a Generate Task
    s_no_conceptual = s_ext.drop(labels=[CONCEPTUAL_BEHAVIORAL], errors="ignore")
    if task_type == TYPE4_NAME and s_no_conceptual.idxmax() == "Type 2 (Generate)":
        task_type = "Type 2 (Generate)"

    # Type 8 needs to be psychomotor, take next biggest category if it isn't
    if task_type == TYPE8_NAME and conceptual_behavioral < 0.5:
        s_wo_type8 = s_ext.drop(labels=[TYPE8_NAME], errors="ignore")
        task_type = s_wo_type8.idxmax()

    # Max type is Conceptual, reclassify as Type 8
    if task_type == CONCEPTUAL_BEHAVIORAL:
        task_type = TYPE8_NAME

    # Correct answer and psychomotor component, reclassify as Type 8 or Type 3
    if task_type == MCGRATH_OBJECTIVE:
        if type_val >= 0.5 and conceptual_behavioral >= 0.5:
            task_type = TYPE8_NAME
        elif type_val >= 0.5 and conceptual_behavioral < 0.5:
            task_type = "Type 3 (Intellective)"

    return task_type

def generate_mcgrath(df: pd.DataFrame) -> pd.DataFrame:
    task_col = infer_task_col(df)
    mcgrath_cols = infer_mcgrath_cols(df)

    # Compute one category per unique task
    df_task = df[[task_col] + mcgrath_cols].drop_duplicates(subset=[task_col]).reset_index(drop=True)
    categories = []
    for _, row in df_task.iterrows():
        categories.append(choose_mcgrath_category(row[mcgrath_cols]))

    out = df_task[[task_col]].copy()
    out["mcgrath_category"] = categories
    one_hot = pd.get_dummies(out["mcgrath_category"], dtype=int).add_suffix("_cat")
    out = pd.concat([out[[task_col]], one_hot], axis=1)

    # Validation: exactly one hot per task
    cat_cols = [c for c in out.columns if c.endswith("_cat")]
    assert len(cat_cols) > 0, "No *_cat columns generated."
    rowsums = out[cat_cols].sum(axis=1)
    assert rowsums.eq(1).all(), "Each task must have exactly one category set to 1."

    # Normalize task column name to 'task' for downstream merge
    if task_col != "task":
        out = out.rename(columns={task_col: "task"})

    return out

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--in_csv",
        default="outputs/processed_data/condition_level_group_advantage_with_ivs.csv",
        help="Input CSV with McGrath scores"
    )
    parser.add_argument(
        "--out_csv",
        default="outputs/processed_data/condition_level_group_advantage_with_ivs_and_categories.csv",
        help="Output CSV with categories merged"
    )
    args = parser.parse_args()

    in_path = Path(args.in_csv)
    out_path = Path(args.out_csv)

    base = pd.read_csv(in_path)
    mcgrath_ohe = generate_mcgrath(base)

    merged = base.merge(mcgrath_ohe, on="task", how="left")
    # Validate merged one-hot on condition-level rows
    cat_cols = [c for c in mcgrath_ohe.columns if c.endswith("_cat")]
    if cat_cols:
        rowsums = merged[cat_cols].sum(axis=1)
        assert rowsums.eq(1).all(), "Each merged row must have exactly one category set to 1."

    merged.to_csv(out_path, index=False)

if __name__ == "__main__":
    main()