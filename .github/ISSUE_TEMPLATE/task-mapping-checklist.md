---
name: Task mapping checklist
about: Task mapping checklist
title: Task name
labels: 'task'
assignees: ''

---

# Instructions
## First pass
- [ ] Choose a task with a blank `phase` column from [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) and check that it appears to be a valid task entry, e.g. it has a link to a paper and a name etc. Change the `phase` column to `1` in that sheet and add your github username to the `phase 1 editor` column.
- [ ] Name the issue as the name of the task.
- [ ] Create the issue and assign yourself.
- [ ] Read the linked paper and search through any associated documents or references to find a root source of the task. 
- [ ] Make a new branch named the task name and create a new file in the folder [tasks](https://github.com/Watts-Lab/task-mapping/tree/master/tasks) named `{task name}.md`. Start by populating it with the [task-mapping template](https://github.com/Watts-Lab/task-mapping/blob/master/task-representation.md) content. When saving this, be sure to commit to your new branch (if you're in master you won't be able to commit and only be able to create a pull request, instead, do this from your branch so you can commit). 
- [ ] Add images to the `tasks/images` folder and to the text with the format `![Alt text](images/task_name_image_name)`.
- [ ] Add a pull request between your new branch and `master` with the name `{task name}` and a link to this issue in the message.


## Second pass (a different person does this)
- [ ] Add yourself as a secondary assignee to the issue. Also, on the [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) sheet, change the `phase` column to `2` in that sheet and add your github username to the `phase 2 editor` column.
- [ ] Read the paper and search through any associated documents or references to find a root source of the task. 
- [ ] Check the PR, making modifications wherever you see necessary to ensure that the task is adequately documented.
- [ ] Check that the template renders correctly by previewing and making any necessary adjustments.
- [ ] When ready, submit a passing review, and request a review from `markwhiting`.

## Task mapping (flow in progress contact Mark before starting)
- [ ] First pass assignee: Complete the task mapping survey for this task
- [ ] Second pass assignee: Complete the task mapping survey for this task
- [ ] Reach agreement (check differences, and discuss until both agree on an answer)
- [ ] Merge the PR.
- [ ] Get the URL to the file and put it in the [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) sheet in the `task summary url` column. Then close this issue.
