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
        link_groups[["comments"]][[i]] <- paste0("Task Mapping - Carter Racing")
      }
      
      worker_ids <- link_groups$worker_id
      links <- link_groups$links
      comments <- link_groups$comments
      
      #--- Sending Surveys ----
      header_msg = "
         Hello! You previously qualified for our task, in which you answered 23 questions about a group task. 
         We now have one additional task added to the database, and there are opportunities for around 20 individuals to answer questions about the task. 
         You will be paid at the same rate ($15/hour) that you were paid for the original task.
         
         Please re-visit your personal link at the URL below! This will be first-come, first-serve; the first 20 people to arrive will be able to complete the task.
         Additionally, we will maintain this mailing list and notify you when new tasks become available.
         "
      footer_msg = "
          You do NOT need to email us a completion code; if you reach the page with the code, this means that you have completed the survey.

          We hope to see you soon. 
          
          Thank you so much!
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
      
      #--- Sending Surveys (Last Hooray!) ----
      header_msg = "
          Hi — you're on our list of workers who qualified to answer 23 questions about a task.

          We are writing to let you know that the project will be wrapping up early, in part because all of you have been so eager, efficient, and high-quality in your work. 
          We have received all the data that we need for this stage.
          
          Together, we managed to label more than 70 tasks in just a few weeks. We received nearly 2000 responses to our survey, and finished the data collection process significantly faster than expected. 
          
          We are currently wrapping up with this stage of our project. 
          While it is possible that we will eventually add new tasks and require you to work again, in the foreseeable future, we will be closing this phase. 
          If you visit your personal link, you will be redirected to a page with a similar message to this one.
          
          Thank you so much for participating; this work could not be possible without you, and on behalf of our entire team, we are very grateful for your work. 
          We will keep you posted about updates to this project via email. 
          If you have any outstanding payments, they will be paid within this week.
         "
      
      
      first <- qualified$WorkerId[1:57]
      second <- qualified$WorkerId[58:114]
      
      
      json_body = list(
        "worker_ids" = second, 
        "subject" = "[UPDATES:No More Tasks!] Answer 23 Questions about a Task Survey Has Completed Data Collection",
        "comment" = "Task Mapping: Final message", 
        "msg" = header_msg
      )
      
      post_send <- POST(
        "https://watts.turk-interface.com/workers/notify",
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
      
      #--- PAYING People ----
      mapper_payment <- read_csv("mapper_payment.csv")%>% 
        mutate(
          amount_to_pay = payment - amount_paid
        )
      
      #--- REGISTERING Payments (complete surveys)---
      payments_body <- list(
        "bonuses" = mapper_payment$amount_to_pay, 
        "comment" = paste0("Task-Mapping Mapping Carter Racing - Round"),
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
      payment_token <- "2JkUIhZYUe9Tew"
      
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
      