# Summary
To investigate the role of social influence in joint decision making, dyads of participants performed a visual oddball search task together.

# References
Main Paper: https://psycnet.apa.org/fulltext/2015-45614-001.html

Supplemental Materials: https://supp.apa.org/psycarticles/supplemental/xhp0000145/xhp0000145_supp.html

# Stimuli
## The visual components
![imagesVisual_Oddball_Target_205](https://user-images.githubusercontent.com/89650778/132869370-e674fe0f-4937-4441-9187-6e065a478c20.jpg)

# Procedure
## Steps
1. Both dyad members sat in the same room and performed a visual search for a contrast odd ball on stimuli presented on separate monitors. In each trial, two visual search arrays were presented in consecutive intervals separated by a blank screen. One of the two search arrays contained a contrast oddball item. Target contrast varied randomly between trials and was determined by addition of any one of 0.01, 0.03, 0.07, or 0.15 to the distractor baseline. The task was to decide in which interval the target appeared. Target interval was randomized across trials.
2. In both experiments each trial was initiated by the participant responding with the keyboard. A black central fixation cross appeared on the screen for a variable period, drawn uniformly from the range 500–1000 ms. The two observation intervals were separated by a blank display lasting 1000ms. The fixation cross turned into a question mark after the second interval to prompt the participants to respond. 
3. In Experiment 1, dyads of participants performed a visual oddball search task together. Both participants had identical displays in which stimuli and feedback were presented in the centre of the screen. In the Independent condition participants initially made a private decision. If they disagreed, discussion and collective decision ensued. In the Influence condition, no private decisions were made and collective decision was immediately negotiated.
4. In Experiment 2, prior to the main test, each participant completed 48 trials of an isolated version of the same visual search task. In this measurement, target contrast was determined dynamically using a 2-up-1-down staircase procedure to determine the participant’s contrast sensitivity, which allowed to determine the more- and less-sensitive members of each dyad prior to starting the main experiment. White noise was added to the display of the less-sensitive participant, making it harder to detect the target. This procedure ensured that a substantial sensitivity gap was inserted between the two members of each dyad, leading to failure of collective decision making.
5. In Experiment 2, each participant viewed one half of their screen: the left half of one display for the participant responding with the keyboard, and the right half of the other display for the participant responding with the mouse. A piece of thick black cardboard was used to occlude the half not viewed by the participant. Two stimulus arrays were presented on both displays simultaneously, each on one-half of the display.

## Roles
Each participant was responsible for viewing the visual search display and making a decision. In the IND condition, the decision was made independently, while in the INF condition, the decision was made collectively.

## Instructions
Complete instructions shown to participants at each stage of the task.  

Write the complete instructions used from the start to the end of the experiment. This should include any instruction provided on each of the steps. If instructions have step interdependence, or are role specific, describe that in full detail.

If the instructions are not available ask the paper's authors, however and if that fails, write new ones that appear as suitable as possible.

# Criteria
## Performance calculation
Psychometric functions were constructed for each observer and for each dyad by plotting the proportion of trials in which the odd ball was reported in the second interval against the contrast difference at the oddball location. The psychometric curves consisted of a cumulative Gaussian function whose parameters were bias, b, and variance, σ2. To estimate these parameters, a probit regression model was employed using the glmfit function in MATLAB. A participant with bias b and variance σ2 would have a psychometric curve, denoted P(Δc), where Δc is the contrast difference between the second and first presentations, given by P(Δc)=H*((Δc+b)/σ) where H(z) is the cumulative normal function. The psychometric curve, P(Δc), corresponds to the probability of choosing the second interval. Thus, a positive bias indicates an increased probability of reporting the target in the second interval (and thus corresponds to a negative mean for the underlying Gaussian distribution). The maximum slope of the psychometric curve, denoted s, is related to the variance. A large slope indicates small variance and thus highly sensitive performance; thus we define sensitivity as the slope. Using this measure, we quantified individual participants’ as well as the dyad’s sensitivity:  sMax for the more-sensitive participant, sMin for the less-sensitive participant, and sDyad for the dyad sensitivity. Collective benefit (CB) was defined as the ratio: sDyad/sMax. Values of collective benefit above 1 indicate that the dyad managed to gain an advantage over its better member. Values below 1 would indicate that collaboration was counterproductive and that the dyad did worse than its more-sensitive member.

## Incentives
All participants received a fixed monetary compensation for their contribution.
