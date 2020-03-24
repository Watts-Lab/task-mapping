library(dplyr)
library(ggplot2)
library(tidyr)
library(readr)
library(pwr)
library(readr)
library(irr)

setwd("/Users/mark/Documents/Academia/Penn/Labs Experiment/task-mapping/Data/")
df <- read.csv("Encoding+Shaw+1963+Tasks_March+6%2C+2020_10.14.csv")

responses_cleaned <- df %>% 
  filter(Finished == "True") %>%
  mutate(
    user_id = ResponseId,
    duration = as.numeric(as.character(Duration..in.seconds.))
    ) %>%
  select(user_id,duration,contains("_Q")) %>% 
  gather(question,answer,-user_id,-duration) %>%
  separate(question,c("task_id","question_id","q_row","q_col"),sep = "\\_") %>%
  unite(question_id,question_id,q_row,q_col,sep = "_",na.rm = TRUE) %>%
  filter(answer != "") %>% 
  spread(question_id,answer) %>% 
  mutate(
    task_reference = paste("Shaw, 1963. p.",Q2,sep = " "),
    task_id = as.numeric(sub("X","",task_id)) - 1,
    source = Q10,
    materials = Q3,
    instructions = Q5,
    solution = Q7,
    criteria = Q9,
    images_required = Q4 == "Yes" | Q6 == "Yes" | Q8 == "Yes",
    cooperation_requirements = as.numeric(Q11_1_1),
    decision_verifiability = as.numeric(Q11_2_1),
    difficulty = as.numeric(Q11_3_1),
    goal_clarity = as.numeric(Q11_4_1),
    goal_path_multiplicity = as.numeric(Q11_5_1),
    intellectual_manipulative_requirements = as.numeric(Q11_6_1),
    intrinsic_interest = as.numeric(Q11_7_1),
    operational_requirements = as.numeric(Q11_8_1),
    population_familiarity = as.numeric(Q11_9_1),
    solution_multiplicity = as.numeric(Q11_10_1),
    cooperation_requirements_q = as.numeric(Q11_1_2),
    decision_verifiability_q = as.numeric(Q11_2_2),
    difficulty_q = as.numeric(Q11_3_2),
    goal_clarity_q = as.numeric(Q11_4_2),
    goal_path_multiplicity_q = as.numeric(Q11_5_2),
    intellectual_manipulative_requirements_q = as.numeric(Q11_6_2),
    intrinsic_interest_q = as.numeric(Q11_7_2),
    operational_requirements_q = as.numeric(Q11_8_2),
    population_familiarity_q = as.numeric(Q11_9_2),
    solution_multiplicity_q = as.numeric(Q11_10_2),
    quality_check = task_id == Q12
    ) %>% 
  select(-matches("Q[1-9]")) %>%
  # Cleaning steps
  filter(quality_check) %>% 
  select(-quality_check) %>% 
  mutate(
    materials = sub("Materials[[:punct:]] ","",materials),
    task_id = case_when(
      user_id == "R_pmzc1vhIwyY3MpX" & task_id == 51 ~ 50,
      TRUE ~ task_id
    )
  )

# Export for manual filtering
# write_csv(responses_cleaned,"export.csv")

import_df <- read.csv("cleaned-import.csv")

responses_summarized <- import_df %>% 
  group_by(task_id,task_reference) %>% 
  summarise(
    source = source[0],
    implemented = 0,
    materials = paste((as.character(materials)), collapse = ''),
    materials_images = "",
    instructions = paste((as.character(instructions)), collapse = ''),
    instruction_images = "",
    solution = paste((as.character(solution)), collapse = ''),
    solution_images = "",
    criteria = paste((as.character(criteria)), collapse = ''),
    images_required = any(images_required) | is.na(any(images_required)),
    cooperation_requirements = median(cooperation_requirements),
    decision_verifiability = median(decision_verifiability),
    difficulty = median(difficulty),
    goal_clarity = median(goal_clarity),
    goal_path_multiplicity = median(goal_path_multiplicity),
    intellectual_manipulative_requirements = median(intellectual_manipulative_requirements),
    intrinsic_interest = median(intrinsic_interest),
    operational_requirements = median(operational_requirements),
    population_familiarity = median(population_familiarity),
    solution_multiplicity = median(solution_multiplicity),
    cooperation_requirements_q = median(cooperation_requirements_q),
    decision_verifiability_q = median(decision_verifiability_q),
    difficulty_q = median(difficulty_q),
    goal_clarity_q = median(goal_clarity_q),
    goal_path_multiplicity_q = median(goal_path_multiplicity_q),
    intellectual_manipulative_requirements_q = median(intellectual_manipulative_requirements_q),
    intrinsic_interest_q = median(intrinsic_interest_q),
    operational_requirements_q = median(operational_requirements_q),
    population_familiarity_q = median(population_familiarity_q),
    solution_multiplicity_q = median(solution_multiplicity_q),
    )

write_csv(responses_summarized,"data_for_use.csv")
