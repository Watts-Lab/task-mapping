"""Generate McGrath categorical mapping from data/task_map.csv

This was previously part of analysis_group_advantage; it belongs with
task-space processing because it derives categorical task metadata used
by multiple downstream analyses.
"""
from pathlib import Path
import pandas as pd


def generate_mcgrath(task_map_path: Path, out_path: Path):
    df = pd.read_csv(task_map_path)

    # find mcgrath-like columns: any column that looks like a type or 'Conceptual-Behavioral'
    mcgrath_colnames = [c for c in df.columns if c != 'task']

    mcgrath_categorical_buckets = {}

    for i in range(len(df)):
        # select the row as a Series; drop the task column
        task_vec_mcgrath = df.loc[i, mcgrath_colnames].copy()

        # the last one is Conceptual-Behavioral (assumption from user snippet)
        conceptual_behavioral = float(task_vec_mcgrath.iloc[-1])

        # create Type 4 as inverse of Type 3 if both exist (user logic)
        if 'Type 3 and Type 4 (Objective Correctness)' in task_vec_mcgrath.index:
            task_vec_mcgrath = task_vec_mcgrath.copy()
            task_vec_mcgrath.loc['Type 4 (Decision-Making)'] = 1 - float(task_vec_mcgrath.loc['Type 3 and Type 4 (Objective Correctness)'])

        task_name = df.loc[i, 'task']
        task_type = task_vec_mcgrath.idxmax()
        type_val = float(task_vec_mcgrath.loc[task_type])

        # Type 4 must be assigned ONLY if it's not a Generate Task
        if task_type == 'Type 4 (Decision-Making)':
            if task_vec_mcgrath[:-1].idxmax() == 'Type 2 (Generate)':
                task_type = 'Type 2 (Generate)'

        # Type 8 needs to be psychomotor, take next biggest category if it isn't
        if task_type == 'Type 8 (Performance)' and conceptual_behavioral < 0.5:
            if 'Type 8 (Performance)' in task_vec_mcgrath.index:
                task_vec_mcgrath = task_vec_mcgrath.drop(labels=['Type 8 (Performance)'])
                task_type = task_vec_mcgrath.idxmax()

        # Max type is Conceptual-Behavioral, reclassify as Type 8
        if task_type == 'Conceptual-Behavioral' or task_type == 'Conceptual-Behavioral':
            task_type = 'Type 8 (Performance)'

        # Correct answer and psychomotor component, reclassify as Type 8 or Type 3
        if task_type == 'Type 3 and Type 4 (Objective Correctness)':
            if type_val >= 0.5 and conceptual_behavioral >= 0.5:
                task_type = 'Type 8 (Performance)'
            elif type_val >= 0.5 and conceptual_behavioral < 0.5:
                task_type = 'Type 3 (Intellective)'

        mcgrath_categorical_buckets[task_name] = task_type

    mcgrath_df = pd.DataFrame({
        'task': list(mcgrath_categorical_buckets.keys()),
        'mcgrath_category': list(mcgrath_categorical_buckets.values())
    })

    mcgrath_df_categorical = pd.concat([
        mcgrath_df['task'],
        pd.get_dummies(mcgrath_df['mcgrath_category'], dtype=int).add_suffix('_cat')
    ], axis=1)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    mcgrath_df_categorical.to_csv(out_path, index=False)
    print('Wrote', out_path)


if __name__ == '__main__':
    root = Path(__file__).resolve().parent.parent
    task_map = root / 'outputs' / 'processed_data' / 'task_map.csv'
    out = root / 'outputs' / 'processed_data' / '20_task_map_mcgrath_manually_updated.csv'
    generate_mcgrath(task_map, out)
