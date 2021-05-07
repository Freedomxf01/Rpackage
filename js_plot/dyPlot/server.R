

shinyServer( function(input, output, session) {
  
  dataStatus <- reactiveValues()
  
  rawData <- reactive({
    file_path <- input$rawData$datapath
    dataInput <- NULL
    if(!is.null(file_path)){
      dataInput <- read.csv(file_path,header = TRUE, sep = ",", quote = "\"",stringsAsFactors = FALSE,na.strings = c("NA", "na", "", " "))
      dataStatus$dataColumns <- sort(names(dataInput)) 
    }
    dataInput
  })
  
  plotData <- reactive({
    df <- rawData()
    df$xcol <- df[,input$axis_x]
    df$ycol <- df[,input$axis_y]
    df$gcolor <- df[,input$color_g]
    
    df <- df[,c("xcol", "ycol", "gcolor")]
  })
  
  observe({
    print(plotData())
    # df <- iris
    # names(df) <- c("Sepal_Length", "Sepal_Width",  "Petal_Length", "Petal_Width",  "Species")
    # print(toJSON(df))
    
    df <- plotData()
    df_json <- toJSON(df)
    session$sendCustomMessage(type='scatterHandler', df_json) 
  })
  

  output$axis_selection<-renderUI({
    # selectInput('scatter_x', 'please choose a variable as x',choices=names(Datafilter1()), selected="TIME", multiple=TRUE)
    list(
      selectInput('axis_x', 'Select X-axis variable(s)',choices=dataStatus$dataColumns , selected="ARM.TIME1", multiple=TRUE),
      selectInput('axis_y', 'Select Y-axis variable(s)',choices=dataStatus$dataColumns, selected="RSP.VAL", multiple=TRUE),
      selectInput('color_g', 'Select color group variable(s)',choices=dataStatus$dataColumns, selected="ARM.TRT", multiple=TRUE)
    )
  })
  

})



