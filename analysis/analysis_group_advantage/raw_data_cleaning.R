## ----echo=FALSE, message=FALSE------------------------------------------------
library(jsonlite)
library(pls)

library(randomForest)
library(tsne)
library(umap)
library(caret)
library(doParallel)
library(foreach)
library(xgboost)
library(nnet)

library(ggplot2)
library(ggfortify)
library(ggpubr)
library(ggrepel)
library(ggbuildr)
library(ggridges)
library(extrafont)

library(stargazer)

library(tidyverse)
library(tidyr)
library(broom)
library(grid)

seed = 0
epsilon = 0.000001
z = 1.96 # For 95%CI
outcome_term = "Group Advantage"

# load fonts
font_import(paths = NULL, prompt = FALSE)
loadfonts(device = "all")

# --- Resolve project-root anchored paths and ensure output dirs exist ---
script_path <- tryCatch({
  args <- commandArgs(trailingOnly = FALSE)
  file_arg <- grep("^--file=", args, value = TRUE)
  if (length(file_arg)) normalizePath(sub("^--file=", "", file_arg[1])) else NULL
}, error = function(e) NULL)

if (is.null(script_path)) {
  PROJECT_ROOT <- normalizePath(file.path(getwd()))
  if (basename(PROJECT_ROOT) %in% c("analysis_group_advantage", "analysis")) {
    PROJECT_ROOT <- normalizePath(file.path(PROJECT_ROOT, "..", ".."))
  }
} else {
  PROJECT_ROOT <- normalizePath(file.path(dirname(script_path), "..", ".."))
}

OUTPUTS_DIR <- file.path(PROJECT_ROOT, "outputs")
PROCESSED_DIR <- file.path(OUTPUTS_DIR, "processed_data")
FIGURES_DIR <- file.path(OUTPUTS_DIR, "figures")
DATA_DIR <- file.path(PROJECT_ROOT, "data")

dir.create(PROCESSED_DIR, recursive = TRUE, showWarnings = FALSE)
dir.create(FIGURES_DIR, recursive = TRUE, showWarnings = FALSE)

## -----------------------------------------------------------------------------
load_CSVs <- function(pattern, rename = TRUE) {
  files <- data.frame(path = list.files(
    DATA_DIR,
    paste0(pattern, ".csv"),
    recursive = TRUE,
    full.names = TRUE
  )) |>
    filter(grepl(paste0("Wave [0-9] data.*/", pattern, ".csv"), path))

  data <- files |>
    mutate(data = purrr::map(path, \(f) read_csv(f, show_col_types = FALSE) |>
                               mutate(across(matches("(data.score|duplicateCellID)"), as.character))),
           .keep = "none") |>
    unnest(data) |>
    distinct()

  if (rename) {
    entity <- sub("s$", "", pattern)
    entity <- gsub("-", " ", entity)
    entity <- tools::toTitleCase(entity)
    entity <- gsub(" ", "", entity)
    entity <- paste0(tolower(substr(entity, 1, 1)), substr(entity, 2, nchar(entity)))
    primary <- paste0(entity, "Id")

    # rename primary key: _id -> <entity>Id
    if ("_id" %in% names(data)) {
      nm <- names(data)
      nm[nm == "_id"] <- primary
      names(data) <- nm
    }

    # rename snake_case foreign keys: *_id -> *Id
    snake_fk <- setdiff(grep("_id$", names(data), value = TRUE), "_id")
    if (length(snake_fk)) {
      nm <- names(data)
      idx <- match(snake_fk, nm)
      nm[idx] <- sub("_id$", "Id", snake_fk)
      names(data) <- nm
    }
}
  data
}

## ----message=FALSE------------------------------------------------------------
games <- load_CSVs("games")
game_lobbies <- load_CSVs("game-lobbies")
treatments <- load_CSVs("treatments")
factors <- load_CSVs("factors")
factor_types <- load_CSVs("factor-types")
lobby_configs <- load_CSVs("lobby-configs")
batches <- load_CSVs("batches")
rounds <- load_CSVs("rounds")
stages <- load_CSVs("stages")
players <- load_CSVs("players")
player_logs <- load_CSVs("player-logs")
player_rounds <- load_CSVs("player-rounds")
player_stages <- load_CSVs("player-stages")
player_inputs <- load_CSVs("player-inputs")
offline_scoring <- load_CSVs("offline scoring", FALSE)

