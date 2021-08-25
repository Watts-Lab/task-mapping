# Summary
Measuring creativity
Participants are asked to come up with 10 nouns that are as different as possible.

# References
Olson, Jay A., et al. “Naming Unrelated Words Predicts Creativity.” PNAS, National Academy of Sciences, 22 June 2021, www.pnas.org/content/118/25/e2022340118. 

Link: https://www.pnas.org/content/118/25/e2022340118

# Stimuli
## The visual components
N/A

## Materials for alternative versions of the experiment 
N/A

# Procedure
## Experiment 1
The group of participants was selected entirely from undergraduate psychology courses from Melbourne, Australia, and from social media advertisements in Montreal, Canada.  The group was mostly female, between 18 and 20.

This group follows the steps outlined.

## Experiment 2
The group of participants were entirely recruited over television, radio and social media advertisements as a part of a campaign by the Australian Broadcasting Corporation.  This was a much larger group, of 8,572 participants from 98 different countries.  Most were Australian or from the United Kingdom.  The reported ages ranged from 7 to over 70, most falling in-between 35 and 54.  The group was a majority female.

This group follows the steps outlined.
## Steps
1. ask a participant to give 10 nouns that are as different from each other as possible
2. take the first seven valid words given by the participant
3. DAT score is calculated using the instructions in the Criteria section

## Roles 
Participant, gives 10 nouns that are as different as possible.

## Instructions
Participants are instructed to give 10 nouns that are as different as possible.

The difference of the words is defined by the meanings of the words.

# Criteria
## Performance calculation

The Divergent Association Task(DAT) Score is the measure for the task.  This is computed using semantic distance, which is generated from the GloVe algorithm.  This algorithm is pertained on the Common Crawl corpus.  Full algorithm code is available at https://osf.io/bm5fd/

Start by selecting the first seven valid words, supplied by the participant.

The DAT score is the transformed average of the semantic distances (cosine distance).  This means the cosine distance is computed for all 21 pairs of the seven words, then we take the average of all these distances, and the answer is multiplied by 100.  

Te minimum score is zero, and is obtained if all the words are the same.

The maximum score is 200, and is obtained if the words are as different from each other as possible.

## Incentives
No incentive was given to either group.
