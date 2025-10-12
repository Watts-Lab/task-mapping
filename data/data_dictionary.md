# Data Dictionary Template (with Sample Values)


## raw_map.csv

| Variable | Description |
|---|---|
| Q1concept_behav | Whether the task primarily requires physical effort versus mental effort. |
| Q1concept_behav_elaboration | Free-text explanation or justification for the Q1 answer. |
| Q1concept_behav_confidence | Self-reported confidence in the Q1 answer. |
| Q2intel_manip_1 | Fraction of physical (as opposed to mental) effort required for the task (0 to 1). |
| Q2intel_manip_1_elaboration | Free-text explanation or justification for the Q2 answer. |
| Q2intel_manip_1_confidence | Self-reported confidence in the Q2 answer. |
| Q3type_1_planning | Whether the task is a planning task (producing a sequence of concrete steps to reach a goal). |
| Q3type_1_planning_elaboration | Free-text explanation or justification for the Q3 answer. |
| Q3type_1_planning_confidence | Self-reported confidence in the Q3 answer. |
| Q4type_2_generate | Whether the task is a generation/brainstorming task (producing ideas or examples). |
| Q4type_2_generate_elaboration | Free-text explanation or justification for the Q4 answer. |
| Q4type_2_generate_confidence | Self-reported confidence in the Q4 answer. |
| Q5creativity_input_1 | Fraction of task effort that is creative thinking (0 to 1). |
| Q5creativity_input_1_elaboration | Free-text explanation or justification for the Q5 answer. |
| Q5creativity_input_1_confidence | Self-reported confidence in the Q5 answer. |
| Q6type_5_cc | Whether the task’s purpose includes resolving differences in opinion, perspective, or viewpoint (cognitive conflict). |
| Q6type_5_cc_elaboration | Free-text explanation or justification for the Q6 answer. |
| Q6type_5_cc_confidence | Self-reported confidence in the Q6 answer. |
| Q7type_7_battle | Whether the task outcome can be described in win/lose terms. |
| Q7type_7_battle_elaboration | Free-text explanation or justification for the Q7 answer. |
| Q7type_7_battle_confidence | Self-reported confidence in the Q7 answer. |
| Q8type_8_performance | Whether the task has an all-or-nothing outcome (meeting a particular standard is sufficient). |
| Q8type_8_performance_elaboration | Free-text explanation or justification for the Q8 answer. |
| Q8type_8_performance_confidence | Self-reported confidence in the Q8 answer. |
| Q9divisible_unitary | Whether it is efficient and useful for group members to work on discrete parts/subtasks (divisible vs. unitary). |
| Q9divisible_unitary_elaboration | Free-text explanation or justification for the Q9 answer. |
| Q9divisible_unitary_confidence | Self-reported confidence in the Q9 answer. |
| Q10maximizing | Whether one goal of the task is to maximize (do as much/many/as quickly as possible). |
| Q10maximizing_elaboration | Free-text explanation or justification for the Q10 answer. |
| Q10maximizing_confidence | Self-reported confidence in the Q10 answer. |
| Q11optimizing | Whether one goal of the task is to achieve a precise or optimal outcome. |
| Q11optimizing_elaboration | Free-text explanation or justification for the Q11 answer. |
| Q11optimizing_confidence | Self-reported confidence in the Q11 answer. |
| Q13outcome_multip | Whether there is only one “best” or possible solution to the task. |
| Q13outcome_multip_elaboration | Free-text explanation or justification for the Q13 answer. |
| Q13outcome_multip_confidence | Self-reported confidence in the Q13 answer. |
| Q14sol_scheme_mul | Whether there is only one method for completing the task (vs. many alternative methods). |
| Q14sol_scheme_mul_elaboration | Free-text explanation or justification for the Q14 answer. |
| Q14sol_scheme_mul_confidence | Self-reported confidence in the Q14 answer. |
| Q15dec_verifiability | Whether acceptable solutions can be demonstrated or verified as correct (e.g., by an expert/third party). |
| Q15dec_verifiability_elaboration | Free-text explanation or justification for the Q15 answer. |
| Q15dec_verifiability_confidence | Self-reported confidence in the Q15 answer. |
| Q16shared_knowledge | Whether the task can be formalized as a model that an algorithm could solve. |
| Q16shared_knowledge_elaboration | Free-text explanation or justification for the Q16 answer. |
| Q16shared_knowledge_confidence | Self-reported confidence in the Q16 answer. |
| Q17within_sys_sol | Whether the problem contains enough information to find a valid solution. |
| Q17within_sys_sol_elaboration | Free-text explanation or justification for the Q17 answer. |
| Q17within_sys_sol_confidence | Self-reported confidence in the Q17 answer. |
| Q18ans_recog | Whether others would recognize a correct solution as correct when it is explained (without contest). |
| Q18ans_recog_elaboration | Free-text explanation or justification for the Q18 answer. |
| Q18ans_recog_confidence | Self-reported confidence in the Q18 answer. |
| Q19time_solvability | Whether a participant could produce a provably correct solution given sufficient ability, time, motivation, and resources. |
| Q19time_solvability_elaboration | Free-text explanation or justification for the Q19 answer. |
| Q19time_solvability_confidence | Self-reported confidence in the Q19 answer. |
| Q20type_3_type_4 | Whether there is an objectively correct solution that can be calculated or selected. |
| Q20type_3_type_4_elaboration | Free-text explanation or justification for the Q20 answer. |
| Q20type_3_type_4_confidence | Self-reported confidence in the Q20 answer. |
| Q21intellective_judg_1 | Degree of demonstrable correctness on a 0–1 scale (0 = entirely subjective/judgmental; 1 = entirely objective/intellective). |
| Q21intellective_judg_1_elaboration | Free-text explanation or justification for the Q21 answer. |
| Q21intellective_judg_1_confidence | Self-reported confidence in the Q21 answer. |
| Q22confl_tradeoffs | Whether completing the task requires evaluating tradeoffs or conflicting solutions/information. |
| Q22confl_tradeoffs_elaboration | Free-text explanation or justification for the Q22 answer. |
| Q22confl_tradeoffs_confidence | Self-reported confidence in the Q22 answer. |
| Q23ss_out_uncert | Whether participants have uncertainty about whether their method or solution will lead to the desired outcome. |
| Q23ss_out_uncert_elaboration | Free-text explanation or justification for the Q23 answer. |
| Q23ss_out_uncert_confidence | Self-reported confidence in the Q23 answer. |
| Q24eureka_question | Whether the solution becomes obvious once proposed (a “eureka” insight). |
| Q24eureka_question_elaboration | Free-text explanation or justification for the Q24 answer. |
| Q24eureka_question_confidence | Self-reported confidence in the Q24 answer. |
| task | Name or type of the task being evaluated. |
| task_blob_url | URL to the stored task description/content (GitHub blob). |
| questions_blob_url | URL to the stored survey questions (GitHub blob). |
| followup_questions_blob_url | URL to the stored follow-up survey questions (GitHub blob). |
| user | Anonymized identifier of the respondent. |
| platform | Platform on which the response was collected (if available). |
| _id | Unique record identifier. |
| createdAt | Record creation timestamp (milliseconds since Unix epoch). |
| updatedAt | Record update timestamp (milliseconds since Unix epoch). |

## hand_labeled_task_mcgrath_sectors.csv

| Variable | Description |
|---|---|
| task | The name of the task. |
| group | The broad McGrath Quadrant for the task ("Generate," "Choose," "Execute," "Negotiate"), as assigned by hand by the first author of the paper. |

## players/individuals.csv

| Variable | Description |
|---|---|
| WorkerId | Anonymized participant identifier. |
| belief_in_god | Self-reported strength of belief in God (scale per instrument). |
| BFI_agreeableness | Big Five Inventory agreeableness composite score (higher = more agreeable). |
| BFI_conscientiousness | Big Five Inventory conscientiousness composite score (higher = more conscientious). |
| BFI_extraversion | Big Five Inventory extraversion composite score (higher = more extraverted). |
| BFI_negative_emotionality | Big Five Inventory negative emotionality (neuroticism) composite score (higher = more negative emotionality). |
| BFI_open_mindedness | Big Five Inventory openness to experience composite score (higher = more open). |
| birth_year | Year of birth (YYYY). |
| charitable_giving | Self-reported charitable donations (units per instrument). |
| city | City of residence. |
| completion_delay | Elapsed time to complete the survey (seconds). |
| country | Country of residence. |
| credulity | Credulity scale score (susceptibility to believe). |
| CRT | Cognitive Reflection Test performance (e.g., proportion correct). |
| current_emotion | Self-reported current emotional state rating (scale per instrument). |
| decision_decisions_game | Decision or outcome in the Decisions Game task (units per task). |
| dictator_game | Amount given to the recipient in the Dictator Game (points or currency). |
| education_level | Highest level of education attained. |
| endowment | Experimental endowment provided at task start (points or currency). |
| flying_seat | Preferred airplane seating option. |
| gender | Self-reported gender. |
| guessing_game | Response or payoff in a Guessing Game task (units per task). |
| high_effort | Indicator of high-effort condition or self-reported effort level. |
| income_max | Upper bound of self-reported income range (currency). |
| income_min | Lower bound of self-reported income range (currency). |
| IRCS_GS | IRCS survey subscale GS score (see instrument documentation). |
| IRCS_GV | IRCS survey subscale GV score (see instrument documentation). |
| IRCS_IB | IRCS survey subscale IB score (see instrument documentation). |
| IRCS_IR | IRCS survey subscale IR score (see instrument documentation). |
| IRCS_IV | IRCS survey subscale IV score (see instrument documentation). |
| IRCS_RS | IRCS survey subscale RS score (see instrument documentation). |
| IRQ_manipulation | IRQ subscale “manipulation” score (see instrument documentation). |
| IRQ_orthographic | IRQ subscale “orthographic” score (see instrument documentation). |
| IRQ_verbal | IRQ subscale “verbal” score (see instrument documentation). |
| IRQ_visual | IRQ subscale “visual” score (see instrument documentation). |
| marital_status | Marital or partnership status. |
| need_for_cognition | Need for Cognition scale score. |
| political_fiscal | Fiscal political ideology score (scale per instrument). |
| political_party | Political party identification. |
| political_social | Social political ideology score (scale per instrument). |
| prisoners_dilemma | Choice or payoff in the Prisoner’s Dilemma task (units per task). |
| race | Self-reported race. |
| risk_willingness | General risk tolerance rating. |
| RME | Reading the Mind in the Eyes test score. |
| share_decisions_game | Share or proportion allocated in the Decisions Game. |
| smoke | Smoking status indicator (e.g., 1 = yes, 0 = no). |
| state | State or region of residence. |
| SurveyName | Name of the survey instrument used for this record. |
| time_zone | Participant’s time zone as UTC offset at survey time. |
| trust_first_feelings_about_others | Trust in one’s initial feelings about others rating. |
| trust_in_others | Generalized trust in others scale score. |
| usual_time | Self-reported usual time metric (per instrument). |
| zip_code | ZIP or postal code. |
| employment_status | Employment status. |
| ICAR | International Cognitive Ability Resource score. |
| REI_cognition | Rational-Experiential Inventory—Rational/Cognitive subscale score. |
| REI_intuition | Rational-Experiential Inventory—Experiential/Intuition subscale score. |
| PVQ_achievement | Portrait Values Questionnaire—Achievement value score. |
| PVQ_benevolence | Portrait Values Questionnaire—Benevolence value score. |
| PVQ_conformity | Portrait Values Questionnaire—Conformity value score. |
| PVQ_hedonism | Portrait Values Questionnaire—Hedonism value score. |
| PVQ_power | Portrait Values Questionnaire—Power value score. |
| PVQ_security | Portrait Values Questionnaire—Security value score. |
| PVQ_self_direction | Portrait Values Questionnaire—Self-direction value score. |
| PVQ_stimulation | Portrait Values Questionnaire—Stimulation value score. |
| PVQ_tradition | Portrait Values Questionnaire—Tradition value score. |
| PVQ_universalism | Portrait Values Questionnaire—Universalism value score. |
| date | Timestamp of survey completion (local time). |

