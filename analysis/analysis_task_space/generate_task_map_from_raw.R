## ----setup, include=FALSE-----------------------------------------------------
knitr::opts_chunk$set(echo = TRUE)
library(dplyr)
library(tidyverse)

# Ensure plots default to PNG to avoid generating Rplots.pdf when running non-interactively
options(device = function(...) grDevices::png(filename = tempfile(fileext = ".png")))


## -----------------------------------------------------------------------------
df.mapping.raw <- read_csv('../../data/raw_map.csv')


## -----------------------------------------------------------------------------
# Question names
main_questions <- c(
  "Q1concept_behav",
  "Q2intel_manip_1",
  "Q3type_1_planning",
  "Q4type_2_generate",
  "Q5creativity_input_1",
  "Q6type_5_cc",
  "Q7type_7_battle",
  "Q8type_8_performance",
  "Q9divisible_unitary",
  "Q10maximizing",
  "Q11optimizing",
  "Q13outcome_multip",
  "Q14sol_scheme_mul",
  "Q15dec_verifiability",
  "Q16shared_knowledge",
  "Q17within_sys_sol",
  "Q18ans_recog",
  "Q19time_solvability",
  "Q20type_3_type_4",
  "Q21intellective_judg_1",
  "Q22confl_tradeoffs",
  "Q23ss_out_uncert",
  "Q24eureka_question"
)

continuous_questions <- c('Q2intel_manip_1',
                          'Q21intellective_judg_1','Q5creativity_input_1') 

pretty_name_lookup <- c(
  "Q1concept_behav" = "Conceptual-Behavioral",
  "Q3type_1_planning" = "Type 1 (Planning)",
  "Q4type_2_generate" = "Type 2 (Generate)",
  "Q6type_5_cc" = "Type 5 (Cognitive Conflict)",
  "Q7type_7_battle" = "Type 7 (Battle)",
  "Q8type_8_performance" = "Type 8 (Performance)",
  "Q9divisible_unitary" = "Divisible-Unitary",
  "Q10maximizing" = "Maximizing",
  "Q11optimizing" = "Optimizing",
  "Q13outcome_multip" = "Outcome Multiplicity",
  "Q14sol_scheme_mul" = "Solution Scheme Multiplicity",
  "Q15dec_verifiability" = "Decision Verifiability",
  "Q16shared_knowledge" = "Shared Knowledge",
  "Q17within_sys_sol" = "Within-System Solution",
  "Q18ans_recog" = "Answer Recognizability",
  "Q19time_solvability" = "Time Solvability",
  "Q20type_3_type_4" = "Type 3 and Type 4 (Objective Correctness)",
  "Q22confl_tradeoffs" = "Conflicting Tradeoffs",
  "Q23ss_out_uncert" = "Solution Scheme Outcome Uncertainty",
  "Q24eureka_question" = "Eureka Question",
  "Q2intel_manip_1" = "Intellectual-Manipulative",
  "Q21intellective_judg_1" = "Intellective-Judgmental",
  "Q5creativity_input_1" = "Creativity Input",
  "Q25_type6_mixed_motive" = "Type 6 (Mixed-Motive)"
)

pretty_name_order <- c(
  "Conceptual-Behavioral",
  "Type 1 (Planning)",
  "Type 2 (Generate)",
  "Type 5 (Cognitive Conflict)",
  "Type 7 (Battle)",
  "Type 8 (Performance)",
  "Divisible-Unitary",
  "Maximizing",
  "Optimizing",
  "Outcome Multiplicity",
  "Solution Scheme Multiplicity",
  "Decision Verifiability",
  "Shared Knowledge",
  "Within-System Solution",
  "Answer Recognizability",
  "Time Solvability",
  "Type 3 and Type 4 (Objective Correctness)",
  "Conflicting Tradeoffs",
  "Solution Scheme Outcome Uncertainty",
  "Eureka Question",
  "Intellectual-Manipulative",
  "Intellective-Judgmental",
  "Creativity Input",
  "Type 6 (Mixed-Motive)"
)


## -----------------------------------------------------------------------------
# Before mapping the tasks, filter to ONLY the most recent blob
# blobs indicate the version of the writeup, so raters who rated different 'blobs'
# rated different versions.

tasks_blobs_and_ids <- df.mapping.raw %>%
  select(task, task_blob_url, updatedAt) %>%
  arrange(desc(updatedAt))
  
most_recent_blob_urls <- tasks_blobs_and_ids %>% distinct(task, .keep_all = T)
  
df.mapping.raw <- df.mapping.raw %>%
  filter(task_blob_url %in% most_recent_blob_urls$task_blob_url)


## -----------------------------------------------------------------------------
categorical <- df.mapping.raw %>%
  select(c(main_questions, task, task_blob_url)) %>%
  select(-continuous_questions) %>%
  pivot_longer(cols = -c(task, task_blob_url), names_to = "question_name") %>%
  mutate(value = recode(value, 
                     "Mental" = 0,
                     "Physical" = 1,
                    # "Not applicable or not answerable based on the task description (Please Elaborate Below.)" = 3,
                     "No" = 0,
                     "Yes" = 1
                   )) %>%
  group_by(question_name, task, task_blob_url) %>%
  mutate(
    value = mean(value, na.rm = T)
  ) %>% unique() %>%
  pivot_wider(values_from = "value", names_from = "question_name")

numeric <- df.mapping.raw %>%
  select(c(continuous_questions, task, task_blob_url)) %>%
  pivot_longer(cols = -c(task, task_blob_url), names_to = "question_name") %>%
   group_by(question_name, task, task_blob_url) %>%
  mutate(
    value = mean(as.numeric(value), na.rm = T)
  ) %>% unique() %>%
  pivot_wider(values_from = c("value"), names_from = "question_name")
  
task_map <- inner_join(categorical, numeric, by = c("task", "task_blob_url")) %>% ungroup() %>%
  select(-task_blob_url) # remove task blob for main task map export


## -----------------------------------------------------------------------------
#mixed-motive tasks
mixed_motive_tasks = c(
        "Arithmetic problem 2",
        "Pharmaceutical Company (hidden-profile)",
        "New Recruit",
        "Iterated Snowdrift Game (Without Punishment)",
        "Iterated Snowdrift Game (With Punishment)",
        "Blocks World for Teams",
        "The beer game",
        "Mock jury",
        "Investment Game (aka Trust Game)",
        "TOPSIM - general mgmt business game",
        "Oligopoly game",
        "Minimal Group Paradigm (study diversity)",
        "Organization Game",
        "Biopharm Seltek",
        "Bullard Houses",
        "Apache helicopter flight simulator (Longbow2)",
        "Sender-Receiver game",
        "Volunteer Investment Game",
        "Ultimatum game (various versions)",
        "Prisoner's Dilemma (various versions)",
        "Public goods game",
        "Best job candidate (hidden-profile)",
        "Aerospace Investment (Role-playing)",
        "Find the common symbol",
        "Battle of the sexes",
        "Investment game (hidden-profile)",
        "Dictator game and its variants",
        "Intergroup Prisoner's Dilemma",
        "Chicken",
        "Minimum-effort tacit coordination game"
)

task_map <- task_map %>%
  mutate(
    Q25_type6_mixed_motive = ifelse(task %in% mixed_motive_tasks, 1,0)    
  )

task_map <- task_map %>%
  rename(!!!setNames(names(pretty_name_lookup), pretty_name_lookup)) %>%
  select(task, all_of(pretty_name_order))


## -----------------------------------------------------------------------------
# write the processed Task Map!
task_map %>% write_csv('../../outputs/processed_data/task_map.csv')

