      #--- IMPORTING Libraries -----
      library(dplyr)
      library(tidyverse)
      library(stringr)
      library(Hmisc)
      library(httr)
      library(jsonlite)
      library(ggplot2)
      
      #--- LOG INTO API ----
      post_login <-  POST(
        "https://watts.turk-interface.com/auth/login",
        body = list(
          username = Sys.getenv('CSSL_USER'),
          password = Sys.getenv('CSSL_PWD')
        ),
        encode = "json"
      )
      
      token <- fromJSON(content(
        post_login,
        "text"
      ))$token
      
      #--- PREVIOUS Pre-Testing Data ----
      previous_tested<- read_csv("previous_tested.csv")%>%
        rename(WorkerId = name) %>% 
        group_by(WorkerId) %>% 
        arrange(WorkerId, desc(score_pct)) %>% 
        slice(1) 
      
      #--- GET Panel ----
      panel_individuals <- read_csv("https://raw.githubusercontent.com/Watts-Lab/individual-mapping/main/panel.csv?token=GHSAT0AAAAAABNZCBBVD7P6RNFM2G4375GMYUK3PEQ")
      
      our_panel <- panel_individuals %>% 
        left_join(previous_tested) %>%
        select(WorkerId, high_effort, colnames(previous_tested)) %>% write_csv("our_panel.csv")
      
      #--- People ----
      n = 150
      sample = 200
      
      set.seed(123)
      people <-  our_panel %>% 
        filter(high_effort == 1 & ) %>%
        sample_n(200) 

      #--- Preparing Links + Lists ---- 
      
      set.seed(123)
      people <-  panel_individuals %>% 
        filter(high_effort == 1 & 
                 !WorkerId %in% pilot & 
                 !WorkerId %in% old_pilot & 
                 !WorkerId %in% worker_ids) %>%
        sample_n(4) 
      
      
      url <- "https://upenn.co1.qualtrics.com/jfe/form/SV_6utWIJ0CFGUHPtI"
    
      participants <- people$WorkerId
      link_groups <- list("worker_id" = participants)

      for(i in 1:length(participants)){
        person <- participants[i]
        links_filtered <- people %>% 
          filter(WorkerId == person)
        
        worker_links <- as.list(url)
        link_groups[["links"]][[i]] <- worker_links
        link_groups[["comments"]][[i]] <- paste0("Task Mapping Pre-Test")
      }
      
      worker_ids <- link_groups$worker_id
      links <- link_groups$links
      comments <- link_groups$comments
      
      #--- Sending Surveys ----
      header_msg = "
           Hi ${worker_id} — you signed up to be part of our ongoing projects. 
           
           Important: Please take action before Thursday, May 19, at 11:59 PM EST in order to participate. DESKTOP is optimal for best experience.
           
           Because you previously completed an MTurk task for our research group, we have identified you as someone who does exceptional work. 
           We have an opportunity for you to join an exclusive group of MTurk workers to earn a qualification for a future task. In the future task, you will read descriptions of tasks completed by either individuals or teams, and you will answer questions about them.
           The pretest should take approximately 20 MINUTES. We will pay you at a rate of $15/hr which means approximately $5. 
           You will be paid in a bonus upon successful completion of the task (e.g., finishing the survey). Your survey is marked completed only if you complete all questions, and arrive at the final page that shows your completion code.  
           
           In this pre-test, you will answer some practice questions that are similar to those in the future task. We’ll show you the answers for 6 questions, and then grade 16 of them.
            "
      
      footer_msg = "
           We will pay by the next business day after each survey is completed. Reminder: Please submit your survey before Thursday, May 19, at 11:59 PM EST in order to participate.
            "
      
      json_body = list(
        "worker_ids" = worker_ids, 
        "links_group" = links,
        "subject" = "[~20 min] Complete Training and Pre-Test to Qualify for a Highly-Paid Task!",
        "comments" = comments, 
        "footer_msg" = footer_msg,
        "header_msg" = header_msg
      )
      
      post_send <- POST(
        "https://watts.turk-interface.com/workers/notify/survey",
        body = jsonlite::toJSON(json_body, auto_unbox =TRUE),
        add_headers(.headers = c(`hk_506441291624ec13`= paste0(
          "Bearer ", token
        ))),
        verbose(),
        encode = "json",
        content_type_json()
      )
      
      send <- fromJSON(content(
        post_send,
        "text"
      ))
      
      failed_workers <- send$failed_workers
      panel <- our_panel %>%
        mutate(
          Active = ifelse(WorkerId %in% failed_workers, FALSE, Active)
        ) %>% 
        write_csv("our_panel.csv")
      #--- PAYING People ----
      unpaid_people <- our_panel %>% 
        filter(paid == 0 & `pre-test` == 1)
      
      #--- REGISTERING Payments (complete surveys)---
      body <- list(
        "bonuses" = unpaid_people$payment_amount, 
        "comment" = paste0("Task-Mapping Pre-Test round 1"),
        "project" = "Task Mapping",
        "worker_ids" = unpaid_people$WorkerId
      )
      
      post_register_pay <- POST(
        "https://watts.turk-interface.com/payments/register",
        body = jsonlite::toJSON(body, auto_unbox =TRUE),
        add_headers(.headers = c(`hk_506441291624ec13`= paste0(
          "Bearer ", token
        ))),
        verbose(),
        encode = "json",
        content_type_json()
      )
      
      register_pay <- fromJSON(content(
        post_register_pay,
        "text"
      ))
      
      #--- PAYING People (complete surveys)---
      payment_token <- "hk_452583a4806a933d"
      
      body <- list(payment_token = payment_token)
      
      post_pay <-  POST(
        "https://watts.turk-interface.com/payments/process",
        body = body,
        add_headers(.headers = c(`hk_506441291624ec13`= paste0(
          "Bearer ", token
        ))),
        encode = "json"
      )
      pay <- fromJSON(content(
        post_pay,
        "text"
      ))
      
      our_panel <- our_panel %>%
        filter(tested == 1) %>% 
        mutate(
          paid = ifelse(WorkerId %in% unpaid_people$WorkerId, 1, paid)) %>% 
          write_csv("our_panel.csv")
      
      