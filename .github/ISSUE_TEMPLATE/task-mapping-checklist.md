---
name: Task mapping checklist
about: Task mapping checklist
title: Task name
labels: 'task'
assignees: ''

---

# Instructions
## First pass
- [ ] Choose a task with a blank `phase` column from [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) and check that it appears to be a valid task entry, e.g., it has a link to a paper and a name , etc., Change the `phase` column to `1` in that sheet and add your github username to the `phase 1 editor` column.
- [ ] Name the issue as the name of the task.
- [ ] Create the issue and assign yourself.
- [ ] Read the linked paper and search through any associated documents or references to find a root source of the task. If there is not enough information to document the task and you must email the authors, add comments to this issue documenting that process.
- [ ] Complete the [claim survey](https://upenn.co1.qualtrics.com/jfe/form/SV_7850rqJDtvCiLHM) for the paper after reading it. 
- [ ] Make a new branch named the task name and create a new file in the folder [`tasks`](https://github.com/Watts-Lab/task-mapping/tree/master/tasks) named `{task name}.md`. Start by populating it with the [task-mapping template](https://github.com/Watts-Lab/task-mapping/blob/master/task-representation.md) content. When saving this, be sure to commit to your new branch (if you're in master you won't be able to commit and only be able to create a pull request, instead, do this from your branch so you can commit). 
- [ ] Add images to the `images` folder in the task branch and to the text with the format `![Alt text](images/task_name_image_name)`.
- [ ] Add a pull request (PR) between your new branch and `master` with the name `{task name}` and the url for this issue in the PR message. If you realize you need to make more changes to task files you can commit them to the task branch and the pull request should update automatically.
- [ ] Get the URL to the main file in your branch and put it in the [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) sheet in the `task summary url` column.


## Second pass (a different person does this)
- [ ] Add yourself as a secondary assignee to the issue. Also, on the [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) sheet, change the `phase` column to `2` in that sheet and add your GitHub username to the `phase 2 editor` column.
- [ ] Read the paper and search through any associated documents or references to find a root source of the task. 
- [ ] Complete the [claim survey](https://upenn.co1.qualtrics.com/jfe/form/SV_7850rqJDtvCiLHM) for the paper after reading it. 
- [ ] Check the PR, making modifications wherever you see necessary to ensure that the task is adequately documented.
- [ ] Check that the template renders correctly by previewing and making any necessary adjustments.
- [ ] Submit a passing review, update the issue, and move on to the next steps.

## Task mapping
- [ ] First pass assignee: Complete the [task mapping survey](https://task-robot.glitch.me/survey) entering your GitHub username as the user name, and the task file name as the task name.
- [ ] Second pass assignee: Complete the [task mapping survey](https://task-robot.glitch.me/survey) entering your GitHub username as the user name, and the task file name as the task name.
- [ ] Both assignees: meet to review the [agreement page](https://task-robot.glitch.me/agreement), selecting this task. 
- [ ] Review major disagreements between your responses to check if any are challenging to reconcile. [Schedule a time for both of you to meet with Mark](whiting.me/meet), otherwise, move forward.
- [ ] First pass assignee: In a second browser window start a new [task mapping survey](https://task-robot.glitch.me/survey), this time entering the first then second assignee's GitHub usernames separated by ` | `, e.g., `markwhiting | djwatts`, and the task file name as the task name.
- [ ] Fill in all the agreed responses, and the resolved conflicts.

## Wrapping up
- [ ] Merge the PR, if you see options to also delete the associated fork, do that too.
- [ ] Get the URL to the file in [`master/tasks`](https://github.com/Watts-Lab/task-mapping/tree/master/tasks) and replace the link in the [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) sheet `task summary url` column.
- [ ] Close this issue.