## -----------------------------------------------------------------------------
player_rounds %>% write_csv(file.path(PROCESSED_DIR, "player_rounds.csv"))
rounds %>% write_csv(file.path(PROCESSED_DIR, "rounds.csv"))
stages %>% write_csv(file.path(PROCESSED_DIR, "stages.csv"))
players %>% write_csv(file.path(PROCESSED_DIR, "players.csv"))

## -----------------------------------------------------------------------------
tasks_in_waves <- list(
  list(
    wave = 1,
    tasks = c(
      "Moral Reasoning",
      "Allocating Resources",
      "Writing Story",
      "Divergent Association",
      "Room Assignment",
      "Wolf Goat Cabbage",
      "Guess the Correlation",
      "Sudoku",
      "Whac a Mole",
      "Word Construction"
    )
  ),
  list(
    wave = 2,
    tasks = c(
      "Logic Problem",
      "Unscramble Words",
      "Recall Word Lists",
      "Random Dot Motion",
      "Typing"
    )
  ),
  list(
    wave = 3,
    tasks = c(
      "Putting Food Into Categories",
      "Recall Association",
      "Advertisement Writing",
      "Wildcat Wells",
      "WildCam"
    )
  )
)

task_map <-
  read_csv(file.path(DATA_DIR, "task_map.csv"), show_col_types = FALSE) |>
  mutate(
    task = case_when(
      task == "Allocating resources to programs" ~ "Allocating Resources",
      task == "Guessing the correlation" ~ "Guess the Correlation",
      task == "Moral Reasoning (Disciplinary Action Case)" ~ "Moral Reasoning",
      task == "Whac-A-Mole" ~ "Whac a Mole",
      task == "Divergent Association Task" ~ "Divergent Association",
      task == "Room assignment task" ~ "Room Assignment",
      task == "Wolf, goat and cabbage transfer" ~ "Wolf Goat Cabbage",
      task == "Word construction from a subset of letters" ~ "Word Construction",
      task == "Writing story" ~ "Writing Story",
      task == "Unscramble words (anagrams)" ~ "Unscramble Words",
      task == "Wildcam Gorongosa (Zooniverse)" ~ "WildCam",
      task == "Putting food into categories" ~ "Putting Food Into Categories",
      task == "Recall association" ~ "Recall Association",
      task %in% c(
        "hk_22482ca42486c72f writing",
        "hk_22482ca42486c72f Writing",
        "hk_bdaf755327fff794 writing",
        "hk_bdaf755327fff794 Writing"
      ) ~ "Advertisement Writing",
      task == "Random dot motion" ~ "Random Dot Motion",
      task == "Typing game" ~ "Typing",
      task == "Recall word lists" ~ "Recall Word Lists",
      TRUE ~ task
    ),
    wave = case_when(
      task %in% tasks_in_waves[[1]]$tasks ~ 1,
      task %in% tasks_in_waves[[2]]$tasks ~ 2,
      task %in% tasks_in_waves[[3]]$tasks ~ 3,
      TRUE ~ NA
    )
  ) |>
  filter(task != "NA")

