// Execute function body when the HTML document is ready
$(document).ready(function() {
    
    Shiny.addCustomMessageHandler("scatterHandler", function(dataset) {
      
      var colorGroup = [];
      var i;
      for(i = 0; i < dataset.length; i++){
        colorGroup[i] = dataset[i].gcolor;
      }
      
      //array: get unique value of color group variable 
      var gcolor = d3.set(colorGroup).values();
      
      //array: store corresponding color codelist 
      var colorg = [];
      
      for(i = 0; i < gcolor.length; i++){
        colorg[i] = '#'+Math.floor(Math.random()*0xffffff).toString(16);
      }
         
			//important refesh chart	
      d3.select("svg").remove();
      
      // set the dimensions and margins of the graph
			var margin = {top: 30, right: 30, bottom: 30, left: 60},
			    width = 700 - margin.left - margin.right,
			    height = 600 - margin.top - margin.bottom;
			
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
/*			 var x = d3.scaleLinear()
			    .domain([-10, 100])
			    .range([ -10, width ]);
*/
			 
			//initial x axis
			 var x = d3.scaleLinear()
			    .domain([0, 0])
			    .range([ 0, width ]);
			  svg.append("g")
			    .attr("class", "myXaxis")// Note that here we give a class to the X axis, to be able to call it later and modify it
			    .attr("transform", "translate(0," + x_height + ")")
			    .call(d3.axisBottom(x))
			    .attr("opacity", "0");
			
			
			  // Add Y axis
			  var y = d3.scaleLinear()
			    .domain([-10, 100])
			    .range([ height, -10]);
			  svg.append("g")
			    .call(d3.axisLeft(y));
			
			  // Color scale: give me a specie name, I return a color
			  var color = d3.scaleOrdinal()
			    .domain(gcolor)
			    .range(colorg);
			
			//add tooltip
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
			      .style("opacity", 1);
			 };
			
			  var mousemove = function(d) {
			    tooltip
			      .html("x: " + d.xcol + '<br/>' + 'y: ' + d.ycol)
			      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
			      .style("top", (d3.mouse(this)[1]) + "px");
			  };
			
			  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
			 var mouseleave = function(d) {
			    tooltip
			      .transition()
			      .duration(200)
			      .style("opacity", 0);
			  };
			
			
			  // Add dots, initial plot
			  svg.append('g')
			    .selectAll("dot")
			    .data(dataset)
			    .enter()
			    .append("circle")
			      .attr("cx", function (d) { return x(d.xcol); } )
			      .attr("cy", function (d) { return y(d.ycol); } )
			      .attr("r", 4)
			      .style("fill", function (d) { return color(d.gcolor) } )
			      //.on("mouseover", mouseover )
				  .on("mousemove", mousemove )
				  //.on("mouseleave", mouseleave );

			   //set axis range and scale 
			   x.domain([-10, 100])
			    .range([ -10, width ]);
			
			//dynamically create x-axis    
      svg.select(".myXaxis")
        .transition()
        .duration(1000)
        .attr("opacity", "1")
        .call(d3.axisBottom(x));   
        
        //dynamically create plot  
        var myCircle = svg.selectAll("circle")
          .transition()
          .delay(function(d,i){return(i*2)})
          .duration(1000)
          .attr("cx", function (d) { return x(d.xcol); } )
		      .attr("cy", function (d) { return y(d.ycol); } )
		      .attr("r", 4)
		      .style("fill", function (d) { return color(d.gcolor) } )
		      .style("opacity", 0.5)
		      .on("mouseover", mouseover )
				  .on("mousemove", mousemove )
				  .on("mouseleave", mouseleave );
				  
				  
				  // Add brushing
        svg.call( d3.brush()                    // Add the brush feature using the d3.brush function
           .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
           .on("start brush", updateChart)      // Each time the brush selection changes, trigger the 'updateChart' function
        );
        
        console.log(123);
        
        // Function that is triggered when brushing is performed
        function updateChart() {
          extent = d3.event.selection;
          myCircle.classed("selected", function(d){ return isBrushed(extent, x(d.xcol), y(d.ycol) ) } );
        }
      
        // A function that return TRUE or FALSE according if a dot is in the selection or not
        function isBrushed(brush_coords, cx, cy) {
             var x0 = brush_coords[0][0],
                 x1 = brush_coords[1][0],
                 y0 = brush_coords[0][1],
                 y1 = brush_coords[1][1];
            return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
        }

			    
				
    });
    
});