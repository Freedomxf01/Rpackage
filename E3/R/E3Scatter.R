#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
E3Scatter <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'E3Scatter',
    x,
    width = width,
    height = height,
    package = 'E3',
    elementId = elementId
  )
}

#' Shiny bindings for E3Scatter
#'
#' Output and render functions for using E3Scatter within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a E3Scatter
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name E3Scatter-shiny
#'
#' @export
E3ScatterOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'E3Scatter', width, height, package = 'E3')
}

#' @rdname E3Scatter-shiny
#' @export
renderE3Scatter <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, E3ScatterOutput, env, quoted = TRUE)
}
