# Summary
Participants were asked to complete a sequence of 20 estimation tasks where each task consisted of estimating the correlation of a scatter plot. The purpose of the experiment is to identify the role of dynamic networks and feedback in fostering adaptive ‘wisdom of crowds.’

# References
Main paper: https://arxiv.org/pdf/1805.04766.pdf

# Stimuli
## The visual components
![image](https://user-images.githubusercontent.com/74941183/153737967-e026c4e4-fd6a-47d8-9d71-cd69a364eba6.png)

Panel (A) illustrates examples of the scatter plots used in the experiment. For any given round, all participants saw plots that shared an identical true correlation, but signal quality could differ among them. Task signal quality, therefore, could be varied systematically at the individual level by varying the number of points, linearity, and the existence of outliers.

![image](https://user-images.githubusercontent.com/74941183/153737973-f6ee59cd-41e1-4371-891c-2d2dca99c13e.png)

## Materials for alternative versions of the experiment 
![image](https://user-images.githubusercontent.com/74941183/153737949-c2b1193e-e3fe-4c61-8f1a-3867e2d3fb8d.png)

Panel (B) shows an illustration of the experimental design. In experiment 1, the feedback level is fixed (i.e., full-feedback), and network plasticity is manipulated (i.e., static network versus dynamic network). In experiment 2, plasticity is fixed (i.e., always dynamic network), and feedback is manipulated (i.e., no-feedback, self-feedback, and full-feedback). The colors of the nodes represent the signal quality. Each participant experienced a constant signal quality level across the first ten rounds; then, at round eleven, we introduced a shock by reshuffling signal qualities to new levels that stayed constant for the remaining ten rounds.

# Procedure
## Steps
- Participants were randomly allocated to groups of 12. Each group was randomized to one of three treatment conditions in experiment 1 where the network plasticity is varied or four treatment conditions in experiment 2 where the quality of feedback is varied.
- At every round, all plots seen by participants shared an identical actual correlation, but the quality of the signal could differ among them
- Each participant experienced a constant signal quality level across the first ten rounds; then, at round eleven, they introduced a shock by reshuffling signal qualities to new levels that remained constant after that.
- Participants were not informed about the signal quality they or their peers faced.

Experiment 1 (E1): Varies network plasticity; holds feedback

In the first experiment, each group was randomized to one of three treatment conditions: a solo condition, where each individual solved the sequence of tasks in isolation; a static network condition, in which participants were randomly placed in static communication networks; and a dynamic network condition, in which participants at each round were allowed to select up to three neighbors to communicate with. Across all conditions, at each round, participants were initially asked to submit an independent guess. Then those in static and dynamic network conditions entered a social exposure stage, where they could observe the answers of their network peers, update their own, and see peers’ updated beliefs in real-time. After submitting a final guess, participants in all conditions were given performance feedback. Lastly, those in the dynamic network condition were allowed to revise which peers to follow in subsequent rounds.

Experiment 2 (E2): Varies feedback; holds dynamic network

In the second experiment, each group was randomized to one of four treatment conditions: a solo condition, where each individual solved the sequence of tasks in isolation, but this time they were not provided with any performance feedback; a no-feedback condition, in which participants placed in a network but were not shown any performance feedback; a self-feedback condition, in which participants were placed in a network and shown their own performance feedback; and a full-feedback condition, in which participants were placed in a network and shown performance feedback of all participants (including their own). Participants in all conditions in E2 were allowed to revise which peers to follow in subsequent rounds, except for the solo conditions, which acted as the baseline.

## Roles 
N/A

## Instructions
Example of the instructions used in the experiments:
![image](https://user-images.githubusercontent.com/74941183/153737976-c66f9ff2-9a3b-4779-ad64-1454d2d41325.png)

![image](https://user-images.githubusercontent.com/74941183/153737981-29e5787e-8861-4731-8a56-367eb2897b6a.png)

![image](https://user-images.githubusercontent.com/74941183/153737986-3997085a-044d-4f5e-90a9-8a03040210fe.png)

Participants in all conditions make independent guesses about the correlation of two variables independently.

![image](https://user-images.githubusercontent.com/74941183/153737998-4a5f0cce-14d8-4029-b039-1a73851904ff.png)

Participants in the network condition engage in a an active social learning phase, where they are exposed to their ego-network’s estimates in real time.

![image](https://user-images.githubusercontent.com/74941183/153738003-bc23eafd-8e9d-438d-8e20-53e9fd317c67.png)

After each task round, participants in the feedback conditions see the appropriate level of feedback for the conditions. This figure illustrates the dynamic network condition with full feedback (i.e., as opposed to no-feedback or only self-feedback). In all of the experiments, the maximum number of outgoing connections is three.

# Criteria
## Performance calculation
Performance is calculated based on the accuracy of the participant's final estimate.

## Incentives
Monetary prizes (up to $10) were awarded in proportion to performance at the end of the experiment. Participants were recruited via a MTurk HIT, and remained anonymous for the entire study.