mcgrath_map_path <- file.path(PROCESSED_DIR, "task_map_with_mcgrath_categories_appended.csv")
if (file.exists(mcgrath_map_path)) {
  mcgrath_mapping_wide <- read_csv(mcgrath_map_path, show_col_types = FALSE)
  # Backward-compat: the Python generator may use 'task_name' as the id column.
  if (!("task" %in% names(mcgrath_mapping_wide)) && ("task_name" %in% names(mcgrath_mapping_wide))) {
    mcgrath_mapping_wide <- mcgrath_mapping_wide |> rename(task = task_name)
  }
  # Canonicalize task names to match the same mapping used for task_map and raw_score_data
  mcgrath_mapping_wide <- mcgrath_mapping_wide |>
    mutate(
      task = case_when(
        task == "Allocating resources to programs" ~ "Allocating Resources",
        task == "Guessing the correlation" ~ "Guess the Correlation",
        task == "Moral Reasoning (Disciplinary Action Case)" ~ "Moral Reasoning",
        task == "Whac-A-Mole" ~ "Whac a Mole",
        task == "Divergent Association Task" ~ "Divergent Association",
        task == "Room assignment task" ~ "Room Assignment",
        task == "Wolf, goat and cabbage transfer" ~ "Wolf Goat Cabbage",
        task == "Word construction from a subset of letters" ~ "Word Construction",
        task == "Writing story" ~ "Writing Story",
        task == "Unscramble words (anagrams)" ~ "Unscramble Words",
        task == "Wildcam Gorongosa (Zooniverse)" ~ "WildCam",
        task == "Putting food into categories" ~ "Putting Food Into Categories",
        task == "Recall association" ~ "Recall Association",
        task %in% c(
          "hk_22482ca42486c72f writing",
          "hk_22482ca42486c72f Writing",
          "hk_bdaf755327fff794 writing",
          "hk_bdaf755327fff794 Writing"
        ) ~ "Advertisement Writing",
        task == "Random dot motion" ~ "Random Dot Motion",
        task == "Typing game" ~ "Typing",
        task == "Recall word lists" ~ "Recall Word Lists",
        TRUE ~ task
      )
    )
  # Normalize a join key to ensure category rows always match canonical task names
  normalize_key <- function(x) gsub("[^a-z0-9]", "", tolower(trimws(x)))
  mcgrath_mapping_wide <- mcgrath_mapping_wide |>
    mutate(task_key = normalize_key(task))
  # Keep only the one-hot category columns for merging
  mcgrath_category_cols <- grep("_cat$", names(mcgrath_mapping_wide), value = TRUE)
  mcgrath_mapping_wide <- mcgrath_mapping_wide |> select(task_key, all_of(mcgrath_category_cols))
} else {
  mcgrath_mapping_wide <- tibble(task_key = character())
  mcgrath_category_cols <- character()
}

## -----------------------------------------------------------------------------
conditions <- factors |>
  select(factorId, value, factorTypeId) |>
  inner_join(
    factor_types |>
      select(factorTypeId, name) |>
      filter(name %in% c("unitsSeed", "unitsIndex", "playerCount")),
    by = "factorTypeId"
  ) |>
  inner_join(
    treatments |>
      mutate(factorId = str_split(factorIds, ",")) |>
      unnest(cols = c(factorId)) |>
      select(treatmentId, factorId),
    by = "factorId"
  ) |>
  select(-matches("factor")) |>
  distinct() |>
  pivot_wider() |>
  na.omit()

player_conditions <- players |>
  left_join(player_rounds |> select(playerId, gameId) |> distinct(), by = "playerId") |>
  inner_join(games |> select(gameId, treatmentId), by = "gameId") |>
  inner_join(conditions, by = "treatmentId") |>
  select(-treatmentId, -gameId)

player_conditions %>% write_csv(file.path(PROCESSED_DIR, "player_conditions.csv"))

## -----------------------------------------------------------------------------
complexity_levels = c("Low", "Medium", "High")
playerCountLevels = c(1, 3, 6)

task_instances <-
  stages |>
  filter(!grepl("(Practice|Intro)", displayName)) |>
  filter(!is.na(data.constants)) |>
  mutate(
    instance = sub('.*"name":"(.*?)".*', "\\1", data.constants),
    instance_number = case_when(
      grepl("zero", instance) ~ 0,
      grepl("one", instance) ~ 1,
      grepl("two", instance) ~ 2,
      grepl("three", instance) ~ 3,
      grepl("0", instance) ~ 0,
      grepl("1", instance) ~ 1,
      grepl("2", instance) ~ 2,
      grepl("3", instance) ~ 3,
      TRUE ~ NaN
    ),
    instance = if_else(grepl("dat instance ", instance), instance_number + 1, instance_number),
    complexity = ordered(instance, labels = complexity_levels)
  ) |>
  select(stageId, instance, data.constants, complexity)

