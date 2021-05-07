library(shiny)
library(jsonlite)
options(shiny.maxRequestSize = 1000 * 1024 ^ 2)
shinyUI( bootstrapPage( 
  
  # include the js code
  includeScript("./www/js/d3.min.js"),
  includeScript("./www/js/custom.js"),
  
  sidebarLayout(
    
    sidebarPanel(
      fileInput(inputId = "rawData", label = "Please choose a data input file", accept = "csv"),
      
      uiOutput('axis_selection')
    ),
    
    mainPanel(tags$div(id = "my_dataviz"))
  )
  
  ))