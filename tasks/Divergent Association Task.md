# Summary
Measuring creativity
Participants are asked to come up with 10 nouns that are as different as possible.

# References
Olson, Jay A., et al. “Naming Unrelated Words Predicts Creativity.” PNAS, National Academy of Sciences, 22 June 2021, www.pnas.org/content/118/25/e2022340118. 

Link: https://www.pnas.org/content/118/25/e2022340118

Supplementary Files with Instructions: https://www.pnas.org/content/pnas/suppl/2021/06/17/2022340118.DCSupplemental/pnas.2022340118.sapp.pdf

Data Set: https://osf.io/kbeq6/

# Stimuli
## The visual components
Participant Instructions: ![image](https://github.com/Watts-Lab/task-mapping/blob/Divergent-Association-Task/images/Divergent_Association_Task_Instructions.png)

# Procedure
Participants were asked to generate 10 unrelated nouns in four minutes. Participants were given instructions and asked to write down the words with a Pen and Pencil on the same instructions sheet.
The task had the following additional instructions.  
> 1) Use only single words. We used this rule because computational methods can score single words with less ambiguity than phrases. Words such as “cul de sac” were accepted and automatically hyphenated.  
> 2) Use only nouns (e.g., things, objects, concepts). This rule keeps the class of words similar since the distance between words varies based on their part of speech, such as whether they are nouns or adjectives.  
> 3) Avoid proper nouns (e.g., no specific people or places).  
> 4) Avoid specialized vocabulary (e.g., no technical terms). This rule and the previous one prevent participants from using words that are too specific, which is one strategy to artificially inflate the score. To enforce these rules, only lowercase words from a common dictionary (53) were used in the calculation.  
> 5) Think of the words on your own (e.g., do not just look at objects in your surroundings). During pilot testing, many participants would look around their environment for inspiration when naming the words. This strategy resulted in lower scores since common objects on one’s desk are often semantically similar.  
> 6) You will have 4 min to complete this task. In our initial testing (54), this amount of time was sufficient to complete the task without much time pressure.

After the task, participants were asked what strategy they used, if any, to choose the words.
> In Study 1A, two raters coded the responses based on 1) whether the 141 participants appeared to correctly follow the instructions and 2) whether they reported implementing a strategy such as naming the objects around them. Disagreements were resolved by discussion, and raters were liberal with their exclusions.

DAT score is calculated using the instructions in the Criteria section

## Roles 
Participant, gives 10 nouns that are as different as possible.

## Instructions
Instructions
Please write 10 words that are as different from each other as possible, in all meanings and uses
of the words.
Rules

1) Only single words.
2) Only nouns (e.g., things, objects, concepts).
3) No proper nouns (e.g., no specific people or places).
4) No specialised vocabulary (e.g., no technical terms).
5) Think of the words on your own (e.g., do not just look at objects in your surroundings).
6) You will have 4 min.  
** Actual Instruction document included in stimuli section

# Criteria
## Performance calculation

The Divergent Association Task(DAT) Score is the measure for the task.  This is computed using semantic distance, which is generated from the GloVe algorithm.  This algorithm is pertained on the Common Crawl corpus.  Full algorithm code is available at https://osf.io/bm5fd/

Start by selecting the first seven valid words, supplied by the participant.

The DAT score is the transformed average of the semantic distances (cosine distance).  This means the cosine distance is computed for all 21 pairs of the seven words, then we take the average of all these distances, and the answer is multiplied by 100.  

Te minimum score is zero, and is obtained if all the words are the same.

The maximum score is 200, and is obtained if the words are as different from each other as possible.

## Incentives
No incentive was given.