## -----------------------------------------------------------------------------
raw_score_data <-
  player_conditions |>
  select(playerId, playerCount, data.playerIds) |>
  na.omit() |>
  left_join(player_stages, by = "playerId") |>
  left_join(
    stages |> select(
      stageId,
      displayName,
      startTimeAt,
      data.stageLength,
      data.defaultStageLength
    ),
    by = "stageId"
  ) |>
  left_join(task_instances, by = "stageId") |>
  # offline_scoring is stage-level (no playerId column); join by stageId only
  left_join(offline_scoring, by = c("stageId")) |>
  filter(!is.na(complexity)) |>
  mutate(
    task = sub(" Round.*", "", displayName),
    score = as.numeric(if_else(is.na(score), data.score, as.character(score))),
    playerCount = ordered(playerCount)
  ) |>
  filter(!is.na(score)) |>
  group_by(task, complexity) |>
  mutate(
    score = if_else(task == "Random Dot Motion", score, if_else(score < 0, 0, 100 * score / max(score))),
    duration = data.stageLength / 60000,
    efficiency = score / duration,
    wave = case_when(
      task %in% tasks_in_waves[[1]]$tasks ~ 1,
      task %in% tasks_in_waves[[2]]$tasks ~ 2,
      task %in% tasks_in_waves[[3]]$tasks ~ 3,
      TRUE ~ NA
    )
  ) |>
  ungroup() |>
  select(
    wave, task, complexity, playerCount, stageId, score, duration, efficiency,
    playerIds = data.playerIds
  ) |>
  unique() |>
  filter(!is.na(efficiency)) |>
  filter(!is.na(score)) |>
  group_by(stageId, task, complexity, playerCount, wave, playerIds) |>
  summarize(score = max(score), duration = min(duration), efficiency = max(efficiency), .groups = "drop")

## -----------------------------------------------------------------------------
rbind(
  stages %>% filter(data.type %in% c("PuttingFoodIntoCategories")) %>% select(stageId, data.type, data.constants, data.similaritiesList) %>% rename(data.answers = data.similaritiesList),
  stages %>% filter(data.type %in% c("WordConstruction")) %>% select(stageId, data.type, data.constants, data.wordsList) %>% rename(data.answers = data.wordsList),
  stages %>% filter(data.type %in% c("UnscrambleWords")) %>% select(stageId, data.type, data.constants, data.userInputList) %>% rename(data.answers = data.userInputList),
  stages %>% filter(data.type %in% c("RecallAssociation")) %>% select(stageId, data.type, data.constants, data.recalledWords) %>% rename(data.answers = data.recalledWords)
) %>% drop_na() %>% write_csv(file.path(PROCESSED_DIR, "summable_answers_raw.csv"))

## -----------------------------------------------------------------------------
permutation_synergy = function(input_data, col = "score", individuals_update) {
  individuals = input_data |>
    filter(playerCount == 1) |>
    select(-playerCount) |>
    crossing(data.frame(playerCount = c(3, 6))) |>
    arrange(desc(!!sym(col))) |>
    group_by(task, complexity, playerCount) |>
    summarise(
      random_individual = mean(!!sym(col)),
      random_individual_sd = sd(!!sym(col)),
      random_individual_n = n(),
      best_individual_n = choose(n(), mean(playerCount)),
      best_individual = sum(choose(n() - row_number(), playerCount - 1) * !!sym(col)) / best_individual_n,
      best_individual_sd = sqrt(sum(
        choose(n() - row_number(), playerCount - 1) * (!!sym(col) - best_individual) ^ 2
      ) / best_individual_n)
    ) |>
    mutate(playerCount = ordered(playerCount, levels = c(1, 3, 6))) |>
    ungroup()

  input_data |>
    filter(playerCount != 1) |>
    left_join(individuals, by = c("task", "complexity", "playerCount")) |>
    group_by(task, complexity, playerCount) |>
    summarize(
      team_n = n(),
      strong = mean(!!sym(col)) / first(best_individual),
      weak = mean(!!sym(col)) / first(random_individual),
      team_sd = sd(!!sym(col)),
      strong_se = strong * sqrt((team_sd ^ 2 / (mean(!!sym(col)) ^ 2 * team_n)) + (first(best_individual_sd) ^ 2 / (first(best_individual) ^ 2 * first(best_individual_n)))),
      weak_se = weak * sqrt((team_sd ^ 2 / (mean(!!sym(col)) ^ 2 * team_n)) + (first(random_individual_sd) ^ 2 / (first(random_individual) ^ 2 * first(random_individual_n))))
    ) |>
    ungroup()
}

