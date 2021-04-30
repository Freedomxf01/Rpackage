HTMLWidgets.widget({

  name: 'E3Scatter',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

       var ycols = x.data.cols;

       var chart = c3.generate({
				bindto: el,
			  data: {
			    //json: [
			      //{name: 'www.site1.com', xcol: 200, ycol: 200, total: 400},
			      //{name: 'www.site2.com', xcol: 100, ycol: 300, total: 400},
			      //{name: 'www.site3.com', xcol: 300, ycol: 200, total: 500},
			      //{name: 'www.site4.com', xcol: 400, ycol: 100, total: 500}
			    //]
			    json: x.data.data,
			    keys: {
			       x: 'xcol', // it's possible to specify 'x' when category axis
			      value: ycols
			    },

			    type: 'scatter'
			  },
			  axis: {
			    x: {
			       type: 'indexed'
			    }
			  },
			  zoom: {
          enabled: true
        },
        size: {
				  height: 640
			  }
			});

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
