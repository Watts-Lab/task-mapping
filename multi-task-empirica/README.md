This repository provides consistant implementations of several tasks from our [task map](https://github.com/Watts-Lab/task-mapping) using [Empirica](https://empirica.ly). 

Below are instructions for running experiments with. 

## Detailed steps and notes for Panel Management
### Fetching + Pre-pre Notification of Participants  

1. Fetch and select the participants we would like to use. This is currently being done in the [multi-task-data](https://github.com/Watts-Lab/multi-task-data) repository. Within the `Participants - Recruitment` folder, you will find a recruitment script sample. You can find the panel of individuals to select from in the [Individual Mapping](https://github.com/Watts-Lab/individual-mapping) repository, which contains an evolving panel of participants recruited to participate in our CSSLab Panel.
Consult with the researchers on the project on a good recruitment method, specifically on which variables from this [Panel Codebook](https://github.com/Watts-Lab/individual-mapping) to select or filter for participants. 

1. We will be communicating with the [WattsLab M-Turk API Interface](https://watts.turk-interface.com/), through the [`/notify`](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify~1survey/post) endpoint, to pre-notify workers that they have been selected to participate in these experiments, in the given date and time. Please be sure to include the time in different timezones. Documentation to accomplish this is in [this](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify/post) link, and you may find sample code on how to implement this in the [multi-task-data](https://github.com/Watts-Lab/multi-task-data) repository. 


### Pre-Notifying Participants with `/notify` 
Having already pre-notified people (as needed). We now need to communicate with the [WattsLab M-Turk API Interface](https://watts.turk-interface.com/), through the[ /notify](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify~1survey/post) endpoint, to pre-notify workers again of their upcoming invitation to the. 
**Important** If you do not wish to include any links in your notification to workers, please use this [/notify](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify/post) endpoint. 
If your message to workers includes the links e.g. attendance/rsvp links, experiment links, please use this [/notify](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify~1survey/post) endpoint
Documentation to accomplish this can be found on the [WattsLab API interface](https://watts.turk-interface.com/).

### Send links to participants with `/notify/survey`
Now, you will send a notification to pre-notified participants 5 minutes in advance of the game to remind them to join, and provide them with the links they need to play. This is done through the [/notify/survey](https://watts.turk-interface.com/#tag/workers/paths/~1workers~1notify/post) endpoint of the [WattsLab M-Turk API Interface](https://watts.turk-interface.com/). Example code to do this can be found in the [multi-task-data](https://github.com/Watts-Lab/multi-task-data) repository. 

### Responding to Emails
While monitoring the admin platform, be sure to also monitor the WattsLab gmail account, because this is where participants will send their questions/concerns throughout the game and/or in case of any bugs or problems. Please be sure to respond accordingly, until the completion of all the batches and experiments. 


### Paying Participants  
Participants should be paid as soon as possible and no more than 72 hours (3 days) after the experiment. This is again done through [WattsLab M-Turk API Interface](https://watts.turk-interface.com/), through the [`/payments`](https://watts.turk-interface.com/#tag/payments) endpoint. 
Please refer to decisions made to step 1, and the lab's pre-defined policies on the correct payment rates needed to accomplish this. 

## Detailed steps and notes for App Management
### Pulling changes + Setting up all game configuration components + Deployment file 
If there are changes in the software since the previous deployment the following steps are needed. 

1. Make a new branch with `mm-dd-pilot` from [this repository](https://github.com/Watts-Lab/multi-task-empirica/tree/main/multi-task-app).
2. Merge other branches that have had changes into this pilot.
3. (Ignore this step, it's already taken care of) Make sure that there is a `yaml` file in the repository, with all needed factors, and treatments. There is one in 
4. Update  [Game Configuration](https://github.com/Watts-Lab/multi-task-empirica/blob/main/multi-task-app/customTasks/gameConfiguration.jsx) with [specific tasks that are being tested](https://github.com/Watts-Lab/multi-task-empirica/tree/main/multi-task-app/customTasks). Usually we've been commenting out any tasks we don't need for that day's pilot.
5. (Ignore this step, it's already taken care of) Update _deployment file_ with admin username and password. Remember to delete this file before version controlling as we do not want to commit this to the repository!

### Testing Locally
If changes were made for the current launch of the experiment:
1. Go to your local version of this repository, into the `multi-task-app` folder and run `meteor`. This should allow you to walk through the experiment before deployment. [The commands/troubleshooting are outlined on this page ](https://docsv1.empirica.ly/getting-started/quick-test). Be sure to navigate your working directory to be the cloned/tracked version of [this repository](https://github.com/Watts-Lab/multi-task-empirica/tree/main/multi-task-app).

### Start the Galaxy App + Resume DB Cluster 
Having done the above few steps, we can now proceed with [starting the Galaxy Application](https://galaxy.meteor.com/app/multi-task.meteorapp.com/settings) that deploys this app, and resuming [the Mongo Database](https://cloud.mongodb.com/v2/623c98898b1e3f087487fb6d#clusters) cluster - which stores the data received from the experiment. 

#### To start the Galaxy Application: 
1. Select the `multi-task.meteorapp.com` from WattsLab, after logging into your account.
2. Go to `settings`, and ensure the `Scaling Container Size` is set to `Dozen`
3. Scroll to the bottom of the `settings` page and select `Start App` 
#### To resume the Mongo Database: 
1. Go to `Database`, after logging into your account. 
2. Select `...` of the multi-task2
3. Select `Resume Cluster`

### Deploying the App 
1. Deploying the App may take ~ 20 mins. So, please plan accordingly. 
4. To deploy the app, go to your terminal, `cd` into the application (likely folder `multi-task-app`) and run: 
```powershell
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy multi-task.meteorapp.com
```
### Admin Batch Setup + Configuration 
Having made decisions on the `types of treatments`, `n` of people, and `number of batches`, configure the experiment admin panel accordingly. 
Set up several batches with multiple games. They should have a single, triple and six treatment all with the ten_min timeout set and complete randomization.

- [Multi-task-meteorapp.com/admin](https://multi-task.meteorapp.com/admin) is the platform where you can configure batches, treatments, and participants in real time. 
- [Multi-task-meteorapp.com](https://multi-task.meteorapp.com) is what the participants are directed to and see. 

### Start All the Batches 
Once the app has been deployed, start all the batches we created in Step 6 above. Ideally, this is right at the time of the pilot start, not before.

### Monitoring the experiments
Once the batches are started, participants will start joining and playing the experiments. You may watch this in real-time on the [multi-task-meteorapp.com/admin](https://multi-task.meteorapp.com/admin) platform, through the /monitoring/batches tab. You may also see which participants are idle, removed from the game, or otherwise online through the /monitoring/participants tab.