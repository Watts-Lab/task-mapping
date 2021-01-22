---
name: Task mapping checklist
about: Task mapping checklist
title: Task name
labels: ''
assignees: ''

---

# Instructions
## First pass
- [ ] Choose a task with a blank `phase` column from [tasks](https://docs.google.com/spreadsheets/d/1r6JphHOM8K_dCrdX9ESx_05oYGtPVyVejxKBL1B3VL0/edit#gid=1644218186) and check that it appears to be a valid task entry, e.g. it has a link to a paper and a name etc. Change the `phase` column to `1` in that sheet.
- [ ] Name this issue as the name of the focal task, and remove this line.
- [ ] Create the issue and assign yourself.
- [ ] Read the linked paper and search through any associated documents or references to find a root source of the task. 
- [ ] Edit the issue completing the template below (drag and drop images into the editor, but also store them on your computer too for future use) (you can use the `Preview` mode to see how it will look. 
- [ ] Make a new document in the folder [tasks folder](https://github.com/Watts-Lab/task-mapping/tree/master/tasks) named `{task name}.md` and put the contents of the template below into it (the part that starts with "Summary").
- [ ] Save it and add a pull request with the name and message `{task name}`

## Second pass (a different person does this)
- [ ] Add yourself as a secondary assignee to the issue.
- [ ] Read the paper and search through any associated documents or references to find a root source of the task. 
- [ ] Check the PR, making modifications wherever you see necessary to ensure that the task is adequately documented.
- [ ] Check that the template renders correctly by previewing and making any necessary adjustments.
- [ ] When ready, submit a passing review.

## Task mapping (flow in progress contact Mark before starting)
- [ ] First pass assignee: Complete the task mapping survey for this task
- [ ] Second pass assignee: Complete the task mapping survey for this task
- [ ] Reach agreement (check differences, and discuss until both agree on an answer)
- [ ] Merge and close PR.

- - - 
# Summary
> Replace this entire line with a high level summary that presents the main idea of the task.

# References
> Provide a full reference and link to the main paper and any subsequent papers used in the process of finding details about the task

# Stimuli
- The visual components via screenshots
  > Document or generate the visual stimuli seen by participants when performing this task. Provide screenshots or illustrations.
- Materials for alternative versions of the experiment (e.g. the set of eyes in RME)
  > If the task has multiple versions based on changing stimuli, if possible, provide a complete set, or a specification of the rules for generating that set. For example, in the RME task, provide all of the eye images, and a table of terms.  
  > In the case that the complete set is not possible, provide enough unique examples that the reference version of the task experiment could be completed. If there are various levels of the task, e.g., in Sudoku, include a similarly sized sample of each level.

# Procedure
- A task flow describing the stages a participant goes through and a formal specification of any conditional or complex relationships therein
  > List the steps that make up the task. This could include a training protocol, pre and post surveys, task rounds, etc.
  > Describe the relationship between the steps. By default they are assumed to be chronological and have no interdependencies, but if they are not chronological, e.g., a choice changes the order of the steps, that should be described in full detail. Similarly, if the steps are interdependent, e.g., performance on one step influences what is seen on another step, this should be described in full detail.
- A description of roles if relevant to the task.
  > If relevant, describe how roles are assigned and used in the task. List all rolls and list how the experience for each roll differs from others.
- Complete instructions shown to participants at each stage of the task
  > Write the complete instructions used from the start to the end of the experiment. This should include any instruction provided on each of the steps. If instructions have step interdependence, or are role specific, describe that in full detail.

# Criteria
- A formal specification of how performance is evaluated based on the specific materials and the teams actions in a given trial
  > Write out how performance is calculated for this task. There may be more than one performance metric, and in that case, list all the ones used in the reference papers. These could be simple metrics, e.g., completion time in Sudoku, while others may involve an equation, a key (e.g., RME), or an algorithm, to judge the correct answer.
- A formal specification of the incentives for participation.
  > Write how participants are incentivized (payments, or other incentives) and how these incentives are calculated for the task.
