---
name: Task implementation template
about: Directions to implement task
title: "🕹️ TASK_NAME"
labels: task
assignees: ""
---

Here's the extracted [task summary](https://github.com/Watts-Lab/task-mapping/tree/master/tasks/summaries), and an [extended writeup](https://github.com/Watts-Lab/task-mapping/tree/master/tasks/original-task-writeups), which includes relevant resources.

- [ ] Review the extracted task in task and ask the person in our group who authored the extracted version or @markwhiting if there are any questions or aspects that can't be understood from the provided materials.
- [ ] Design the task to be playable by an individual, a group of 3, or a group of 6 players with a near free-for-all interaction paradigm (try the Room Assignment task as a good example of this).
- [ ] Create 4 instances of the game: a demo round, an easy round, a medium round and a hard round. People will play the demo first to learn the main mechanics of the task. The remaining three rounds will be in random order.
- [ ] Branch off [`main`](https://github.com/Watts-Lab/multi-task-empirica/tree/main) to build the task.
- [ ] Write text intro for task - use task template for starting point. Each task should have valid instructions and experience for individual and group conditions. They can be essentially the same they just need to make sense for either experiment size. See [#118](https://github.com/Watts-Lab/multi-task-empirica/issues/118) for more discussion. Optionally: If the game is comlex, feel free to add additional dynamic steps so players understand the game BEFORE playing it.
- [ ] Ask @markwhiting and @shapeseas to review the instructions.
- [ ] Ensure that chat is correctly and consistently removed for solo experience.
- [ ] Determine scoring for task, using the following conventions, as discussed in [#103](https://github.com/Watts-Lab/multi-task-empirica/issues/103):
    - `player.score` which holds the cumulative score. This is updated in stageEnd() and this is the thing displayed on top of the chat. This translates into how much money they'll get paid. It is possible to store it for the game (e.g., game.score) but maybe future tasks will involve different participants in the same team to accumulate different scores. So for that reason, I say we keep it in player.score.
    - `player.stage.scoreArr` which holds all of the scores of the intermediate solutions. So this will be updated with each "move" in the task.
    - `player.stage.score` which should hold the final score of the player on the particular task. This updates on stageEnd() and then its value gets added to player.score to increment the cumulative score.
    - `player.stage.scoreFeedback` which will be displayed as real-time feedback about the score. For example, in the room assignment, we give participants real-time feedback about their performance. But we do not do that for all tasks.
- [ ] Create a pull request back to [`main`](https://github.com/Watts-Lab/multi-task-empirica/tree/main) once the task is ready for review.

Use comments here for discussion and notes. If you run into issues that others in the group might have faced, feel free to ask in [WattsLab `#ht-task-implementation`](https://wattslab-workspace.slack.com/archives/C02HXD0MQL8). If you're facing something that seems like a new technical problem, or a technical problem that should be fixed in Empirica core, ask in [Empirica `#csslab-upenn`](https://empirica-ly.slack.com/archives/C02LQKZV6KT).
