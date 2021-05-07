// Execute function body when the HTML document is ready
$(document).ready(function() {
    
    Shiny.addCustomMessageHandler("scatterHandler",     
        function(dataset) {
          
       /* alert(dataset);  
        
        var dataset = [{Sepal_Length:5.1, Sepal_Width:3.5,Petal_Length:1.4, Petal_Width:0.2,Species:"setosa"},
				{Sepal_Length:6.1, Sepal_Width:2.9,Petal_Length:4.7, Petal_Width:1.2,Species:"versicolor"},
				{Sepal_Length:6.5, Sepal_Width:2.8,Petal_Length:4.6, Petal_Width:1.3,Species:"versicolor"}];
				
				alert(dataset);*/
				
			//important refesh chart	
      d3.select("svg").remove();
      
      // set the dimensions and margins of the graph
			var margin = {top: 10, right: 30, bottom: 30, left: 60},
			    width = 560 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;
			
			// append the svg object to the body of the page
			var svg = d3.select("#my_dataviz")
			  .append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");
			          
			x_height = height - 15;
			// Add X axis
			 var x = d3.scaleLinear()
			    .domain([-10, 80])
			    .range([ -10, width ]);
			  svg.append("g")
			    .attr("transform", "translate(0," + x_height + ")")
			    .call(d3.axisBottom(x));
			
			console.log(1);
			
			  // Add Y axis
			  var y = d3.scaleLinear()
			    .domain([-10, 80])
			    .range([ height, -10]);
			  svg.append("g")
			    .call(d3.axisLeft(y));
			
			  // Color scale: give me a specie name, I return a color
			  var color = d3.scaleOrdinal()
			    .domain(["placebo", "secukinumab" ])
			    .range([ "#440154ff", "#21908dff"])
			
			var tooltip = d3.select("#my_dataviz")
			    .append("div")
			    .style("opacity", 0)
			    .attr("class", "tooltip")
			    .style("background-color", "white")
			    .style("border", "solid")
			    .style("border-width", "1px")
			    .style("border-radius", "5px")
			    .style("padding", "10px");
			    
			var mouseover = function(d) {
			    tooltip
			      .style("opacity", 1)
			 };
			
			  var mousemove = function(d) {
			    tooltip
			      .html("x:")
			      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
			      .style("top", (d3.mouse(this)[1]) + "px")
			  };
			
			  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
			  var mouseleave = function(d) {
			    tooltip
			      .transition()
			      .duration(200)
			      .style("opacity", 0)
			  };
			
			
			  // Add dots
			  svg.append('g')
			    .selectAll("dot")
			    .data(dataset)
			    .enter()
			    .append("circle")
			      .attr("cx", function (d) { return x(d.xcol); } )
			      .attr("cy", function (d) { return y(d.ycol); } )
			      .attr("r", 5)
			      .style("fill", function (d) { return color(d.gcolor) } )
			      .on("mouseover", mouseover )
				  .on("mousemove", mousemove )
				  .on("mouseleave", mouseleave );
        }
    );
    
  //#################################
  /*  var dataset = [{Sepal_Length:5.1, Sepal_Width:3.5,Petal_Length:1.4, Petal_Width:0.2,Species:"setosa"},
				{Sepal_Length:6.1, Sepal_Width:2.9,Petal_Length:4.7, Petal_Width:1.2,Species:"versicolor"},
				{Sepal_Length:6.5, Sepal_Width:2.8,Petal_Length:4.6, Petal_Width:1.3,Species:"versicolor"}];
				
				
			// set the dimensions and margins of the graph
			var margin = {top: 10, right: 30, bottom: 30, left: 60},
			    width = 460 - margin.left - margin.right,
			    height = 400 - margin.top - margin.bottom;
			
			// append the svg object to the body of the page
			var svg = d3.select("#my_dataviz")
			  .append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");
			          
			
			// Add X axis
			 var x = d3.scaleLinear()
			    .domain([4, 8])
			    .range([ 0, width ]);
			  svg.append("g")
			    .attr("transform", "translate(0," + height + ")")
			    .call(d3.axisBottom(x));
			
			console.log(1);
			
			  // Add Y axis
			  var y = d3.scaleLinear()
			    .domain([0, 9])
			    .range([ height, 0]);
			  svg.append("g")
			    .call(d3.axisLeft(y));
			
			  // Color scale: give me a specie name, I return a color
			  var color = d3.scaleOrdinal()
			    .domain(["setosa", "versicolor" ])
			    .range([ "#440154ff", "#21908dff"])
			
			var tooltip = d3.select("#my_dataviz")
			    .append("div")
			    .style("opacity", 0)
			    .attr("class", "tooltip")
			    .style("background-color", "white")
			    .style("border", "solid")
			    .style("border-width", "1px")
			    .style("border-radius", "5px")
			    .style("padding", "10px");
			    
			var mouseover = function(d) {
			    tooltip
			      .style("opacity", 1)
			 };
			
			  var mousemove = function(d) {
			    tooltip
			      .html("x:")
			      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
			      .style("top", (d3.mouse(this)[1]) + "px")
			  };
			
			  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
			  var mouseleave = function(d) {
			    tooltip
			      .transition()
			      .duration(200)
			      .style("opacity", 0)
			  };
			
			
			  // Add dots
			  svg.append('g')
			    .selectAll("dot")
			    .data(dataset)
			    .enter()
			    .append("circle")
			      .attr("cx", function (d) { return x(d.Sepal_Length); } )
			      .attr("cy", function (d) { return y(d.Petal_Length); } )
			      .attr("r", 5)
			      .style("fill", function (d) { return color(d.Species) } )
			      .on("mouseover", mouseover )
				  .on("mousemove", mousemove )
				  .on("mouseleave", mouseleave );
*/
});