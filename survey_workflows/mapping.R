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
          Hi — you signed up to be part of our ongoing projects, and we reached out last week about your qualification to do our task (Answering 23 questions about a group or individual activity).

          SUMMARY: Our study is ongoing, and we are releasing more tasks today! Come do tasks with us!
          
          Especially if you have not gotten the chance to do a task yet, please come! We would love your help.
          
          As a reminder, you should visit your personal link (included in this email) to start doing tasks. 

          To avoid spamming your inboxes, we plan to post major updates on Fridays, and we will release the largest batches of tasks then. 
          We will also post some tasks throughout the week, as quickly we are able to add them to the database. 
          
          In this past week, we have seen very high demand, and the daily tasks have generally been completed within an hour of being posted — thank you for your hard work and dedication! 
          However, because of this demand, and because creating tasks takes time, please do not be alarmed if you do not see any postings when you visit the site. 
         "
      footer_msg = "
          We will pay you $3 per completed survey ($15/hr rate), and you will receive the bonus within 3-4 business days. 
          You do NOT need to email us a completion code; if you reach the page with the code, this means that you have completed the survey.

          We hope to see you again soon.
            "
      
      json_body = list(
        "worker_ids" = worker_ids, 
        "links_group" = links,
        "subject" = "[UPDATES:Ongoing Paid Activity] 23 questions about a task",
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
      payment_token <- "m3XHcqD5KXjT8w"
      
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
      
      #--- Registering Final CSV ---
      final_payment_csv <- mapper_payment %>% 
        select(-last_payment_date) %>% 
        left_join(payments) %>%
        mutate(
          amount_paid = amount_paid + paid, 
          amount_to_pay = payment - amount_paid) %>%
        select(-paid) %>%
        write_csv("mapper_payment.csv")
      