## players/players_wave1_epoch1.csv
| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Platform participant identifier (often the workerId). |
| urlParams | Captured URL/query parameters at session start (e.g., workerId). |
| bot | Indicator that the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Internal log of completed exit steps for this session. |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Categorical exit outcome (e.g., gameFull, custom, gameCancelled). |
| exitReason | Reason provided for exit (e.g., timedOut). |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata about the participant’s last login (includes a timestamp). |
| data.index | Participant’s index/position within the session or network. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.avatar | Avatar metadata (e.g., name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustment. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work/payment was approved. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.leftGameIdle | Indicator that the participant left due to idleness. |
| data.submitted | Whether the participant submitted the final outcome. |
| data.playerClickingCellID | Identifier of the most recently clicked cell in the game UI. |
| data.option | Session option/treatment code associated with the participant. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |

## players/players_wave1_epoch2.csv
| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Participant/session identifier (may include retirement notes). |
| urlParams | URL/query parameters captured at session start (e.g., workerId). |
| bot | Flag indicating the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Completed exit steps (e.g., ExitSurvey). |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Exit outcome status (e.g., finished, gameCancelled). |
| exitReason | Reason provided for exit. |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata object containing the participant’s last login timestamp. |
| data.index | Participant’s index/position within the session or network. |
| data.avatar | Avatar metadata (name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustments. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work or payment was approved. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.submitted | Whether the participant submitted the final outcome. |
| data.playerClickingCellID | Identifier of the most recently clicked cell in the game UI. |
| data.option | Session option/treatment code associated with the participant. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.leftGameIdle | Indicator that the participant left due to idleness. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |
| data.currentlyIdle | Whether the participant is currently idle. |


## players/players_wave_2.csv
| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Participant/session identifier (may include retirement notes). |
| urlParams | URL/query parameters captured at session start (e.g., workerId). |
| bot | Flag indicating the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Completed exit steps or stages (e.g., ExitSurvey). |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Exit outcome status (e.g., gameCancelled, gameFull). |
| exitReason | Reason provided for exit. |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata object containing the participant’s last login timestamp. |
| data.index | Participant’s index/position within the session or network. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.avatar | Avatar metadata (name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustments. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work or payment was approved. |
| data.currentlyIdle | Whether the participant is currently idle. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.option | Session option/treatment code associated with the participant. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |
| data.stepApproved | Whether the current step/event was approved by an admin. |
| data.getAudio | Audio capture permission/status flag for the session. |

## players/players_wave_3.csv
| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Participant/session identifier (may include retirement notes). |
| urlParams | URL/query parameters captured at session start (e.g., workerId). |
| bot | Flag indicating the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Completed exit steps or stages (e.g., ExitSurvey, PayScreen). |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Exit outcome status (e.g., finished, gameLobbyTimedOut). |
| exitReason | Reason provided for exit. |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata object containing the participant’s last login timestamp. |
| data.index | Participant’s index/position within the session or network. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.avatar | Avatar metadata (name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustments. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work or payment was approved. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.currentlyIdle | Whether the participant is currently idle. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |
| data.stepApproved | Whether the current step/event was approved by an admin. |
| data.submitCoordinateApproved | Whether the submitted coordinate/action was approved. |

## Wave 3 data/offline scoring.csv
| Variable | Description |
|---|---|
| stageId | Unique identifier for the stage record (whre each stage represents a single task instance---a given task, at a given level of complexity). |
| score | Score achieved in the stage (points) for a subset of tasks that cannot be evaluated directly in the browser, and are instead evaluated via a post-hoc annotation pipeline. |

## Wave 3 data/paid bonuses.csv

| Variable | Description |
|---|---|
| WorkerId | Platform worker identifier for the participant. |
| AssignmentId | Platform assignment identifier associated with the work submission. |
| BonusAmount | Monetary bonus amount awarded (e.g., USD). |
| UniqueRequestToken | Unique token to prevent duplicate bonus transactions. |
| Reason | Free-text explanation for issuing the bonus. |

## Wave 3 data/Epoch 1/batches.csv
| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| index | Sequential index/order of the batch or run. |
| assignment | Assignment configuration label for the run (e.g., complete). |
| full | Whether the batch/run reached capacity. |
| runningAt | Timestamp when the batch/run started. |
| finishedAt | Timestamp when the batch/run ended. |
| status | Current or final status of the batch/run (e.g., finished, cancelled). |
| gameIds | Identifiers of games created in this batch/run. |
| gameLobbyIds | Identifiers of game lobbies associated with this batch/run. |
| createdAt | Timestamp when the record was created. |
| archivedAt | Timestamp when the record was archived. |

## Wave 3 data/Epoch 1/factor-types.csv
| Variable | Description |
|---|---|
| _id | Internal identifier for the configuration parameter record. |
| name | Name of the configuration parameter. |
| required | Whether this parameter must be provided. |
| description | Human-readable explanation of the parameter’s purpose. |
| type | Data type of the parameter (e.g., Integer, Number, String). |
| min | Minimum allowable value (if applicable). |
| max | Maximum allowable value (if applicable). |
| createdAt | Timestamp when the parameter record was created. |
| archivedAt | Timestamp when the parameter was archived (blank if active). |

## Wave 3 data/Epoch 1/factors.csv
| Variable | Description |
|---|---|
| _id | Internal identifier for the factor value record. |
| name | Name or label of the factor setting. |
| value | Assigned value of the factor (boolean). |
| factorTypeId | Identifier linking to the factor type definition. |
| createdAt | Timestamp when the factor value record was created. |

## Wave 3 data/Epoch 1/game-lobbies.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game lobby record. |
| index | Lobby’s position/order within its batch. |
| availableCount | Number of remaining slots available in the lobby. |
| timeoutStartedAt | Timestamp when the lobby’s timeout countdown began. |
| timedOutAt | Timestamp when the lobby timed out. |
| queuedPlayerIds | IDs of players queued for this lobby but not yet joined. |
| playerIds | IDs of players currently in the lobby. |
| gameId | Identifier of the game created from this lobby (if any). |
| treatmentId | Identifier of the experimental treatment assigned to the lobby. |
| batchId | Identifier linking the lobby to its batch/run. |
| lobbyConfigId | Identifier of the lobby configuration used. |
| createdAt | Timestamp when the lobby record was created. |

## Wave 3 data/Epoch 1/games.csv
| Variable | Description |
|---|---|
| _id | Unique identifier for the game record. |
| finishedAt | Timestamp when the game ended. |
| gameLobbyId | Identifier of the lobby from which this game originated. |
| treatmentId | Identifier of the experimental treatment assigned to the game. |
| roundIds | Identifiers of the rounds included in the game. |
| playerIds | Identifiers of players who participated in the game. |
| batchId | Identifier linking the game to its batch/run. |
| createdAt | Timestamp when the game was created. |
| data.round_count | Number of rounds in the game. |
| data.totalDuration | Total duration of the game (seconds). |
| data.justStarted | Indicator of whether the game had just started at the time of logging. |
| data.unscored | Names of tasks in the game that were not scored. |
| data.scored | Names of tasks in the game that were scored. |

## Wave 3 data/Epoch 1/lobby-configs.csv
| Variable | Description |
|---|---|
| _id | Unique identifier for the lobby timeout configuration record. |
| name | Human-readable name of the lobby configuration preset. |
| timeoutType | Context to which the timeout applies (e.g., lobby). |
| timeoutInSeconds | Timeout duration in seconds. |
| timeoutStrategy | Strategy to apply when a timeout occurs (e.g., fail). |
| timeoutBots | Bot-filling behavior/settings used upon timeout (if applicable). |
| extendCount | Number of allowed timeout extensions before final timeout. |
| createdAt | Timestamp when the lobby configuration was created. |
| archivedAt | Timestamp when the lobby configuration was archived (blank if active). |

## Wave 3 data/Epoch 1/player-inputs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the survey response record. |
| playerId | Identifier of the participant submitting the survey. |
| gameId | Identifier of the game associated with this survey response. |
| createdAt | Timestamp when the survey response was created/submitted. |
| data.synergyPreference | Stated preference for working individually versus in a team. |
| data.teamViability | Whether the participant felt the team was viable for future collaboration. |
| data.enjoyedTask | Self-reported enjoyment of the task (Likert-style response). |
| data.age | Self-reported age. |
| data.gender | Self-reported gender. |
| data.strengthInGame | Open-ended description of the participant’s strengths in the game/task. |
| data.payFair | Open-ended feedback about perceived pay fairness. |
| data.feedbackOpenEnded | Open-ended feedback about the task/session. |
| data.feedbackMultipleChoice | Response to a multiple-choice feedback question. |
| data.education | Self-reported highest level of education. |

## Wave 3 data/Epoch 1/player-logs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the event record. |
| playerId | Identifier of the participant who generated the event. |
| gameId | Identifier of the game during which the event occurred. |
| roundId | Identifier of the round associated with the event. |
| stageId | Identifier of the stage associated with the event. |
| name | Event type or category (e.g., action). |
| jsonData | Structured payload describing the event (verb, object, timestamp, etc.). |
| createdAt | Timestamp when the event was recorded. |

## Wave 3 data/Epoch 1/player-rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the record. |
| batchId | Identifier of the batch/run associated with the record. |
| playerId | Identifier of the participant. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game associated with the record. |
| createdAt | Timestamp when the record was created. |

## Wave 3 data/Epoch 1/player-stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the submission/response record. |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the participant. |
| stageId | Identifier of the stage associated with the record. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game associated with the record. |
| createdAt | Timestamp when the record was created. |
| submittedAt | Timestamp when the participant submitted the response for the stage. |
| data.maxPossiblePay | Maximum payment possible for this stage/step. |
| data.payEarned | Payment earned for this stage/step. |
| data.correct | Whether the participant’s response was correct. |
| data.directionsCompleted | Whether the participant completed the directions/instructions. |
| data.showOverview | Flag indicating whether to show the overview screen for this step. |
| data.scoreFeedback | Score or feedback value presented to the participant. |
| data.scoreArr | Array of component scores or per-item scoring. |
| data.step | Step identifier or label within the stage. |
| data.wordsMissed | Items or words missed in the task. |
| data.score | Total score computed for the stage. |


## Wave 3 data/Epoch 1/players.csv

| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Participant/session identifier (may include retirement notes). |
| urlParams | URL/query parameters captured at session start (e.g., workerId). |
| bot | Flag indicating the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Completed exit steps or stages (e.g., ExitSurvey, PayScreen). |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Exit outcome status (e.g., finished, gameLobbyTimedOut). |
| exitReason | Reason provided for exit. |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata object containing the participant’s last login timestamp. |
| data.index | Participant’s index/position within the session or network. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.avatar | Avatar metadata (name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustments. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work or payment was approved. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.currentlyIdle | Whether the participant is currently idle. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |
| data.stepApproved | Whether the current step/event was approved by an admin. |
| data.submitCoordinateApproved | Whether the submitted coordinate/action was approved. |

## Wave 3 data/Epoch 1/rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the round record. |
| index | Round’s position/order within the game. |
| stageIds | Identifiers of stages belonging to this round (ordered list). |
| gameId | Identifier of the game this round belongs to. |
| createdAt | Timestamp when the round record was created. |
| data.type | Task/type code for the round’s activity. |
| data.name | Human-readable name of the round’s task. |
| data.anonName | Anonymized label for the task (e.g., “Game 1”). |
| data.current_round | Index of the current round at the time of logging. |
| data.A | Auxiliary field reserved for task-specific data (unused if blank). |

## Wave 3 data/Epoch 1/stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the stage record. |
| index | Stage’s position/order within the round. |
| name | Internal name of the stage. |
| displayName | Human-readable name of the stage. |
| startTimeAt | Timestamp when the stage started. |
| durationInSeconds | Stage duration limit in seconds. |
| roundId | Identifier of the round this stage belongs to. |
| gameId | Identifier of the game this stage belongs to. |
| createdAt | Timestamp when the stage record was created. |
| data.type | Task/type code for the stage’s activity. |
| data.component_path | Path(s) to the UI component(s) used for the stage. |
| data.stage_type | Stage category (e.g., intro, game). |
| data.stage_count | Number of stages of this type in the round/game. |
| data.anonName | Anonymized label for the stage (e.g., “Game 1 Round 1”). |
| data.idledPlayers | Log of players who became idle and the associated timestamps. |
| data.stage_config | Stage-specific configuration key or mode. |
| data.constants | Task configuration object (e.g., items, questions, stimuli, scoring flags). |
| data.sandboxWordList | Sandbox or practice word list (task-specific; may be unused). |
| data.finalWordList | Final/official word list (task-specific; may be unused). |
| data.scoreIncrement | Change in score attributed to this stage/action. |
| data.scroll | Whether scrolling state/behavior was active during the stage. |
| data.colorFilter | Active color filter applied to stimuli/options. |
| data.hornFilter | Active horn/attribute filter applied to stimuli/options. |
| data.bodyFilter | Active body-type filter applied to stimuli/options. |
| data.filteredAnimals | List of items remaining after filters were applied. |
| data.clicked | Per-item selection/click state array for the stage UI. |
| data.maxPossibleScore | Maximum score attainable for this stage. |
| data.startTimeAt | Timestamp(s) marking stage or item start (ms since epoch). |
| data.defaultStageLength | Default stage duration in milliseconds. |
| data.defaultEndTimeAt | Scheduled end timestamp for the stage (ms since epoch). |
| data.imageIndex | Index of the currently displayed stimulus/image. |
| data.selectedSpecies | Object describing the currently selected item/species. |
| data.answers | Recorded responses for the stage’s question(s)/item(s). |
| data.endTimeAt | Timestamp(s) when the stage or item(s) ended (ms since epoch). |
| data.stageLength | Measured duration(s) of the stage (ms). |
| data.similaritiesList | Task-specific similarity metrics or list (if applicable). |
| data.log | Stage-level event log (task-specific). |
| data.recalledWords | Words recalled/entered by the participant (task-specific). |
| data.currXCoord | Current X coordinate in grid/canvas-based tasks. |
| data.currYCoord | Current Y coordinate in grid/canvas-based tasks. |
| data.previousCoords | History of prior coordinates/selections. |
| data.previousCoordsSet | Set representation of prior coordinates/selections. |
| data.scoreGrid | Grid/matrix of scores used for grid-based tasks. |
| data.wildcatWellsCurrentRound | State object for “Wildcat Wells” task for the current round. |
| data.fakeStageStartTime | Client-derived stage start time used for synchronization. |
| data.lastClickedPlayer | Identifier of the most recent player to interact/click. |

## Wave 3 data/Epoch 1/treatments.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the factor set (treatment) record. |
| name | Name/label of the factor set configuration (e.g., single-s0-i0). |
| factorIds | List of identifiers for the factors included in this set. |
| createdAt | Timestamp when the factor set was created. |
| archivedAt | Timestamp when the factor set was archived (blank if active). |

## Wave 2 data/offline scoring.csv

| Variable | Description |
|---|---|
| stageId | Unique identifier for the stage record (whre each stage represents a single task instance---a given task, at a given level of complexity). |
| score | Score achieved in the stage (points) for a subset of tasks that cannot be evaluated directly in the browser, and are instead evaluated via a post-hoc annotation pipeline. |

## Wave 2 data/paid bonuses.csv

| Variable | Description |
|---|---|
| WorkerId | Platform worker identifier for the participant. |
| AssignmentId | Platform assignment identifier associated with the submission. |
| BonusAmount | Monetary bonus amount awarded (e.g., USD). |
| UniqueRequestToken | Unique token used to prevent duplicate bonus transactions. |
| Reason | Free-text explanation for issuing the bonus. |

## Wave 2 data/Epoch 1/batches.csv

| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| index | Sequential index/order of the batch or run. |
| assignment | Assignment configuration label for the run (e.g., complete). |
| full | Whether the batch/run reached capacity. |
| runningAt | Timestamp when the batch/run started. |
| finishedAt | Timestamp when the batch/run ended. |
| status | Current or final status of the batch/run (e.g., finished, cancelled). |
| gameIds | Identifiers of games created in this batch/run. |
| gameLobbyIds | Identifiers of game lobbies associated with this batch/run. |
| createdAt | Timestamp when the record was created. |
| archivedAt | Timestamp when the record was archived. |

## Wave 2 data/Epoch 1/factor-types.csv

| Variable | Description |
|---|---|
| _id | Internal identifier for the configuration parameter record. |
| name | Name of the configuration parameter. |
| required | Whether this parameter must be provided. |
| description | Human-readable explanation of the parameter’s purpose. |
| type | Data type of the parameter (e.g., Integer, Number, String). |
| min | Minimum allowable value (if applicable). |
| max | Maximum allowable value (if applicable). |
| createdAt | Timestamp when the parameter record was created. |
| archivedAt | Timestamp when the parameter was archived (blank if active). |

## Wave 2 data/Epoch 1/factors.csv

| Variable | Description |
|---|---|
| _id | Internal identifier for the factor value record. |
| name | Name or label of the factor setting. |
| value | Assigned value of the factor (boolean). |
| factorTypeId | Identifier linking to the factor type definition. |
| createdAt | Timestamp when the factor value record was created. |

## Wave 2 data/Epoch 1/game-lobbies.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game lobby record. |
| index | Lobby’s position/order within its batch. |
| availableCount | Number of remaining participant slots available in the lobby. |
| timeoutStartedAt | Timestamp when the lobby’s timeout countdown began. |
| timedOutAt | Timestamp when the lobby timed out (blank if not timed out). |
| queuedPlayerIds | Identifiers of players queued for this lobby but not yet joined. |
| playerIds | Identifiers of players currently in the lobby. |
| gameId | Identifier of the game created from this lobby (if any). |
| treatmentId | Identifier of the experimental treatment assigned to the lobby. |
| batchId | Identifier linking the lobby to its batch/run. |
| lobbyConfigId | Identifier of the lobby configuration used. |
| createdAt | Timestamp when the lobby record was created. |

## Wave 2 data/Epoch 1/games.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game record. |
| finishedAt | Timestamp when the game ended (blank if ongoing). |
| gameLobbyId | Identifier of the lobby from which this game originated. |
| treatmentId | Identifier of the experimental treatment assigned to the game. |
| roundIds | Identifiers of the rounds included in the game. |
| playerIds | Identifiers of players who participated in the game. |
| batchId | Identifier linking the game to its batch/run. |
| createdAt | Timestamp when the game was created. |
| data.round_count | Number of rounds in the game. |
| data.totalDuration | Total duration of the game (seconds). |
| data.justStarted | Indicator of whether the game had just started at the time of logging. |
| data.unscored | Names of tasks in the game that were not scored. |
| data.scored | Names of tasks in the game that were scored. |

## Wave 2 data/Epoch 1/lobby-configs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the lobby timeout configuration record. |
| name | Human-readable name of the lobby configuration preset. |
| timeoutType | Context to which the timeout applies (e.g., lobby). |
| timeoutInSeconds | Timeout duration in seconds. |
| timeoutStrategy | Strategy to apply when a timeout occurs (e.g., fail). |
| timeoutBots | Bot-filling behavior/settings used upon timeout (if applicable). |
| extendCount | Number of allowed timeout extensions before final timeout. |
| createdAt | Timestamp when the lobby configuration was created. |
| archivedAt | Timestamp when the lobby configuration was archived (blank if active). |

## Wave 2 data/Epoch 1/player-inputs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the survey response record. |
| playerId | Identifier of the participant submitting the survey. |
| gameId | Identifier of the game associated with this survey response. |
| createdAt | Timestamp when the survey response was created/submitted. |
| data.synergyPreference | Stated preference for working individually versus in a team. |
| data.teamViability | Whether the participant felt the team was viable for future collaboration. |
| data.enjoyedTask | Self-reported enjoyment of the task (Likert-style response). |
| data.age | Self-reported age. |
| data.gender | Self-reported gender. |
| data.strengthInGame | Open-ended description of the participant’s strengths in the game/task. |
| data.payFair | Open-ended feedback about perceived pay fairness. |
| data.feedbackOpenEnded | Open-ended feedback about the task/session. |
| data.feedbackMultipleChoice | Response to a multiple-choice feedback question. |
| data.education | Self-reported highest level of education. |

## Wave 2 data/Epoch 1/player-logs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the event record. |
| playerId | Identifier of the participant who generated the event. |
| gameId | Identifier of the game during which the event occurred. |
| roundId | Identifier of the round associated with the event. |
| stageId | Identifier of the stage associated with the event. |
| name | Event type or category (e.g., action). |
| jsonData | Structured payload describing the event (e.g., verb, object, timestamp). |
| createdAt | Timestamp when the event was recorded. |

## Wave 2 data/Epoch 1/player-rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the record. |
| batchId | Identifier of the batch/run associated with the record. |
| playerId | Identifier of the participant. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game associated with the record. |
| createdAt | Timestamp when the record was created. |

## Wave 2 data/Epoch 1/player-stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the submission/response record. |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the participant. |
| stageId | Identifier of the stage associated with the record. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game associated with the record. |
| createdAt | Timestamp when the record was created. |
| submittedAt | Timestamp when the participant submitted the response for the stage. |
| data.maxPossiblePay | Maximum payment possible for this stage/step. |
| data.payEarned | Payment earned for this stage/step. |
| data.correct | Whether the participant’s response was correct. |
| data.directionsCompleted | Whether the participant completed the directions/instructions. |
| data.showOverview | Flag indicating whether to show the overview screen for this step. |
| data.score | Total score computed for the stage/step. |
| data.clicked | Per-item click/selection state or raw click data for the stage UI. |
| data.approved | Whether the submission was approved for payment/credit. |
| data.stepApproved | Whether the specific step within the stage was approved. |
| data.audioError | Error flag/details related to audio capture or playback. |
| data.scoreArr | Array of component scores or per-item scoring. |
| data.scoreFeedback | Score or feedback value presented to the participant. |
| data.hoveredGrid | Hover state or list of hovered cells in grid-based tasks. |

## Wave 2 data/Epoch 1/players.csv

| Variable | Description |
|---|---|
| _id | Internal database record identifier. |
| id | Participant/session identifier (may include retirement notes). |
| urlParams | URL/query parameters captured at session start (e.g., workerId). |
| bot | Flag indicating the record corresponds to a bot participant. |
| readyAt | Timestamp when the participant became ready/joined the session. |
| timeoutStartedAt | Timestamp when a timeout countdown started. |
| timeoutWaitCount | Number of timeout wait cycles encountered. |
| exitStepsDone | Completed exit steps or stages (e.g., ExitSurvey, PayScreen). |
| exitAt | Timestamp when the participant exited the session. |
| exitStatus | Exit outcome status (e.g., gameFull, gameCancelled). |
| exitReason | Reason provided for exit. |
| retiredAt | Timestamp when the record/participant was retired. |
| retiredReason | Reason the record/participant was retired. |
| createdAt | Timestamp when the record was created. |
| lastLogin | Metadata object containing the participant’s last login timestamp. |
| data.index | Participant’s index/position within the session or network. |
| data.neighbors | Neighbor indices/IDs in the session’s network structure. |
| data.chatGroups | Assigned chat group label(s). |
| data.avatar | Avatar metadata (name, SVG, color). |
| data.score | Raw score earned by the participant. |
| data.adjustedScore | Score after adjustments. |
| data.playerIds | Identifiers of all players in the associated session. |
| data.totalPayment | Total payment earned by the participant. |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks. |
| data.approved | Whether the participant’s work or payment was approved. |
| data.currentlyIdle | Whether the participant is currently idle. |
| data.lastTick | Timestamp of the last heartbeat/tick from the client (ms since epoch). |
| data.option | Session option/treatment code associated with the participant. |
| data.leftGameOffline | Indicator that the participant left due to going offline. |
| data.stepApproved | Whether the current step/event was approved by an admin. |
| data.getAudio | Audio capture permission/status flag for the session. |

## Wave 2 data/Epoch 1/rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the round record. |
| index | Round’s position/order within the game. |
| stageIds | Identifiers of stages belonging to this round (ordered list). |
| gameId | Identifier of the game this round belongs to. |
| createdAt | Timestamp when the round record was created. |
| data.type | Task/type code for the round’s activity. |
| data.name | Human-readable name of the round’s task. |
| data.anonName | Anonymized label for the task (e.g., “Game 1”). |
| data.current_round | Index of the current round at the time of logging. |
| data.A | Auxiliary field reserved for task-specific data (unused if blank). |

## Wave 2 data/Epoch 1/stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the stage record. |
| index | Stage’s position/order within the round. |
| name | Internal name of the stage. |
| displayName | Human-readable name of the stage. |
| startTimeAt | Timestamp when the stage started. |
| durationInSeconds | Stage duration limit in seconds. |
| roundId | Identifier of the round this stage belongs to. |
| gameId | Identifier of the game this stage belongs to. |
| createdAt | Timestamp when the stage record was created. |
| data.0 | Placeholder or task-specific auxiliary field (unused if blank). |
| data.type | Task/type code for the stage’s activity. |
| data.component_path | Path(s) to the UI component(s) used for the stage. |
| data.stage_type | Stage category (e.g., intro, game). |
| data.stage_count | Number of stages of this type in the round/game. |
| data.anonName | Anonymized label for the stage (e.g., “Game 1 Round 1”). |
| data.idledPlayers | Log of players who became idle and associated timestamps. |
| data.stage_config | Stage-specific configuration key or mode. |
| data.constants | Task configuration object (e.g., stimuli, questions, scoring flags). |
| data.case | Text passage or stimulus content presented in the stage. |
| data.isDisagree | Flag indicating a disagreement/negation state (task-specific). |
| data.etherpadData | State of shared editor(s) keyed by pad name (task-specific). |
| data.startTimeAt | Stage or item start timestamp(s) in milliseconds since epoch. |
| data.defaultStageLength | Default stage duration in milliseconds. |
| data.defaultEndTimeAt | Scheduled end timestamp(s) for the stage/items (ms since epoch). |
| data.endTimeAt | Actual end timestamp(s) for the stage/items (ms since epoch). |
| data.stageLength | Measured duration(s) for the stage/items (ms). |
| data.wordsList | List of words presented for recall or typing (task-specific). |
| data.lastWords | Most recent words shown or entered (task-specific). |
| data.listAnswers | Responses to list-based prompts (task-specific). |
| data.wordAnswer | Response to a single-word prompt (task-specific). |
| data.needAudioReset | Flag indicating audio state should be reset. |
| data.needTypeReset | Flag indicating typing state should be reset. |
| data.needLeftReset | Flag indicating left-side UI state should be reset. |
| data.step | Step identifier or label within the stage. |
| data.maxScore | Maximum attainable score for the stage. |
| data.startOfGame | Indicator that this record marks the start of the game/stage. |
| data.speed | Speed metric (e.g., typing speed; task-specific). |
| data.corrDotPercent | Correctness percentage for dot-based task (task-specific). |
| data.corrAngle | Correctness metric for angle-based task (task-specific). |
| data.seed | Random seed used for stage randomization. |
| data.approved | Whether the submission for this stage was approved. |
| data.angleAns | Participant’s answer for angle-based task (task-specific). |
| data.idList | List of item identifiers used in the stage. |
| data.average | Average performance metric (task-specific). |
| data.displayFeedback | Whether feedback should be displayed to the participant. |
| data.userInputList | List of user-entered inputs during the stage. |
| data.input0 | User input field 0 (task-specific). |
| data.input5 | User input field 5 (task-specific). |
| data.input6 | User input field 6 (task-specific). |
| data.input1 | User input field 1 (task-specific). |
| data.input4 | User input field 4 (task-specific). |
| data.grid | Grid data or layout used in the stage (task-specific). |
| data.answers | Recorded responses for the stage’s question(s)/item(s). |
| data.input2 | User input field 2 (task-specific). |
| data.input7 | User input field 7 (task-specific). |
| data.input3 | User input field 3 (task-specific). |
| data.maxPossiblePay | Maximum payment possible for this stage/step. |
| data.payEarned | Payment earned for this stage/step. |

## Wave 2 data/Epoch 1/treatments.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the record. |
| name | Human-readable name or slug for the record. |
| factorIds | List of associated factor IDs linked to the record. |
| createdAt | ISO 8601 timestamp (UTC) when the record was created. |
| archivedAt | ISO 8601 timestamp (UTC) when the record was archived; null/absent if not archived. |

## Wave 1 data/offline scoring.csv

| Variable | Description |
|---|---|
| stageId | Unique identifier for the stage record (where each stage represents a single task instance—a given task, at a given level of complexity). |
| score | Score achieved in the stage (points) for a subset of tasks that cannot be evaluated directly in the browser, and are instead evaluated via a post-hoc annotation pipeline. |

## Wave 1 data/paid bonuses.csv

| Variable | Description |
|---|---|
| WorkerId | Unique identifier for the worker/participant. |
| AssignmentId | Unique identifier for the worker’s specific assignment/submission. |
| BonusAmount | Monetary bonus amount awarded to the worker (USD). |
| UniqueRequestToken | Client-specified idempotency token for the bonus payment request to prevent duplicate payments. |
| Reason | Free-text message explaining the reason for the bonus (included in the worker notification). |

## Wave 1 data/Epoch 1/batches.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the run/lobby batch record. |
| index | Sequence number of the run within the overall launch/batch. |
| assignment | Participant assignment policy/mode used for the run (e.g., complete). |
| full | Whether all targeted lobbies were filled to capacity. |
| runningAt | Timestamp (ISO 8601, UTC) when the run started. |
| finishedAt | Timestamp (ISO 8601, UTC) when the run finished. |
| status | Terminal status of the run (e.g., cancelled, finished). |
| gameIds | Identifiers of game instances created/linked by this run. |
| gameLobbyIds | Identifiers of the game lobbies included in this run. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 1/factor-types.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the configuration parameter definition. |
| name | Parameter key/name (e.g., playerCount, stageDuration, introDuration). |
| required | Whether this parameter is mandatory in the game configuration. |
| description | Human-readable explanation of what the parameter controls. |
| type | Data type of the parameter (e.g., Integer, Number, String). |
| min | Minimum allowed value for the parameter (if numeric; otherwise not applicable). |
| max | Maximum allowed value for the parameter (if numeric; otherwise not applicable). |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 1/factors.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the factor value record. |
| name | Human-readable label for the factor value (e.g., True/False). |
| value | Stored value for the factor (e.g., boolean True/False). |
| factorTypeId | Identifier of the factor type this value belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |

## Wave 1 data/Epoch 1/game-lobbies.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game lobby record. |
| index | Zero-based sequence index of the lobby within the batch. |
| availableCount | Number of open player slots remaining in the lobby. |
| timeoutStartedAt | Timestamp (ISO 8601, UTC) when the lobby timeout countdown started. |
| timedOutAt | Timestamp (ISO 8601, UTC) when the lobby timed out; null/absent if it did not time out. |
| queuedPlayerIds | Identifiers of players queued for this lobby but not yet admitted. |
| playerIds | Identifiers of players currently admitted/assigned to this lobby. |
| gameId | Identifier of the game instance created for this lobby (if created). |
| treatmentId | Identifier of the treatment/experimental condition applied to this lobby. |
| batchId | Identifier of the batch/run that created this lobby. |
| lobbyConfigId | Identifier of the lobby configuration used. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |

## Wave 1 data/Epoch 1/games.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game record. |
| finishedAt | Timestamp (ISO 8601, UTC) when the game finished; null/absent if not finished. |
| gameLobbyId | Identifier of the lobby from which this game was created. |
| treatmentId | Identifier of the treatment/experimental condition applied to the game. |
| roundIds | Identifiers of the rounds included in the game. |
| playerIds | Identifiers of players participating in the game. |
| batchId | Identifier of the batch/run that spawned the game. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.round_count | Number of rounds in the game. |
| data.totalDuration | Total planned duration of the game in seconds. |
| data.justStarted | Whether the game has just started (boolean). |
| data.unscored | Names/identifiers of tasks in the game that are unscored or pending scoring. |
| data.scored | Names/identifiers of tasks in the game that have been scored. |

## Wave 1 data/Epoch 1/lobby-configs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the lobby configuration record. |
| name | Human-readable name of the lobby configuration. |
| timeoutType | Context in which the timeout applies (e.g., lobby). |
| timeoutInSeconds | Time limit (in seconds) before the lobby times out. |
| timeoutStrategy | Action to take when a timeout occurs (e.g., fail, proceed). |
| timeoutBots | Configuration for using bots when timing out (e.g., whether/which bots fill slots). |
| extendCount | Number of allowed timeout extensions before enforcing the strategy. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 1/player-inputs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the survey/feedback record. |
| playerId | Identifier of the player associated with this response. |
| gameId | Identifier of the game instance associated with this response. |
| createdAt | Timestamp (ISO 8601, UTC) when the response was recorded. |
| data.age | Self-reported age in years. |
| data.gender | Self-reported gender. |
| data.strengthInGame | Free-text description of the participant’s strengths or favored tasks. |
| data.payFair | Response indicating whether the compensation felt fair. |
| data.feedbackOpenEnded | Free-text open-ended feedback about the experience. |
| data.feedbackMultipleChoice | Response to a multiple-choice feedback question. |
| data.education | Self-reported highest level of education attained. |

## Wave 1 data/Epoch 1/player-logs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the event log record. |
| playerId | Identifier of the player who generated the event. |
| gameId | Identifier of the game instance in which the event occurred. |
| roundId | Identifier of the round associated with the event. |
| stageId | Identifier of the stage associated with the event. |
| name | Event name/type (e.g., action). |
| jsonData | Structured JSON payload describing the event (e.g., verb, object, target, at), including a client-side timestamp in milliseconds. |
| createdAt | Server-side timestamp (ISO 8601, UTC) when the event was recorded. |

## Wave 1 data/Epoch 1/player-rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the participation record. |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the player. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game instance. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.team | Team designation or label for the player within the game/round (if applicable). |

## Wave 1 data/Epoch 1/player-stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the submission/response record. |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the player submitting the response. |
| stageId | Identifier of the stage associated with the response. |
| roundId | Identifier of the round associated with the response. |
| gameId | Identifier of the game instance associated with the response. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| submittedAt | Timestamp (ISO 8601, UTC) when the response was submitted. |
| data.maxPossiblePay | Maximum possible earnings for the stage (USD). |
| data.payEarned | Actual earnings for the stage (USD). |
| data.correct | Whether the submitted answer/solution was correct. |
| data.directionsCompleted | Whether the participant completed the directions/instructions step. |
| data.showOverview | Whether to show the overview screen for this stage. |
| data.showInstructions | Whether to show the instructions screen for this stage. |
| data.showPerformance | Whether to show the performance/feedback screen for this stage. |
| data.showAlertPractice | Whether to show the practice alert screen for this stage. |
| data.showQuiz | Whether to show a quiz/checkpoint screen for this stage. |
| data.approved | Whether the submission was approved for payout/credit. |
| data.scoreArr | Array of intermediate score values recorded during the stage. |
| data.score | Final/aggregate score for the stage. |
| data.currBoardData | Serialized current board/state of the task (task-specific). |
| data.coords | Coordinates/positions selected or interacted with (task-specific). |
| data.dotsClaimed | Identifiers of dots/targets claimed (task-specific). |
| data.scoreFeedback | Textual feedback about the player’s score/performance. |
| data.clicked | Click interaction record(s) captured during the stage (task-specific). |
| data.option | Selected option/choice for the stage (task-specific). |

## Wave 1 data/Epoch 1/players.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the player record. |
| id | External worker/participant identifier (may include retirement annotations). |
| urlParams | URL query parameters captured at join time (e.g., workerId). |
| bot | Flag/metadata indicating a bot participant (if applicable). |
| readyAt | Timestamp (ISO 8601, UTC) when the player became ready in the lobby. |
| timeoutStartedAt | Timestamp (ISO 8601, UTC) when the player’s timeout countdown began. |
| timeoutWaitCount | Number of lobby timeout wait cycles experienced by the player. |
| exitStepsDone | Exit flow steps completed (count/flags). |
| exitAt | Timestamp (ISO 8601, UTC) when the player exited the session. |
| exitStatus | Standardized exit status (e.g., gameFull, custom, gameCancelled). |
| exitReason | Reason explaining the exit status (e.g., timedOut). |
| retiredAt | Timestamp (ISO 8601, UTC) when the player was retired. |
| retiredReason | Reason the player was retired (e.g., gameFull, gameCancelled). |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| lastLogin | Last-login metadata; includes an 'at' timestamp (ISO 8601, UTC). |
| data.index | Player’s index/position within the session/lobby. |
| data.neighbors | List of neighboring player indices/IDs in a networked task. |
| data.chatGroups | Chat group assignment label for the player. |
| data.avatar | Selected avatar metadata (e.g., name, SVG, color). |
| data.score | Player’s aggregate score for the session/game. |
| data.adjustedScore | Score after adjustments (e.g., penalties/normalization). |
| data.playerIds | IDs of players associated with this player’s group/network. |
| data.totalPayment | Total payment earned by the player (USD). |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks (USD). |
| data.approved | Whether the player’s overall session was approved for payout. |
| data.lastTick | Last client heartbeat/tick timestamp (milliseconds since epoch). |
| data.leftGameIdle | Whether the player left the game due to inactivity. |
| data.submitted | Whether the player submitted final responses/exit flow. |
| data.playerClickingCellID | Identifier of the cell currently being clicked (task-specific). |
| data.option | Selected option/choice (task-specific). |
| data.leftGameOffline | Whether the player left/disconnected due to being offline. |

## Wave 1 data/Epoch 1/rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the round record. |
| index | Zero-based position of the round within the game. |
| stageIds | Identifiers of the stages that comprise this round. |
| gameId | Identifier of the game this round belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.type | Task type key for the round (e.g., RoomAssignment, WolfGoatCabbage). |
| data.name | Human-readable task name for the round. |
| data.anonName | Anonymized/display label for the round (e.g., Game 1). |
| data.current_round | Current round index within the game (zero-based). |
| data.bonusRate | Multiplier used to convert score to bonus payment for this round. |
| data.assigned | Assignment metadata/flag for the round (task-specific). |
| data.similarityList | List of similarity values/structures used by the round (task-specific). |
| data.A | Task-specific field A associated with this round. |

## Wave 1 data/Epoch 1/stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the stage record. |
| index | Zero-based order of the stage within the round. |
| name | Internal stage name/slug. |
| displayName | Human-readable stage title. |
| startTimeAt | Stage start timestamp (ISO 8601, UTC). |
| durationInSeconds | Planned duration of the stage in seconds. |
| roundId | Identifier of the round this stage belongs to. |
| gameId | Identifier of the game this stage belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.type | Task type key for the stage (e.g., RoomAssignment, WolfGoatCabbage). |
| data.component_path | Path to the frontend component implementing the stage UI. |
| data.stage_type | Stage category/type (e.g., intro, game). |
| data.stage_count | Number of stages in the task/game sequence. |
| data.anonName | Anonymized/display label for the stage. |
| data.stage_config | Stage configuration mode or payload. |
| data.constants | Serialized task constants for the Room Assignment Task (students, rooms, payoff matrix, constraints, scoring flags, instance name). |
| data.maxPossibleScore | Maximum attainable score for this stage instance. |
| data.student-A-room | Room Assignment Task: selected/assigned room for student A. |
| data.student-B-room | Room Assignment Task: selected/assigned room for student B. |
| data.student-C-room | Room Assignment Task: selected/assigned room for student C. |
| data.student-D-room | Room Assignment Task: selected/assigned room for student D. |
| data.constraint-1-A-C-violated | Room Assignment Task: whether the constraint of type 1 between students A and C was violated. |
| data.startTimeAt | Client-recorded stage start timestamp (milliseconds since epoch). |
| data.defaultStageLength | Default stage length (milliseconds). |
| data.defaultEndTimeAt | Default end timestamp (milliseconds since epoch). |
| data.student-B-dragger | Room Assignment Task: UI drag-handle state/position for student B. |
| data.student-D-dragger | Room Assignment Task: UI drag-handle state/position for student D. |
| data.student-C-dragger | Room Assignment Task: UI drag-handle state/position for student C. |
| data.student-A-dragger | Room Assignment Task: UI drag-handle state/position for student A. |
| data.endTimeAt | Client-recorded stage end timestamp (milliseconds since epoch). |
| data.stageLength | Actual stage duration (milliseconds). |
| data.student-E-room | Room Assignment Task: selected/assigned room for student E. |
| data.student-F-room | Room Assignment Task: selected/assigned room for student F. |
| data.constraint-0-C-F-violated | Room Assignment Task: whether the constraint of type 0 between students C and F was violated. |
| data.constraint-3-D-E-violated | Room Assignment Task: whether the constraint of type 3 between students D and E was violated. |
| data.student-E-dragger | Room Assignment Task: UI drag-handle state/position for student E. |
| data.student-F-dragger | Room Assignment Task: UI drag-handle state/position for student F. |
| data.student-G-room | Room Assignment Task: selected/assigned room for student G. |
| data.student-H-room | Room Assignment Task: selected/assigned room for student H. |
| data.constraint-1-C-D-violated | Room Assignment Task: whether the constraint of type 1 between students C and D was violated. |
| data.constraint-2-D-E-violated | Room Assignment Task: whether the constraint of type 2 between students D and E was violated. |
| data.constraint-3-E-H-violated | Room Assignment Task: whether the constraint of type 3 between students E and H was violated. |
| data.constraint-1-F-H-violated | Room Assignment Task: whether the constraint of type 1 between students F and H was violated. |
| data.student-H-dragger | Room Assignment Task: UI drag-handle state/position for student H. |
| data.student-G-dragger | Room Assignment Task: UI drag-handle state/position for student G. |
| data.student-I-room | Room Assignment Task: selected/assigned room for student I. |
| data.student-J-room | Room Assignment Task: selected/assigned room for student J. |
| data.student-K-room | Room Assignment Task: selected/assigned room for student K. |
| data.student-L-room | Room Assignment Task: selected/assigned room for student L. |
| data.student-M-room | Room Assignment Task: selected/assigned room for student M. |
| data.student-N-room | Room Assignment Task: selected/assigned room for student N. |
| data.student-O-room | Room Assignment Task: selected/assigned room for student O. |
| data.student-P-room | Room Assignment Task: selected/assigned room for student P. |
| data.student-Q-room | Room Assignment Task: selected/assigned room for student Q. |
| data.student-R-room | Room Assignment Task: selected/assigned room for student R. |
| data.constraint-2-A-B-violated | Room Assignment Task: whether the constraint of type 2 between students A and B was violated. |
| data.constraint-3-A-J-violated | Room Assignment Task: whether the constraint of type 3 between students A and J was violated. |
| data.constraint-2-B-F-violated | Room Assignment Task: whether the constraint of type 2 between students B and F was violated. |
| data.constraint-0-B-H-violated | Room Assignment Task: whether the constraint of type 0 between students B and H was violated. |
| data.constraint-3-B-P-violated | Room Assignment Task: whether the constraint of type 3 between students B and P was violated. |
| data.constraint-2-C-E-violated | Room Assignment Task: whether the constraint of type 2 between students C and E was violated. |
| data.constraint-1-C-J-violated | Room Assignment Task: whether the constraint of type 1 between students C and J was violated. |
| data.constraint-3-D-F-violated | Room Assignment Task: whether the constraint of type 3 between students D and F was violated. |
| data.constraint-3-E-Q-violated | Room Assignment Task: whether the constraint of type 3 between students E and Q was violated. |
| data.constraint-1-F-I-violated | Room Assignment Task: whether the constraint of type 1 between students F and I was violated. |
| data.constraint-2-G-J-violated | Room Assignment Task: whether the constraint of type 2 between students G and J was violated. |
| data.constraint-3-I-N-violated | Room Assignment Task: whether the constraint of type 3 between students I and N was violated. |
| data.constraint-3-J-K-violated | Room Assignment Task: whether the constraint of type 3 between students J and K was violated. |
| data.constraint-2-K-R-violated | Room Assignment Task: whether the constraint of type 2 between students K and R was violated. |
| data.constraint-3-L-Q-violated | Room Assignment Task: whether the constraint of type 3 between students L and Q was violated. |
| data.constraint-0-M-O-violated | Room Assignment Task: whether the constraint of type 0 between students M and O was violated. |
| data.constraint-0-N-R-violated | Room Assignment Task: whether the constraint of type 0 between students N and R was violated. |
| data.constraint-2-O-P-violated | Room Assignment Task: whether the constraint of type 2 between students O and P was violated. |
| data.student-R-dragger | Room Assignment Task: UI drag-handle state/position for student R. |
| data.student-K-dragger | Room Assignment Task: UI drag-handle state/position for student K. |
| data.student-Q-dragger | Room Assignment Task: UI drag-handle state/position for student Q. |
| data.student-O-dragger | Room Assignment Task: UI drag-handle state/position for student O. |
| data.student-J-dragger | Room Assignment Task: UI drag-handle state/position for student J. |
| data.student-N-dragger | Room Assignment Task: UI drag-handle state/position for student N. |
| data.student-P-dragger | Room Assignment Task: UI drag-handle state/position for student P. |
| data.student-I-dragger | Room Assignment Task: UI drag-handle state/position for student I. |
| data.student-M-dragger | Room Assignment Task: UI drag-handle state/position for student M. |
| data.student-L-dragger | Room Assignment Task: UI drag-handle state/position for student L. |
| data.scoreArr | Array of intermediate score values recorded for the stage (task-specific). |
| data.score | Aggregate/final score recorded for the stage (task-specific). |
| data.wgc-config | Wolf, Goat, Cabbage Transfer: configuration options/state for the river-crossing puzzle. |
| data.goat-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the goat piece. |
| data.boat | Wolf, Goat, Cabbage Transfer: boat position/state. |
| data.wolf-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the wolf piece. |
| data.wolf | Wolf, Goat, Cabbage Transfer: wolf piece position/state. |
| data.cabbage-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the cabbage piece. |
| data.cabbage | Wolf, Goat, Cabbage Transfer: cabbage piece position/state. |
| data.caterpillar-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the caterpillar piece. |
| data.value | Generic input value associated with the stage (task-specific). |
| data.guessed | Whether the participant provided a guess/answer (or the guessed value). |
| data.submitted | Whether the participant submitted their response for the stage. |
| data.currBoardData | Current board/grid state for the puzzle (task-specific structure). |
| data.editableCellID | Identifier of the currently editable cell (if applicable). |
| data.clickingCellID | Identifier of the cell currently being clicked/selected. |
| data.duplicateCellID | Identifier of a cell flagged as duplicate/invalid. |
| data.isDisagree | Flag indicating disagreement selection (task-specific). |
| data.isDuplicate | Flag indicating a duplicate entry/state. |
| data.isSolved | Flag indicating the puzzle/task has been solved. |
| data.dots | Serialized UI “dots”/markers data (task-specific). |
| data.etherpadData | Collaborative editor (Etherpad) content and metadata. |
| data.sandboxWordList | Interim/sandbox word list (task-specific). |
| data.finalWordList | Finalized word list (task-specific). |
| data.scoreIncrement | Incremental score awarded within the stage. |
| data.maxScore | Maximum possible score used by the stage’s scoring logic. |
| data.wordsList | Words list associated with the stage (task-specific). |
| data.allocations | Structured allocations/assignment decisions captured during the stage. |
| data.case | Selected case/scenario identifier. |
| data.option | Selected option/choice identifier. |
| data.student- Room 102 Payoff Rooms 101 102 Student -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Room 102 Payoff Rooms 101 102 Student -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.amount0 | Generic numeric amount field (task-specific). |
| data.amount1 | Generic numeric amount field (task-specific). |
| data.amount2 | Generic numeric amount field (task-specific). |
| data.student- Current Solution Quality 329 Room 101 Room 102 Room 103 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Current Solution Quality 329 Room 101 Room 102 Room 103 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.log | Interaction/action log captured during the stage. |
| data.similarity | Similarity metric/value (task-specific). |
| data.caterpillar | Wolf, Goat, Cabbage Transfer: caterpillar piece position/state. |
| data.goat | Wolf, Goat, Cabbage Transfer: goat piece position/state. |
| data. cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. wolf -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.wolf goat caterpillar -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.Moves Taken: 2 ←→ Empty boat Constraints: - Remaining spots: 2 - No eating occurs on boat - Wolf eats Goat - Goat eats Caterpillar - Caterpillar eats Cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. wolf goat -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.goat -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |

## Wave 1 data/Epoch 1/treatments.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the treatment definition. |
| name | Human-readable label for the treatment (e.g., single, double, triple). |
| factorIds | List of factor value IDs that compose this treatment. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival/retirement timestamp (ISO 8601, UTC); null/absent if active. |

## Wave 1 data/Epoch 2/batches.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the run/batch record. |
| index | Sequence number of the run within the overall launch/batch. |
| assignment | Participant assignment policy/mode used for the run (e.g., complete). |
| full | Whether all targeted lobbies were filled to capacity. |
| runningAt | Timestamp (ISO 8601, UTC) when the run started. |
| finishedAt | Timestamp (ISO 8601, UTC) when the run finished. |
| status | Terminal status of the run (e.g., finished, cancelled). |
| gameIds | Identifiers of game instances created/linked by this run. |
| gameLobbyIds | Identifiers of the game lobbies included in this run. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 2/factor-types.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the configuration parameter definition. |
| name | Parameter key/name (e.g., playerCount, stageDuration, introDuration). |
| required | Whether this parameter is mandatory in the game configuration. |
| description | Human-readable explanation of what the parameter controls. |
| type | Data type of the parameter (e.g., Integer, Number, String). |
| min | Minimum allowed value for the parameter (if numeric; otherwise not applicable). |
| max | Maximum allowed value for the parameter (if numeric; otherwise not applicable). |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 2/factors.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the factor value record. |
| name | Human-readable label for the factor value (e.g., True/False). |
| value | Stored value for the factor (e.g., boolean True/False). |
| factorTypeId | Identifier of the factor type this value belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |

## Wave 1 data/Epoch 2/game-lobbies.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game lobby record. |
| index | Zero-based sequence index of the lobby within the batch. |
| availableCount | Number of open player slots remaining in the lobby. |
| timeoutStartedAt | Timestamp (ISO 8601, UTC) when the lobby timeout countdown started. |
| timedOutAt | Timestamp (ISO 8601, UTC) when the lobby timed out; null/absent if it did not time out. |
| queuedPlayerIds | Identifiers of players queued for this lobby but not yet admitted. |
| playerIds | Identifiers of players currently admitted/assigned to this lobby. |
| gameId | Identifier of the game instance created for this lobby (if created). |
| treatmentId | Identifier of the treatment/experimental condition applied to this lobby. |
| batchId | Identifier of the batch/run that created this lobby. |
| lobbyConfigId | Identifier of the lobby configuration used. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |

## Wave 1 data/Epoch 2/games.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the game record. |
| finishedAt | Timestamp (ISO 8601, UTC) when the game finished; null/absent if not finished. |
| gameLobbyId | Identifier of the lobby from which this game was created. |
| treatmentId | Identifier of the treatment/experimental condition applied to the game. |
| roundIds | Identifiers of the rounds included in the game. |
| playerIds | Identifiers of players participating in the game. |
| batchId | Identifier of the batch/run that spawned the game. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.round_count | Number of rounds in the game. |
| data.totalDuration | Total planned duration of the game in seconds. |
| data.justStarted | Whether the game has just started (boolean). |
| data.unscored | Names/identifiers of tasks in the game that are unscored or pending scoring. |
| data.scored | Names/identifiers of tasks in the game that have been scored. |

## Wave 1 data/Epoch 2/lobby-configs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the lobby configuration record. |
| name | Human-readable name of the lobby configuration. |
| timeoutType | Context in which the timeout applies (e.g., lobby). |
| timeoutInSeconds | Time limit (in seconds) before the lobby times out. |
| timeoutStrategy | Action to take when a timeout occurs (e.g., fail, proceed). |
| timeoutBots | Configuration for using bots when timing out (e.g., whether/which bots fill slots). |
| extendCount | Number of allowed timeout extensions before enforcing the strategy. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival timestamp (ISO 8601, UTC); null/absent if not archived. |

## Wave 1 data/Epoch 2/player-inputs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the survey/feedback record. |
| playerId | Identifier of the player associated with this response. |
| gameId | Identifier of the game instance associated with this response. |
| createdAt | Timestamp (ISO 8601, UTC) when the response was recorded. |
| data.age | Self-reported age in years. |
| data.gender | Self-reported gender. |
| data.strengthInGame | Free-text description of the participant’s strengths or experience in the game. |
| data.payFair | Response indicating whether the compensation felt fair. |
| data.feedbackOpenEnded | Free-text open-ended feedback about the experience. |
| data.feedbackMultipleChoice | Response to a multiple-choice feedback question. |
| data.education | Self-reported highest level of education attained. |

## Wave 1 data/Epoch 2/player-logs.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the event log record. |
| playerId | Identifier of the player who generated the event. |
| gameId | Identifier of the game instance in which the event occurred. |
| roundId | Identifier of the round associated with the event. |
| stageId | Identifier of the stage associated with the event. |
| name | Event name/type (e.g., action). |
| jsonData | Structured JSON payload describing the event (e.g., verb, object such as goat/wolf, and at timestamp in milliseconds). |
| createdAt | Server-side timestamp (ISO 8601, UTC) when the event was recorded. |

## Wave 1 data/Epoch 2/player-rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the participation record (player-round mapping). |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the player. |
| roundId | Identifier of the round associated with the record. |
| gameId | Identifier of the game instance. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.team | Team assignment/index for the player within the game/round. |

## Wave 1 data/Epoch 2/player-stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the submission/response record. |
| batchId | Identifier of the batch/run associated with this record. |
| playerId | Identifier of the player submitting the response. |
| stageId | Identifier of the stage associated with the response. |
| roundId | Identifier of the round associated with the response. |
| gameId | Identifier of the game instance associated with the response. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| submittedAt | Timestamp (ISO 8601, UTC) when the response was submitted. |
| data.scoreFeedback | Textual feedback about the player’s score/performance. |
| data.score | Final/aggregate score for the stage (may be numeric or a status label). |
| data.maxPossiblePay | Maximum possible earnings for the stage (USD). |
| data.payEarned | Actual earnings for the stage (USD). |
| data.correct | Whether the submitted answer/solution was correct. |
| data.directionsCompleted | Whether the participant completed the directions/instructions step. |
| data.showOverview | Whether to show the overview screen for this stage. |
| data.showInstructions | Whether to show the instructions screen for this stage. |
| data.showPerformance | Whether to show the performance/feedback screen for this stage. |
| data.showAlertPractice | Whether to show the practice alert screen for this stage. |
| data.showQuiz | Whether to show a quiz/checkpoint screen for this stage. |
| data.clicked | Click interaction record(s) captured during the stage (task-specific). |
| data.scoreArr | Array of intermediate score values recorded during the stage. |
| data.coords | Coordinates/positions selected or interacted with (task-specific). |
| data.dotsClaimed | Identifiers of dots/targets claimed (task-specific). |
| data.approved | Whether the submission was approved for payout/credit. |
| data.currBoardData | Serialized current board/state of the task (task-specific). |
| data.option | Selected option/choice for the stage (task-specific). |

## Wave 1 data/Epoch 2/players.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the player record. |
| id | External worker/participant identifier (may include retirement annotations). |
| urlParams | URL query parameters captured at join time (e.g., workerId). |
| bot | Flag/metadata indicating a bot participant (if applicable). |
| readyAt | Timestamp (ISO 8601, UTC) when the player became ready in the lobby. |
| timeoutStartedAt | Timestamp (ISO 8601, UTC) when the player’s timeout countdown began. |
| timeoutWaitCount | Number of lobby timeout wait cycles experienced by the player. |
| exitStepsDone | Exit flow steps completed (labels or flags). |
| exitAt | Timestamp (ISO 8601, UTC) when the player exited the session. |
| exitStatus | Standardized exit status (e.g., finished, gameCancelled). |
| exitReason | Reason explaining the exit status (if provided). |
| retiredAt | Timestamp (ISO 8601, UTC) when the player was retired. |
| retiredReason | Reason the player was retired (e.g., gameCancelled). |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| lastLogin | Last-login metadata; includes an 'at' timestamp (ISO 8601, UTC). |
| data.index | Player’s index/position within the session or lobby. |
| data.avatar | Selected avatar metadata (e.g., name, SVG, color). |
| data.score | Player’s aggregate score for the session/game. |
| data.adjustedScore | Score after adjustments (e.g., penalties/normalization). |
| data.playerIds | IDs of players associated with this player’s group/network. |
| data.totalPayment | Total payment earned by the player (USD). |
| data.unscoredTasksMaxPayment | Maximum potential payment from unscored tasks (USD). |
| data.approved | Whether the player’s overall session was approved for payout. |
| data.lastTick | Last client heartbeat/tick timestamp (milliseconds since epoch). |
| data.submitted | Whether the player submitted final responses/exit flow. |
| data.playerClickingCellID | Identifier of the cell currently being clicked (task-specific). |
| data.option | Selected option/choice (task-specific). |
| data.neighbors | List of neighboring player indices/IDs in a networked task. |
| data.chatGroups | Chat group assignment label for the player. |
| data.leftGameIdle | Whether the player left the game due to inactivity. |
| data.leftGameOffline | Whether the player disconnected due to being offline. |
| data.currentlyIdle | Whether the player is currently idle/inactive. |

## Wave 1 data/Epoch 2/rounds.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the round record. |
| index | Zero-based position of the round within the game. |
| stageIds | Identifiers of the stages that comprise this round. |
| gameId | Identifier of the game this round belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.type | Task type key for the round (e.g., WritingStory, GuessTheCorrelation, DivergentAssociationTask). |
| data.name | Human-readable task name for the round. |
| data.anonName | Anonymized/display label for the round (e.g., Game 1). |
| data.current_round | Current round index within the game (zero-based). |
| data.bonusRate | Multiplier used to convert score to bonus payment for this round. |
| data.similarityList | Task-specific similarity list or related data (e.g., for Divergent Association Task). |
| data.assigned | Assignment flag/metadata indicating the round instance has been assigned (task-specific). |
| data.A | Task-specific field A associated with this round. |

## Wave 1 data/Epoch 2/stages.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the stage record. |
| index | Zero-based order of the stage within the round. |
| name | Internal stage name/slug. |
| displayName | Human-readable stage title. |
| startTimeAt | Stage start timestamp (ISO 8601, UTC). |
| durationInSeconds | Planned duration of the stage in seconds. |
| roundId | Identifier of the round this stage belongs to. |
| gameId | Identifier of the game this stage belongs to. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| data.type | Task type key for the stage (e.g., WritingStory). |
| data.component_path | Path to the frontend component implementing the stage UI. |
| data.stage_type | Stage category/type (e.g., intro, game). |
| data.stage_config | Stage configuration mode or payload. |
| data.constants | Writing Story Task: configuration for the instance (prompt/question, instance number, scoring flag, number of Etherpads). |
| data.stage_count | Number of stages in the task/game sequence. |
| data.anonName | Anonymized/display label for the stage. |
| data.etherpadData | Writing Story Task: collaborative editor (Etherpad) content and metadata. |
| data.sandboxWordList | Task-specific interim/sandbox word list. |
| data.finalWordList | Task-specific finalized word list. |
| data.scoreIncrement | Incremental score awarded within the stage. |
| data.maxPossibleScore | Maximum attainable score for this stage instance. |
| data.startTimeAt | Client-recorded stage start timestamp (milliseconds since epoch). |
| data.defaultStageLength | Default stage length (milliseconds). |
| data.defaultEndTimeAt | Default end timestamp (milliseconds since epoch). |
| data.endTimeAt | Client-recorded stage end timestamp (milliseconds since epoch). |
| data.stageLength | Actual stage duration (milliseconds). |
| data.guessed | Whether the participant provided a guess/answer (or the guessed value). |
| data.value | Generic input value associated with the stage (task-specific). |
| data.scoreArr | Array of intermediate score values recorded during the stage. |
| data.score | Aggregate/final score for the stage. |
| data.wgc-config | Wolf, Goat, Cabbage Transfer: configuration options/state for the river-crossing puzzle. |
| data.dots | Serialized UI dots/markers data (task-specific). |
| data.maxScore | Maximum score used by the stage’s scoring logic (task-specific). |
| data.wordsList | Task-specific words list. |
| data.allocations | Structured allocations/assignment decisions captured during the stage. |
| data.currBoardData | Current board/grid state for the task (task-specific structure). |
| data.editableCellID | Identifier of the currently editable cell (if applicable). |
| data.clickingCellID | Identifier of the cell currently being clicked/selected. |
| data.duplicateCellID | Identifier of a cell flagged as duplicate/invalid. |
| data.isDisagree | Flag indicating a disagreement selection (task-specific). |
| data.student-A-room | Room Assignment Task: selected/assigned room for student A. |
| data.student-B-room | Room Assignment Task: selected/assigned room for student B. |
| data.student-C-room | Room Assignment Task: selected/assigned room for student C. |
| data.student-D-room | Room Assignment Task: selected/assigned room for student D. |
| data.constraint-1-A-C-violated | Room Assignment Task: whether the constraint of type 1 between students A and C was violated. |
| data.student-E-room | Room Assignment Task: selected/assigned room for student E. |
| data.student-F-room | Room Assignment Task: selected/assigned room for student F. |
| data.student-G-room | Room Assignment Task: selected/assigned room for student G. |
| data.student-H-room | Room Assignment Task: selected/assigned room for student H. |
| data.student-I-room | Room Assignment Task: selected/assigned room for student I. |
| data.student-J-room | Room Assignment Task: selected/assigned room for student J. |
| data.student-K-room | Room Assignment Task: selected/assigned room for student K. |
| data.student-L-room | Room Assignment Task: selected/assigned room for student L. |
| data.student-M-room | Room Assignment Task: selected/assigned room for student M. |
| data.student-N-room | Room Assignment Task: selected/assigned room for student N. |
| data.student-O-room | Room Assignment Task: selected/assigned room for student O. |
| data.student-P-room | Room Assignment Task: selected/assigned room for student P. |
| data.student-Q-room | Room Assignment Task: selected/assigned room for student Q. |
| data.student-R-room | Room Assignment Task: selected/assigned room for student R. |
| data.constraint-2-A-B-violated | Room Assignment Task: whether the constraint of type 2 between students A and B was violated. |
| data.constraint-3-A-J-violated | Room Assignment Task: whether the constraint of type 3 between students A and J was violated. |
| data.constraint-2-B-F-violated | Room Assignment Task: whether the constraint of type 2 between students B and F was violated. |
| data.constraint-0-B-H-violated | Room Assignment Task: whether the constraint of type 0 between students B and H was violated. |
| data.constraint-3-B-P-violated | Room Assignment Task: whether the constraint of type 3 between students B and P was violated. |
| data.constraint-2-C-E-violated | Room Assignment Task: whether the constraint of type 2 between students C and E was violated. |
| data.constraint-1-C-J-violated | Room Assignment Task: whether the constraint of type 1 between students C and J was violated. |
| data.constraint-3-D-F-violated | Room Assignment Task: whether the constraint of type 3 between students D and F was violated. |
| data.constraint-3-E-Q-violated | Room Assignment Task: whether the constraint of type 3 between students E and Q was violated. |
| data.constraint-1-F-I-violated | Room Assignment Task: whether the constraint of type 1 between students F and I was violated. |
| data.constraint-2-G-J-violated | Room Assignment Task: whether the constraint of type 2 between students G and J was violated. |
| data.constraint-3-I-N-violated | Room Assignment Task: whether the constraint of type 3 between students I and N was violated. |
| data.constraint-3-J-K-violated | Room Assignment Task: whether the constraint of type 3 between students J and K was violated. |
| data.constraint-2-K-R-violated | Room Assignment Task: whether the constraint of type 2 between students K and R was violated. |
| data.constraint-3-L-Q-violated | Room Assignment Task: whether the constraint of type 3 between students L and Q was violated. |
| data.constraint-0-M-O-violated | Room Assignment Task: whether the constraint of type 0 between students M and O was violated. |
| data.constraint-0-N-R-violated | Room Assignment Task: whether the constraint of type 0 between students N and R was violated. |
| data.constraint-2-O-P-violated | Room Assignment Task: whether the constraint of type 2 between students O and P was violated. |
| data.constraint-0-C-F-violated | Room Assignment Task: whether the constraint of type 0 between students C and F was violated. |
| data.constraint-3-D-E-violated | Room Assignment Task: whether the constraint of type 3 between students D and E was violated. |
| data.constraint-1-C-D-violated | Room Assignment Task: whether the constraint of type 1 between students C and D was violated. |
| data.constraint-2-D-E-violated | Room Assignment Task: whether the constraint of type 2 between students D and E was violated. |
| data.constraint-3-E-H-violated | Room Assignment Task: whether the constraint of type 3 between students E and H was violated. |
| data.constraint-1-F-H-violated | Room Assignment Task: whether the constraint of type 1 between students F and H was violated. |
| data.case | Selected case/scenario identifier (task-specific). |
| data.submitted | Whether the participant submitted their response for the stage. |
| data.goat-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the goat piece. |
| data.boat | Wolf, Goat, Cabbage Transfer: boat position/state. |
| data.wolf-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the wolf piece. |
| data.cabbage-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the cabbage piece. |
| data.cabbage | Wolf, Goat, Cabbage Transfer: cabbage piece position/state. |
| data.caterpillar-dragger | Wolf, Goat, Cabbage Transfer: UI drag-handle state/position for the caterpillar piece. |
| data.goat | Wolf, Goat, Cabbage Transfer: goat piece position/state. |
| data.wolf | Wolf, Goat, Cabbage Transfer: wolf piece position/state. |
| data.caterpillar | Wolf, Goat, Cabbage Transfer: caterpillar piece position/state. |
| data.idledPlayers | List of players marked idle during this stage. |
| data.amount0 | Generic numeric amount field (task-specific). |
| data.amount1 | Generic numeric amount field (task-specific). |
| data.amount2 | Generic numeric amount field (task-specific). |
| data.isDuplicate | Flag indicating a duplicate entry/state. |
| data.isSolved | Flag indicating the task/puzzle has been solved. |
| data.student-A-dragger | Room Assignment Task: UI drag-handle state/position for student A. |
| data.student-B-dragger | Room Assignment Task: UI drag-handle state/position for student B. |
| data.student-D-dragger | Room Assignment Task: UI drag-handle state/position for student D. |
| data.student-C-dragger | Room Assignment Task: UI drag-handle state/position for student C. |
| data.student-J-dragger | Room Assignment Task: UI drag-handle state/position for student J. |
| data.student-F-dragger | Room Assignment Task: UI drag-handle state/position for student F. |
| data.student-H-dragger | Room Assignment Task: UI drag-handle state/position for student H. |
| data.student-P-dragger | Room Assignment Task: UI drag-handle state/position for student P. |
| data.student-O-dragger | Room Assignment Task: UI drag-handle state/position for student O. |
| data.student-E-dragger | Room Assignment Task: UI drag-handle state/position for student E. |
| data.student-R-dragger | Room Assignment Task: UI drag-handle state/position for student R. |
| data.student-K-dragger | Room Assignment Task: UI drag-handle state/position for student K. |
| data.student-G-dragger | Room Assignment Task: UI drag-handle state/position for student G. |
| data.student-M-dragger | Room Assignment Task: UI drag-handle state/position for student M. |
| data.student-N-dragger | Room Assignment Task: UI drag-handle state/position for student N. |
| data.student-L-dragger | Room Assignment Task: UI drag-handle state/position for student L. |
| data.option | Selected option/choice identifier. |
| data.student-Q-dragger | Room Assignment Task: UI drag-handle state/position for student Q. |
| data.student-I-dragger | Room Assignment Task: UI drag-handle state/position for student I. |
| data.log | Interaction/action log captured during the stage. |
| data.student-101 Room 102 Room 103 Room 104 Room 105 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-101 Room 102 Room 103 Room 104 Room 105 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Current Solution Quality 102 Room 101 Room 102 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Current Solution Quality 102 Room 101 Room 102 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 325 Room 101 Room 102 Room 10 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 325 Room 101 Room 102 Room 10 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 218 Room 101 Room 102 Room 10 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 218 Room 101 Room 102 Room 10 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data. Moves Taken: 2 ←→ Empty boat Constraints: - Remaining spots: 1 - No eating occurs on boat - Wolf eats Goat - Goat eats Cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. wolf goat Moves Taken: 1 ←→ Empty boat Constraints: - Remaining spots: 2 - No eating occurs on boat Incorrect! … -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. wolf Moves Taken: 4 ←→ Empty boat Constraints: … Incorrect! … -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. cabbage Moves Taken: 4 ←→ Empty boat Constraints: … Incorrect! … -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.student- Room 105 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Room 105 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 480 Room 101 … Room 108 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 480 Room 101 … Room 108 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data. wolf cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.student-Room-dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room-room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 103 Room 104 Room 105 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 103 Room 104 Room 105 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-M Q Current Solution Quality -155 Room 101 … Room 105 J -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-M Q Current Solution Quality -155 Room 101 … Room 105 J -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 637 Room 101 Room 102 Room 103 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 637 Room 101 Room 102 Room 103 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 105 Room 106 Room 107 Room 108 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 105 Room 106 Room 107 Room 108 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 105 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 105 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.wolf goat cabbage caterpillar -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data.student-Current Solution Quality 292 Room 101 Room 102 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality 292 Room 101 Room 102 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 102 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 102 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality -145 Room 101 … Room 106 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Current Solution Quality -145 Room 101 … Room 106 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Room 102 Room 103 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Room 102 Room 103 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Current Solution Quality 301 Room 101 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student- Current Solution Quality 301 Room 101 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 104 -dragger | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data.student-Room 104 -room | Room Assignment Task: UI artifact key captured from the interface; no functional data (ignore). |
| data. cabbage -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |
| data. wolf -dragger | Wolf, Goat, Cabbage Transfer: UI artifact key; no functional data (ignore). |

## Wave 1 data/Epoch 2/treatments.csv

| Variable | Description |
|---|---|
| _id | Unique identifier for the treatment definition. |
| name | Human-readable label for the treatment variant (e.g., single-s0-i0, triple-s0-i0). |
| factorIds | List of factor value IDs that compose this treatment. |
| createdAt | Record creation timestamp (ISO 8601, UTC). |
| archivedAt | Record archival/retirement timestamp (ISO 8601, UTC); null/absent if active. |