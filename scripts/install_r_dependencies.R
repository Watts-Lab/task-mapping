# Installs R package dependencies used across the repository.
# Usage (from repo root):
#   Rscript scripts/install_r_dependencies.R

cran_repos <- getOption("repos")
if (is.null(cran_repos) || identical(cran_repos, c(CRAN = "@CRAN@"))) {
  options(repos = c(CRAN = "https://cloud.r-project.org"))
}

pkgs <- c(
  # Core tidyverse
  "tidyverse", "ggplot2", "dplyr", "tidyr", "readr", "stringr", "tibble",
  # Shiny / viz
  "shiny", "plotly", "svglite", "ggpubr", "ggrepel", "ggridges", "ggfortify",
  # Modeling / stats
  "e1071", "caret", "randomForest", "xgboost", "nnet", "pls", "NbClust", "cluster",
  # Utils
  "rlang", "broom", "Hmisc", "httr", "jsonlite", "lubridate", "DescTools", "corrplot", "irr", "icr", "markdown",
  # Domain-specific
  "qualtRics",
  # Dimensionality reduction
  "tsne", "umap",
  # Fonts / reporting
  "extrafont", "stargazer",
  # Misc referenced
  "factoextra",
  # May be optional in some environments
  "ggbuildr"
)

install_if_missing <- function(pkgs) {
  for (p in pkgs) {
    if (!requireNamespace(p, quietly = TRUE)) {
      message(sprintf("Installing %s...", p))
      tryCatch(install.packages(p), error = function(e) {
        message(sprintf("Failed to install %s from CRAN: %s", p, e$message))
      })
    }
  }
}

install_if_missing(pkgs)

message("\nDone. If some packages failed (e.g., not on CRAN), you may need to install them manually or from GitHub.\n")