permutation_synergy_partial = function(input_data, col = "score", individuals_update) {
  individuals = input_data |>
    filter(playerCount == 1) |>
    select(-playerCount) |>
    crossing(data.frame(playerCount = c(3, 6))) |>
    arrange(desc(!!sym(col))) |>
    group_by(task, complexity, playerCount) |>
    summarise(
      random_individual = mean(!!sym(col)),
      random_individual_sd = sd(!!sym(col)),
      random_individual_n = n(),
      best_individual_n = choose(n(), mean(playerCount)),
      best_individual = sum(choose(n() - row_number(), playerCount - 1) * !!sym(col)) / best_individual_n,
      best_individual_sd = sqrt(sum(
        choose(n() - row_number(), playerCount - 1) * (!!sym(col) - best_individual) ^ 2
      ) / best_individual_n)
    ) |>
    mutate(playerCount = ordered(playerCount, levels = c(1, 3, 6))) |>
    ungroup()

  input_data |>
    filter(playerCount != 1) |>
    left_join(individuals, by = c("task", "complexity", "playerCount"))
}

## -----------------------------------------------------------------------------
individuals_update = player_conditions |>
  select(playerId, playerCount, data.playerIds) |>
  na.omit() |>
  left_join(player_stages, by = "playerId") |>
  left_join(
    stages |> select(
      stageId,
      data.average,
      data.corrAngle,
      displayName,
      startTimeAt,
      data.stageLength,
      data.defaultStageLength
    ),
    by = "stageId"
  ) |>
  left_join(task_instances, by = "stageId") |>
  # offline_scoring is stage-level (no playerId column); join by stageId only
  left_join(offline_scoring, by = c("stageId")) |>
  filter(!is.na(complexity)) |>
  mutate(
    task = sub(" Round.*", "", displayName),
    score = as.numeric(if_else(is.na(score), data.score, as.character(score))),
    average = data.average,
    correct_angle = data.corrAngle,
    playerCount = ordered(playerCount)
  ) |>
  filter(task == "Random Dot Motion") |>
  filter(playerCount == 1) |>
  select(task, complexity, stageId, score, average, correct_angle) |>
  na.omit() |>
  crossing(data.frame(playerCount = c(3, 6))) |>
  group_by(task, complexity, playerCount) |>
  do(data.frame(
    best_individual_score = apply(combn(.$score, first(.$playerCount)), 2, max),
    random_individual_response = abs(colMeans(combn(.$average, first(.$playerCount))) - .$correct_angle[1])
  )) |>
  summarise(
    random_individual = mean((180 - ifelse(random_individual_response > 180, 360 - random_individual_response, random_individual_response)) / 1.8),
    random_individual_sd = sd((180 - ifelse(random_individual_response > 180, 360 - random_individual_response, random_individual_response)) / 1.8),
    random_individual_n = n(),
    best_individual_n = n(),
    best_individual = mean(best_individual_score),
    best_individual_sd = sd(best_individual_score),
    .groups = "drop"
  )

## -----------------------------------------------------------------------------
synergy_data = permutation_synergy(raw_score_data, individuals_update = individuals_update)
synergy_data |> write_csv(file.path(PROCESSED_DIR, "condition_level_group_advantage.csv"))

synergy_data_for_prediction <- synergy_data |>
  select(task, complexity, playerCount, strong, weak) |>
  mutate(value = 1) |>
  pivot_wider(names_from = complexity, values_from = value, values_fill = 0) |>
  left_join(task_map, by = "task")

synergy_data_for_prediction |>
  write_csv(file.path(PROCESSED_DIR, "condition_level_group_advantage_with_ivs.csv"))

synergy_data_for_prediction |>
  # Keep ALL IVs from task_map (Task Space) + condition-level fields, then append category one-hots
  # Build the same normalized key as used in mcgrath_mapping_wide
  mutate(task_key = gsub("[^a-z0-9]", "", tolower(trimws(task)))) |>
  left_join(mcgrath_mapping_wide, by = "task_key") |>
  select(-task_key) |>
  (\(df) {
    if (length(mcgrath_category_cols) > 0) {
      # Ensure NAs are treated as 0 but DO NOT add an artificial Uncategorized_cat column
      df <- df |> mutate(across(all_of(mcgrath_category_cols), ~ as.numeric(coalesce(.x, 0))))
    }
    df
  })() |>
  write_csv(file.path(PROCESSED_DIR, "condition_level_group_advantage_with_ivs_and_categories.csv"))

