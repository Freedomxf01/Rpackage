# setwd('C:\\material\\MBMA\\myPackage\\test\\scatterPlot\\E3')
# devtools::install()  


library(E3)
library(shiny)
library(jsonlite)

runApp(list(
  ui = bootstrapPage(
    E3ScatterOutput("gauge1")
  ),
  
  
  server = function(input, output) {
    
    # reactive that generates a random value for the gauge
    
    # example use of the automatically generated render function
    output$gauge1 <- renderE3Scatter({ 
      
      # df <- data.frame(xcol = c(1,2,3,4,5),
      #                  ycol = c(6,7,8,9,10),
      #                  gcol = c("A", "A", "C", "B", "B"), stringsAsFactors = F)
      
      file_path <- "C:\\material\\MBMA\\myPackage\\test\\scatterPlot\\20160226_186_CDF-Final_V2_0_PSA_Efficacy_41papers.csv"
      
      df <- read.csv(file_path,header = TRUE, sep = ",", quote = "\"",stringsAsFactors = FALSE,na.strings = c("NA", "na", "", " "))
      
      df$xcol <- df$ARM.TIME1
      df$ycol <- df$RSP.VAL
      df$gcol <- df$ARM.TRT
      
      df <- df[,c("xcol", "ycol", "gcol")]
      
      unique_group <- unique(df$gcol)
      unique_group <- unique_group[!is.na(unique_group)]
      
      row_num <- nrow(df)
      
      for (x in unique_group) {
        v <- rep(NA, row_num)
        v[which(df$gcol == x)] <- df$ycol[which(df$gcol == x)]
        df[[x]] <- v
      }
      
      df <- df[, -which(names(df) %in% c('ycol', 'gcol'))] 
      
      ycols <- names(df)
      ycols <- ycols[-which(ycols == "xcol")]
      
      E3Scatter(list(data = toJSON(df), cols = ycols))
    })
  }
))