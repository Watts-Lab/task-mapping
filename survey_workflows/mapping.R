      #--- IMPORTING Libraries -----
      library(dplyr)
      library(tidyverse)
      library(stringr)
      library(Hmisc)
      library(httr)
      library(jsonlite)
      library(ggplot2)
      library(lubridate)
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
      
      
      #--- QUALIFIED People (All) ----
      our_panel <- read_csv("our_panel.csv")
      qualified <- our_panel %>%
        filter(`pre-test` == 1 & `score_pct` >= 0.75)
      
      #--- NORMAL SCORING People : Preparing + Sending Surveys ----
      #--- Preparing Links + Lists --- 
      url <- "https://task-robot.glitch.me/survey?workerID="
      
      participants <- qualified$WorkerId
      link_groups <- list("worker_id" = participants)
      
      for(i in 1:length(participants)){
        person <- participants[i]
        
        worker_links <- as.list(paste0(url, person))
        link_groups[["links"]][[i]] <- worker_links
        link_groups[["comments"]][[i]] <- paste0("Task Mapping Mapping Round 1")
      }
      
      worker_ids <- link_groups$worker_id
      links <- link_groups$links
      comments <- link_groups$comments
      
      #--- Sending Surveys ---
      header_msg = "
          Hi — you signed up to be part of our ongoing projects.

          SUMMARY: Please visit your unique personal link as soon as possible to work on tasks! 
          ---
          
          You recently completed a qualification task that involves reading about a task (to be completed by an individual or a group) and answering 23 questions about it. We are pleased to inform you that you have passed the pre-test for this task, and you have earned a qualification — Congratulations!
          
          You will now have a UNIQUE PERSONAL LINK, which you can visit to receive more tasks. Each time you visit this link, you will receive a DIFFERENT task. You can visit this link as many times as you wish, and submit as many surveys as you are able. You will be paid $3 per survey (approximately 12 minutes / survey, paid at $15/hr). 
          
          We will continuously add more tasks to the database, and we hope you will visit this link as often as possible. There is no limit to the number of tasks that you can do, although you may see a waiting page if there are no tasks at the moment.
            "
      
      footer_msg = "
          Your responses at this link will be evaluated and paid within 3-4 business days. You do NOT need to email us a completion code; if you reach the page with the code, this means that you have completed the survey.

          We look forward to you working with us soon!
            "
      
      json_body = list(
        "worker_ids" = worker_ids, 
        "links_group" = links,
        "subject" = "[Ongoing Paid Activity] You Earned a Qualification for an Ongoing Project about Answering Questions about Tasks!",
        "comments" = comments, 
        "footer_msg" = footer_msg,
        "header_msg" = header_msg
      )
      
      post_send <- POST(
        "https://watts.turk-interface.com/workers/notify/survey",
        body = jsonlite::toJSON(json_body, auto_unbox =TRUE),
        add_headers(.headers = c(`Authorization`= paste0(
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
      
      #--- HIGH SCORING People : Preparing + Sending Surveys ----
      #--- PAYING People ----
      mapper_payment <- read_csv("mapper_payment.csv")%>% 
        mutate(
          amount_to_pay = payment - amount_paid
        )
      
      #--- REGISTERING Payments (complete surveys)---
      payments_body <- list(
        "bonuses" = mapper_payment$amount_to_pay, 
        "comment" = paste0("Task-Mapping Mapping round 1"),
        "project" = "Task Mapping",
        "worker_ids" = mapper_payment$WorkerId
      )
      
      post_register_pay <- POST(
        "https://watts.turk-interface.com/payments/register",
        body = jsonlite::toJSON(payments_body, auto_unbox =TRUE),
        add_headers(.headers = c(`Authorization`= paste0(
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
      payment_token <- "0kQfS6XjlqMKqA"
      
      body <- list(payment_token = payment_token)
      
      post_pay <-  POST(
        "https://watts.turk-interface.com/payments/process",
        body = body,
        add_headers(.headers = c(`Authorization`= paste0(
          "Bearer ", token
        ))),
        encode = "json"
      )
      pay <- fromJSON(content(
        post_pay,
        "text"
      ))
      
      payments <- tibble(WorkerId = payments_body$worker_ids, 
                         paid = payments_body$bonuses, 
                         last_payment_date = with_tz(Sys.time(), "America/New_York"))
      
      #--- Registering CSV ---- 
      final_payment_csv <- mapper_payment %>% 
        select(-last_payment_date) %>% 
        left_join(payments) %>%
        mutate(
          amount_paid = amount_paid + paid, 
          amount_to_pay = payment - amount_paid) %>%
        select(-paid) %>%
        write_csv("mapper_payment.csv")
      