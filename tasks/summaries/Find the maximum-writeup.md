# Find the maximum

Mapped by: joycewang3 

## 1. Stimulus Complex 
Participants see an empty text box where they can enter numbers.

Behind the scenes, there is a hidden function. This hidden function has a maximum value --- for example, the function y = -x^2 reaches its maximum when x = 0. Participants know nothing about the hidden function; they only see the text box.

When participants enter numbers into the text box, the system will give them feedback about the value of the function at that point. For example, suppose that the hidden function is y = -x^2 and the participant enters 2. Then the system will tell them that the value is -4, since this is the value of -x^2. If the participant enters -5, the system will tell them that the value is -25.

As they make guesses, participants see a log, which shows their guesses so far, the feedback they previously received, and how many guesses they have remaining.

## 2. Goal Directives 
The goal is to correctly guess the maximum value of the hidden function after a limited number of guesses (for which there is feedback after each guess).

Every problem has an objectively correct answer --- the mathematical maximum of that function. However, participants are not told that they have found the correct answer even when they submit it as their guess. For example, if the hidden function is y = -x^2, the correct answer is 0. A participant who submits 0 will simply be told that the value of the function at that point is also 0; they will not be told that this is the true maximum. This means that a participant will never be truly sure that their guess is correct; they only know that it is the best one of their guesses so far. Instead, the participant will just get their fixed number of tries, after which they are required to submit their final guess.

Participants are scored based on how close their final guess is to the true maximum. If the answer is 0, then the participant gets the highest possible number of points if they guess 0; a participant who guesses 2 will get a higher score than someone whose final guess is 10. Participants aim to get as close as possible to the correct answer.

Finally, if participants are working together, each participant gets a limited number of guesses, and then they decide their final guess as a team.

## 3. Allowed Group Processes 
The following details are not the main parts of the task, but rather additional information about ways in which participants could interact.

### Skills 
Mathematical ability, analytical skill, quantitative skill

### UI-UX Allowed Processes
Participants can see enter the guess, see the history of guesses and the results of each round, and see and review instructions of the task. The screen displays an alert before the participant submits the final guess. Communication mechanism for group discussion.

### Other Allowed Processes
NA

## GitHub Link 
https://github.com/Watts-Lab/task-mapping/blob/master/tasks/Find%20the%20Maximum.md