## -----------------------------------------------------------------------------
synergy_summary_data <- synergy_data |>
  pivot_longer(c("strong", "weak"), names_to = "DV", values_to = "value") |>
  pivot_longer(
    c("strong_se", "weak_se"),
    names_sep = "_",
    names_to = c("name", "se"),
    values_to = "SE"
  ) |>
  filter(DV == name) |> select(-name, -se) |>
  mutate(
    DV = if_else(DV == "weak", paste0("Weak ", outcome_term), paste0("Strong ", outcome_term)),
    DV = ordered(DV, levels = c(paste0("Weak ", outcome_term), paste0("Strong ", outcome_term))),
    complexity = paste(complexity, "Complexity"),
    complexity = ordered(
      complexity,
      levels = c("Low Complexity", "Medium Complexity", "High Complexity")
    ),
    playerCount = if_else(playerCount == 3, "Small Group", "Large Group"),
    playerCount = ordered(playerCount, levels = c("Small Group", "Large Group")),
    grouping = "Task",
    group = task
  ) |>
  left_join(task_map |> select(task, wave), by = "task") |>
  mutate(wave = paste0("Wave ", wave))

aggregated_synergy_summary_data_by_wave = synergy_summary_data |>
  select(-grouping, -group) |>
  pivot_longer(c(task, complexity, playerCount), names_to = "grouping", values_to = "group") |>
  group_by(grouping, group, DV, wave) |>
  summarise(
    value = mean(value),
    SE = sqrt(sum(SE ^ 2) / length(SE) ^ 2),
    .groups = "drop_last"
  ) |>
  mutate(
    grouping = case_when(
      grouping == "complexity" ~ "Complexity",
      grouping == "playerCount" ~ "Size",
      grouping == "task" ~ "Task"
    ),
    grouping = ordered(grouping, levels = c("Task", "Complexity", "Size"))
  ) |>
  filter(grouping == "Task")

aggregated_synergy_summary_data_by_wave$DV <- factor(
  aggregated_synergy_summary_data_by_wave$DV,
  levels = rev(levels(aggregated_synergy_summary_data_by_wave$DV))
)

synergy_summary_data <- synergy_data |>
  pivot_longer(c("strong", "weak"), names_to = "DV") |>
  pivot_longer(
    c("strong_se", "weak_se"),
    names_sep = "_",
    names_to = c("name", "se"),
    values_to = "SE"
  ) |>
  filter(DV == name) |> select(-name, -se) |>
  mutate(
    DV = if_else(DV == "weak", paste0("Weak ",outcome_term), paste0("Strong ",outcome_term)),
    DV = ordered(DV, levels = c(paste0("Weak ",outcome_term), paste0("Strong ",outcome_term))),
    complexity = paste(complexity, "Complexity"),
    complexity = ordered(
      complexity,
      levels = c("Low Complexity", "Medium Complexity", "High Complexity")
    ),
    playerCount = if_else(playerCount == 3, "Small Group", "Large Group"),
    playerCount = ordered(playerCount, levels = c("Small Group", "Large Group")),
    grouping = "Task",
    group = task
  ) |> 
  left_join(task_map |> select(task,wave)) |> 
  mutate(
    wave = paste0("Wave ",wave)
  )

aggregated_synergy_summary_data_by_wave = synergy_summary_data |>
  select(-grouping, -group) |>
  pivot_longer(c(task, complexity, playerCount),
               names_to = "grouping",
               values_to = "group") |>
  group_by(grouping, group, DV, wave) |>
  summarise(value = mean(value),
            SE = sqrt(sum(SE ^ 2) / length(SE) ^ 2)) |> 
  mutate(
    grouping = case_when(
      grouping == "complexity" ~ "Complexity",
      grouping == "playerCount" ~ "Size",
      grouping == "task" ~ "Task",
    ),
    grouping = ordered(grouping, levels = c("Task", "Complexity", "Size"))
  ) |> 
  filter(grouping == "Task")

