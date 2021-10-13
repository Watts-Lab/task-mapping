# Summary
Participants are given a suggested starting point for a lemonade stand they are supposed to operate.  They can then change the price, lemon content, and sugar content(price, lemon content and sugar content are continuous variables) as well as the location of the stand and the color of the lemonade(location and color are discrete variables).  Their goal is to maximize their revenue by adjusting these variables.  Participants start either start the experiment alone and after the first half of the experiment is completed they repeat with a group, or they start in a group and then repeat alone.

# References
Sommer, Svenja C., Elliot Bendoly, and Stylianos Kavadias. "How do you search for the best alternative? Experimental evidence on search strategies to solve complex problems." Management Science 66.3 (2020): 1395-1420.

Link: https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2018.3247?casa_token=YG2RAjJFY-UAAAAA:f7t0xFuOIBD8QoEdIkxZEEgPr4O50DSTuSATCgjsjnWX4EF3CgJmuLuGeswhp8AvM_QOVhR5AQ

Referenced for Experiment:
Ederer, Florian, and Gustavo Manso. "Is pay for performance detrimental to innovation?." Management Science 59.7 (2013): 1496-1513.

Link: https://pubsonline.informs.org/doi/pdf/10.1287/mnsc.1120.1683?casa_token=Rl6cTL3welQAAAAA%3AOaSbmiyqSm7uZxtZ5xzGdKzOzaPDXFTgwPzJGtk9VszT4o7lkEvazwyJVQO5PKf2q__RYBxV&


# Stimuli
## The visual components
N/A
## Materials for alternative versions of the experiment 
There are three complexity levels for participants to partake in, the total participant pool is broken up into thirds and evenly distributed over the different complexities.  The different levels change the solution landscape to make it easier or harder for the participants.  They are as follows:
- Low Complexity: the effect of the location selected was turned into a step function for performance (i.e. the business district will perform better than the stadium and the school will perform better than the busniss district).
- Medium Complexity: this uses the solution landscape from Ederer and Manso(2013). (https://pubsonline.informs.org/doi/pdf/10.1287/mnsc.1120.1683?casa_token=Rl6cTL3welQAAAAA%3AOaSbmiyqSm7uZxtZ5xzGdKzOzaPDXFTgwPzJGtk9VszT4o7lkEvazwyJVQO5PKf2q__RYBxV&)
- High Complexity: Added an addition local optima, so there are now two local optima per location.

The graphs below show the landscapes for the solutions for the best performing color choice.  
![image](https://github.com/Watts-Lab/task-mapping/blob/Iterative-Lemonade-Stand/images/Iterative_lemonade_stand_complexity_levels.png)

# Procedure
## Steps
1) Participants are designated to arrive at the lab at specific times in groups of three.
2) Subjects are all briefed on the computer interface and how to use the analyst commentary to their advantage and are given a brief questionnaire containing questions about their demographic and familairity with a set of college level courses.
3) They are then given a primer on optimization and the impact of multimodal complexity on the solution search in objective terrains, followed by a short quiz to test comprehension.  If they did not answer the questions correctly, they were given a more thorough explanation and asked more comprehension questions, if confusion persisted they were dismissed.
4) Approximately half the participants were first subjected to independent(nominal) work, where they were given their own terminal, and instance of the problem.  They were allowed no communication.  After phase 1(15 minutes of work) had been completed, they were put into a collaborative structure for another 15 minutes in an attempt to work towards a solution.
    - The other half started in a group setting, where they first worked collaboratively for phase 1, then worked individually to finish the task.
5) Participants then began to work towards solution development.
    - While working for a solution participants can manipulate 5 managerial levers in an attempt to maximize their profits.
        - Three bounded continuous variables: price, percentage of lemon content, percentage of sugar content
        - Two discrete variables: 2 choices of color and 3 choices of location(Business District, School, Stadium)
    - Participants can also use a “market analyst” which is a very basic AI that evaluates proposed solution and provides feedback.  Feedback is limited to positive comments when the most recent solution shows improvement when compared to previous solutions.
        - “For example, if an improvement in performance associated with a change in the lemon content is achieved, the analyst might state: “I think there’s a good chance what you’re doing with lemon content could push us to higher profitability” “
    - Participants can also view a log of solution history that stores all solutions they have submitted.
6) After Phase 2 was completed participants were given a questionnaire and their answers were recorded.

## Roles 
Participants are to act as the owner the of the lemonade stand

## Instructions
When participants are in the nominal setting, they are instructed to not communicate with each other at all, and each participant worked on their own interface. In the collaborative setting, they worked with their group on a single interface.  Whatever setting they started in, participants would work for 15 minutes(phase 1), then switch to the other setting(nominal -> collaborative, collaborative -> nominal) they would end the task by spending 15 minutes working towards a solution(phase 2).
![image](https://github.com/Watts-Lab/task-mapping/blob/Iterative-Lemonade-Stand/images/Iterative_lemonade_stand_lab_protocol.png)

Provided below is an example of the interface.  It is described as a simple excel program that allows users to tweak five variables(price, lemon content, sugar content, color and location).  This worked over top of the fixed perfomance landscapes that are described in the "Materials for alternative versions of the experiment" section.  All solutions submitted by the participant were recorded, and feedback was given if the changes made performed better. The feedback would note if it was the best performance so far.  This is designed to mimic real market feedback.  It is important to note that if the changes did not have a positive impact on profits, no feedback was given.
![image](https://github.com/Watts-Lab/task-mapping/blob/Iterative-Lemonade-Stand/images/Iterative_lemonade_stand_interface.png)  

After the experiment was completed, participants were given the following short questionnaire, and they recorded their answers.  
![image](https://github.com/Watts-Lab/task-mapping/blob/Iterative-Lemonade-Stand/images/Iterative_lemonade_stand_questionnaire.png)

# Criteria
## Performance calculation
The revenue generated by the lemonade stand at the end of phase two is the main criteria for determining the success of a group or individual.  These were compared for between the two structures (ie. starting nominal and finishing in the collaborative structure, vs starting in the collaborative and finishing in the nominal structure).

## Incentives
Pay for performance scheme was used.  Participants were paid a $5 base, and could earn up to an additional $13 based on their performance in one of the two phases.  Participants were told that the specific phase their additional compensation would be calculated from would be chosen by a coin flip(heads meaning the nominal structure phase, tails being the collaborative structure phase).  This meant that if an individual felt that they did particularly well in the nominal phase, should have been incentivized to share this with their group in the collaborative phase. Or if they started in the group, and felt that a good solution was found, they would be incentivized to reenter that work.
