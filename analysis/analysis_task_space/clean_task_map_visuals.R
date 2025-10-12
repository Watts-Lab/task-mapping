## -----------------------------------------------------------------------------
library(factoextra)
library(NbClust)
library(cluster)
library(svglite)
library(ggplot2)
library(dplyr)
library(tidyverse)

## -----------------------------------------------------------------------------
task_map <- read_csv('../../outputs/processed_data/task_map.csv')

## ----Get Task Map PCA for visualization-----------------------------------------------
set.seed(1)

pca <- task_map %>% #select(-continuous_questions) %>%
  select(-task) %>%
  prcomp(center = T)

# get optimal number of clusters -- "silhouette" method
fviz_nbclust(x = pca$x, FUNcluster = stats::kmeans, method = "silhouette") +
  labs(subtitle = "Silhouette method")

# get optimal number of clusters
NbClust(data = pca$x, distance = "euclidean",
        min.nc = 2, max.nc = 15, method = "kmeans")

kmeans_output <- pca$x %>% 
  kmeans(centers = 3, nstart = 100)

combined_data <- cbind(task_map,
      pca$x, factor(kmeans_output$cluster)) %>%
  rename(cluster = `factor(kmeans_output$cluster)`)

fviz_eig(pca)

## -----------------------------------------------------------------------------
task_map_with_intuitive_labels <- read_csv(
  '../../outputs/processed_data/hand_labeled_task_mcgrath_sectors.csv',
  show_col_types = FALSE
) %>%
  mutate(group = as.factor(group))


## ----fig.width=14, fig.height=5-----------------------------------------------
combined_data_with_labels <- combined_data %>%
    left_join(task_map_with_intuitive_labels, by = "task") %>%
    rename(`McGrath Quadrant` = group)

mcgrath_quad_display_set <- c(
    "Whac-A-Mole",
    "Space Fortress",
    "Search for Oil Task",
    "Target Search",
    "9 Dot Problem",
    "Ravens Matrices",
    "Moral Reasoning (Disciplinary Action Case)",
    "Allocating resources to programs",
    "hk_22482ca42486c72f writing",
    "Writing story",
    "Word construction from a subset of letters",
    "Word completion given starting letter",
    "Shopping plan",
    "Mock jury",
    "Ultimatum game (various versions)",
    "Dictator game and its variants",
    "Pharmaceutical Company (hidden-profile)",
    "Investment game (hidden-profile)"
)

p <- combined_data_with_labels %>%
    ggplot(aes(x = PC1,
               y = PC2,
               label = task,
               color = `McGrath Quadrant`
               )) +
    geom_point(alpha = 0.4) +
    geom_label(data = subset(combined_data_with_labels, task %in% mcgrath_quad_display_set),
               aes(label = task, fill = `McGrath Quadrant`),
               vjust = "inward",
               hjust = "inward",
               color = "white",
               size = 2.5,
               fontface = "bold") +
    geom_point(data = subset(combined_data_with_labels, task %in% mcgrath_quad_display_set),
               aes(label = task, fill = `McGrath Quadrant`),
               vjust = "inward",
               hjust = "inward",
               color = "black") +
    theme_minimal(base_size = 18) +
    theme(plot.title = element_text(face = "bold")) +
    labs(x = "Demonstrable Correctness (PC1)",
         y = "Collaboration-Conflict (PC2)",
         title = "Projection of the Task Space in 2D (using PCA), with Illustrative Tasks") +
    scale_fill_hue(l = 45)

# Save the plot as an .svg file
ggsave(
    plot = p,
  filename = "../../outputs/figures/task_map_with_intuitive_illustrations_raw.svg",
    width = 14,
    height = 5,
    device = "svg"
)

p