# Make the order "Strong," then "Weak"
aggregated_synergy_summary_data_by_wave$DV <- factor(
  aggregated_synergy_summary_data_by_wave$DV,
  levels = rev(levels(aggregated_synergy_summary_data_by_wave$DV))
)

# -----------------------------------------------------------------------------
# FIGURE 4 IN MAIN TEXT (DESCRIPTIVE FIGURE OF HETEROGENEITY IN GROUP ADVANTAGE)
# Heterogeneity in group advantage across conditions. Each point represents the 
# observed group advantage at the level of an experimental condition, which is 
# a tuple of task (y-axis) × level of complexity (color) × group size (point 
# shape; small, three-person groups are represented by circles and large, 
# six-person groups are represented by crosses). Tasks are grouped by the 
# experimental wave in which they appeared (top three facets). Error bars 
# represent the analytical 95% confidence intervals (1.96 * 1 standard error) 
# for group advantage in a given condition. Boxes are centered around the mean 
# and show one standard error. 

figure_heterogeneity <- aggregated_synergy_summary_data_by_wave |>
  ggplot(aes(
    value,
    reorder(group, value),
    xmin = value - z * SE ,
    xmax = value + z * SE,
  )) +
  facet_grid(
    cols = vars(DV),
    rows = vars(wave),
    scales = "free_y",
    space = "free",
    switch = "both"
  ) +
  geom_vline(xintercept = c(1), linetype = "21") +
  theme_pubclean() +
  theme_pubclean(flip = FALSE) +
  theme(
    legend.position = "bottom",
    plot.margin = margin(
      t = 1,
      r = 1,
      b = 1,
      l = 1
    ),
    strip.placement = "outside",
    # strip.background = element_blank(),
    panel.spacing = unit(0.5, "lines"),
    legend.margin = margin(t = -25),
  ) + 
  geom_pointrange(
    data = synergy_summary_data,
    aes(
      value,
      group,
      shape = playerCount,
      # color = if_else(display,complexity,"none"),
      color = complexity,
      xmin = value - z * SE ,
      xmax = value + z * SE,
      # fill = if_else(((value - z * SE) - 1)*((value + z * SE) - 1)>0,complexity,"white")
    ),
    position = position_dodge2(width = 0.8, padding = 0.1, reverse = FALSE),
    size = .4,
    fill = "white",
    stroke = .9,
    # shape = 21
  ) +
  scale_color_manual(
    values = c(
      "Low Complexity" = "#1b9e77",
      "Medium Complexity" = "#7570b3",
      "High Complexity" = "#d95f02",
      "white" = "white"
    ),
    # guide = "none"
  ) +
  scale_shape_manual(values = c(21,4)) +
  # scale_shape_manual(values = c(21,24)) +
  labs(
    y = "",
    x = "",
    color = "",
    fill = "",
    shape = ""
  ) + geom_crossbar() +
 theme(
  legend.position = "top",
  legend.justification = "right",
  legend.box = "horizontal",
  legend.text = element_text(size = 18),
  plot.margin = margin(t = 28, r = 50, b = 15, l = 5),  # Increase r until legend fits!
  strip.placement = "outside",
  panel.spacing = unit(0.5, "lines"),
  legend.margin = margin(b = 10, t = 0),
  legend.box.margin = margin(t = 7, r = 0, b = 0, l = 0),
  strip.background = element_blank(),
  strip.text = element_text(face = "bold", color = "black", size = 20),
  axis.text.y = element_text(size = 18),
  axis.text.x = element_text(size = 18)
)
ggsave(file.path(FIGURES_DIR, "heterogeneity_in_group_advantage_across_conditions.pdf"), plot = figure_heterogeneity, height = 14, width = 14, create.dir = TRUE)
ggsave(file.path(FIGURES_DIR, "heterogeneity_in_group_advantage_across_conditions.png"), plot = figure_heterogeneity, height = 14, width = 14, create.dir = TRUE)


## -----------------------------------------------------------------------------
panel <- read_csv(file.path(DATA_DIR, "players", "individuals.csv"), show_col_types = FALSE)

