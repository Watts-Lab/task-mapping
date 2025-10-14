---
name: Pilot instructions
about: A template for running a pilot with Multi Task Empirica
title: "[Date] Pilot"
labels: pilot
assignees: ""
---

[Detailed instructions these steps]([/README.md](https://github.com/Watts-Lab/multi-task-empirica/blob/main/README.md))

## Testing
- Tasks to test: 
- Other features to test:
- The PRs included in this pilot:

## Panel Management Checklist
Lead: 
- [ ] Initial notification of participants (at least 24 hours before pilot if possible)
- [ ] Reminder notification of participants on the morning of the pilot
- [ ] Bonus participants
- [ ] Respond to emails

## App Management Checklist
Lead:
- [ ] Set up branch named `mm-dd-pilot` with pilot configuration and test locally
- [ ] Set up server (activating instance, enabling DB and deploying if a new deployment is needed)
- [ ] Set up Empirica (uploading configurations, setting treatments, starting batches)
- [ ] Watch over experiment as it runs

### Winding down
Once all the batches and sessions are complete (ensure they are complete before proceeding!): 
- [ ] Export the data as csv files. The export of the data is done through the admin panel through the `export` panel. 
**Important**: In this step, please be sure to tick the box that says to include Player IDs/Worker IDs. This is important because we need the unique WorkerIDs to process payments in the following step. 
- [ ] Add the data as a new folder in the **Pilot Data** of the [multi-task-data repository](https://github.com/Watts-Lab/multi-task-data). 
- [ ] Retire left over workers who could do the tasks in the future, e.g., game full or lobby timed out, but not finished. We only 'retire' players with these statuses because 'retiring' them allows them to join in the future. Players with game full or lobby timed out never got to participate so it's okay if they play in the future.
- [ ] Once the above steps are completed, [pause the Mongo Database Cluster](https://cloud.mongodb.com/v2/623c98898b1e3f087487fb6d#clusters) and [stop the Galaxy Application](https://galaxy.meteor.com/app/multi-task.meteorapp.com/settings). 
- [ ] Comment on this issue with a summary of feedback received from pilot. CSV files to check: `player-rounds`, `player-inputs`