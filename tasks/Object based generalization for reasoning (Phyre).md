# Summary
PHYRE provides a set of physics puzzles in a simulated 2D world. Each puzzle has a goal state (e.g., “make the green ball touch the blue wall”) and an initial state in which the goal is not satisfied.  A puzzle can be solved by placing one or more new bodies in the environment such that when the physical simulation is run the goal is satisfied. An agent playing this game must solve previously unseen puzzles in as few attempts as possible

# References

Paper: https://arxiv.org/pdf/1908.05656.pdf

GitHub Code: https://github.com/facebookresearch/phyre

# Stimuli
## The visual components
Example of Tasks: <img width="837" alt="image" src="https://user-images.githubusercontent.com/78745728/143653744-bd846a31-639d-4472-8c87-70d15ada0b75.png">

## Materials for alternative versions of the experiment 
Experimentors run different versions of the experiment with varying procedures: 

Random agent (RAND). This agent does not perform any training and instead samples actions uniformly at random from the 3D or 6D (depending on the tier) action space at test time.

Non-parametric agent (MEM). At training time, this agent generates a set of R random actions and uses the simulator to check if each of these actions can solve each of the training tasks. For each action a, the agent computes pa: the fraction of training tasks that the action solves. The agent then sorts the R actions by pa (highest to lowest), and tries them in this order at test time. This agent is non-parametric because it uses a list of “memorized” actions at test time.

In the cross-template setting, the test tasks come from previously unseen task templates and this simple agent cannot relate them to tasks seen during training. It therefore uses the same action ranking for all tasks and ignores the observation of the initial state. In the within-template setting, each test task comes from a task template that was seen during training. In this case, we give the agent access to the task template id for each test task. The agent maintains a per-task-template ranking of the R actions. The same set of actions is shared across all templates; only the ranking changes. The set of actions attempted on each task may vary because invalid actions are ignored

Non-parametric agent with online learning (MEM-O). This agent has the same training phase as the non-parametric agent, but continues to learn online at test time. Specifically, after finishing each test task (either successfully or unsuccessfully), the agent updates pa based on the reward received for each action a in the subset of the actions it attempted. The updated ranking is used when the next task is attempted. Such online updates are beneficial, in particular, in the cross-template setting because they allow the agent to learn something about the tasks in the previously unseen templates. We use cross-validation to tune the relative weight of the update on each train-val fold 

Deep Q-network (DQN). As before, the DQN agent collects a set of observation-action-reward triplets by randomly sampling actions and running them through the simulator. The agent trains a deep network on the resulting data to predict the reward for an observation-action pair. We train the network by minimizing the cross-entropy between the soft prediction and the observed reward. During training, we sample batches with an equal number of positive and negative triplets.

Deep Q-network with online learning (DQN-O). Akin to MEM-O, this agent uses rewards from test tasks to perform online updates. After finishing a test task, the agent performs a number of gradient descent updates using examples obtained from that task. The updated model is then used for the next test task. The number of updates and corresponding learning rate are set via cross-validation.

# Procedure
## Steps
General Note: Task templates are used to measure an agent’s generalization ability in two settings. In the within-template setting, an agent trains on a subset of tasks in the template and is evaluated on the remaining tasks within that template. To measure cross-template generalization (in the cross-template generalization setting), test tasks are selected exclusively from templates that were not used for training.

1. In the training phase, the agent has access to the training tasks and unlimited access to the simulator. The agent does not have access to task solutions, but can use the simulator to train models that can solve tasks. Such models may include forward-prediction or action-prediction models.
2. In the testing phase, the agent receives test tasks that it needs to solve in as few attempts (queries to the simulator) as possible. 
3. After each attempt, the agent receives a binary reward and observations of intermediate world states and gains access to observations of the intermediate world states produced by the simulator. If the goal was not achieved, the world resets to its initial state and the agent tries again, possibly informed by its prior attempts.The agent can use this information to refine its action for the next attempt. Some actions may be invalid, i.e., correspond to an object that overlaps with other objects. In such cases, we neither give the agent any reward nor count this attempt toward the query budget. The agent receives access to all test tasks at once, allowing it to choose the order in which it solves tasks.


## Roles 
N/A

## Instructions

Instructions vary depending on the task at hand, sample instruction includes: 

Make the green ball touch the blue/purple object by adding red objects. 
<img width="1071" alt="image" src="https://user-images.githubusercontent.com/78745728/143656175-f13c60f7-ccd2-4d93-871a-323c460712b5.png">

# Criteria
## Performance calculation
We judge an agent’s performance by how efficiently it solves tasks in the testing phase. We characterize efficiency in terms of the number of actions that were attempted to solve a given task; fewer attempts corresponds to greater efficiency. We formalize this intuition by recording the cumulative percentage of test tasks that were solved (the success percentage) as a function of the number of attempts taken per task. 

## Incentives
None included 