players_with_panel <-
  players |>
  mutate(WorkerId = sub(" .*", "", id)) |>
  select(playerId, WorkerId, playerIds = data.playerIds) |>
  left_join(
    panel |> select(
      WorkerId,
      date,
      CRT,
      birth_year,
      gender,
      education_level,
      political_fiscal,
      political_social,
      political_party,
      income_min,
      income_max,
      IRCS_GS,
      IRCS_GV,
      IRCS_IB,
      IRCS_IS = IRCS_IR,
      IRCS_IV,
      IRCS_RS,
      marital_status,
      race,
      RME
    ),
    by = "WorkerId"
  ) |>
  mutate(value = 1) |>
  pivot_wider(
    names_from = gender,
    names_prefix = "gender_",
    values_fn = mean,
    values_fill = 0
  ) |>
  mutate(value = 1) |>
  pivot_wider(
    names_from = marital_status,
    names_prefix = "marital_status_",
    values_fn = mean,
    values_fill = 0
  ) |>
  mutate(value = 1) |>
  pivot_wider(
    names_from = political_party,
    names_prefix = "political_party_",
    values_fn = mean,
    values_fill = 0
  ) |>
  mutate(value = 1) |>
  pivot_wider(
    names_from = education_level,
    names_prefix = "education_level_",
    values_fn = mean,
    values_fill = 0
  ) |>
  mutate(value = 1) |>
  pivot_wider(
    names_from = race,
    names_prefix = "race_",
    values_fn = mean,
    values_fill = 0
  ) |>
  mutate(
    birth_year = abs(birth_year),
    birth_year = if_else(birth_year > 1000, birth_year, as.numeric(format(as.Date(date), "%Y")) - birth_year)
  ) |>
  filter(as.numeric(format(as.Date(date), "%Y")) - 17 > birth_year, birth_year > 1900) |>
  select(-matches("_NA"), -date) |>
  na.omit() |>
  left_join(player_stages |> select(playerId, stageId), by = "playerId")

stage_team_compositions <- players_with_panel |>
  group_by(stageId) |>
  summarise(
    n = n(),
    across(c(
      matches("gender"),
      matches("marital_status"),
      matches("political_party"),
      matches("education_level"),
      matches("race")
    ), mean),
    across(
      c(
        CRT,
        birth_year,
        matches("income"),
        matches("IRCS"),
        RME,
        political_fiscal,
        political_social
      ),
      c(
        mean = ~ mean(.x, na.rm = TRUE),
        min = ~ min(.x, na.rm = TRUE),
        max = ~ max(.x, na.rm = TRUE),
        sd = ~ sd(.x, na.rm = TRUE)
      )
    ),
    .groups = "drop"
  ) |>
  filter(n != 1) |>
  select(-n) |>
  na.omit()

synergy_data_partial <-
  permutation_synergy_partial(raw_score_data, individuals_update = individuals_update) |>
  mutate(
    weak = score / random_individual,
    strong = score / best_individual
  ) |>
  select(stageId, task, complexity, playerCount, weak, strong) |>
  pivot_longer(c(weak, strong), names_to = "DV", values_to = "value") |>
  semi_join(stage_team_compositions, by = "stageId")

task_instance_modeling_data <-
  synergy_data_partial |>
  left_join(task_map |> select(task, wave), by = "task") |>
  mutate(features = "Task instance")

composition_modeling_data <-
  task_instance_modeling_data |>
  left_join(stage_team_compositions, by = "stageId") |>
  mutate(features = "Team composition")

task_space_modeling_data <-
  task_instance_modeling_data |>
  left_join(task_map, by = "task") |>
  mutate(features = "Task space")

both_modeling_data <-
  composition_modeling_data |>
  left_join(task_map, by = "task") |>
  mutate(features = "All features")

observation_synergy_map_and_composition <- both_modeling_data |>
  pivot_wider(names_from = DV, values_from = value) |>
  mutate(value = 1) |>
  pivot_wider(names_from = complexity, values_from = value, values_fill = 0) |>
  mutate(synergy = if_else(strong > 1, "strong", if_else(weak > 1, "weak", "none")))

observation_synergy_map_and_composition <- players_with_panel %>%
  select(stageId, playerIds) %>%
  distinct() %>%
  right_join(observation_synergy_map_and_composition, by = "stageId")

observation_synergy_map_and_composition %>%
  write_csv(file.path(PROCESSED_DIR, "observation_level_dv_with_composition.csv"))