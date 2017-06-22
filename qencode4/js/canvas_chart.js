document.addEventListener('DOMContentLoaded', function () {
    console.log('Canvas Chart loaded with JavaScript');

    // see https://canvasjs.com/docs/charts/chart-types/html5-area-chart/

CanvasJS.addColorSet('greenShades',
     [//colorSet Array
     '#8fdb80', //green
     '#98c4ed'  //blue
    ]);     

    var chart = new CanvasJS.Chart("chartContainer",
    {

        toolTip: {
          animationEnabled: false,
			    content: "{x} <br> <strong>{name}</strong> min <br>  <strong>{label}: $ {y}</strong>",
          cornerRadius:0,
          fontFamily: "'Lato', sans-serif, sans-serif",
          fontStyle:"normal",
          fontColor: "#73767d",
          borderThickness:0,
          shared: false  //disable here. 
        },      

        colorSet: "greenShades",


      axisY:{
        // ideally we can get max from data and set 'maximum' + 25 to look like in design
        // maximum: 125,
        tickThickness:1,
        gridThickness: 1,
        lineThickness:0,
        interval:25,
      //  title: "axisY Title",
      //  interlacedColor: "#F8F1E4",
        tickLength: 0
      },

      axisX:{
        lineThickness:0,
        
        // use this to get month number as show relevant month in uppercase
        labelFormatter: function(e){
          var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
              "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
          ];
          return  monthNames[e.value.getMonth()];
        },        

        // this will automaticall format date to show it as month -> APR
        // valueFormatString: "MMM" ,

        interval: 1,
        intervalType: "month",
        tickLength: 4
      },

      data: [
      { 
        label: "SD",
        indexLabelFontColor: "green",
        type: "area",
        fillOpacity: .3,
        lineThickness: 3,
        lineColor: "#49c332",
        markerBorderColor:"#49c332",
        markerBorderThickness:4,
        markerColor: "white",
        markerType: "none",
        markerSize:6,
        mouseover: onMouseover,
        dataPoints: [//array

        { x: new Date(2016, 00, 1), y: 22.04, name: "10023" },
        { x: new Date(2016, 00, 26), y: 40.34, name: "10023" },
        { x: new Date(2016, 01, 15), y: 65.00, name: "10023" },
        { x: new Date(2016, 02, 3), y: 58.78, name: "10023" },
        { x: new Date(2016, 03, 17), y: 40.03, name: "10023" },
        { x: new Date(2016, 04, 20), y: 35.12, name: "10023" },
        { x: new Date(2016, 05, 12), y: 45.97, name: "10023"},
        { x: new Date(2016, 06, 18), y: 57.22, name: "10023" },
        { x: new Date(2016, 07, 5), y: 68.55, name: "10023" },
        { x: new Date(2016, 07, 26), y: 60.72, name: "10023" },
        { x: new Date(2016, 08, 13), y: 63.22, name: "10023"},
        { x: new Date(2016, 09, 1), y: 61.12, name: "10023"},
        { x: new Date(2016, 09, 14), y: 53.86, name: "10023"},
        { x: new Date(2016, 09, 28), y: 48.12, name: "10023"},
        { x: new Date(2016, 11, 1), y: 35.34, name: "10023"}
        ]
      },

      {
        label: "UHD",
        indexLabelFontColor: "blue",
        type: "area",
        lineColor: "#1a74d4",
        markerBorderColor:"#1a74d4",
        markerBorderThickness:4,
        markerColor: "white",
        lineThickness: 3,
        markerType: "none",
        markerSize:6,
        mouseover: onMouseover,
        dataPoints: [//array

        { x: new Date(2016, 00, 1), y: 14.33, name: "34023"},
        { x: new Date(2016, 00, 22), y: 20.21, name: "10023" },
        { x: new Date(2016, 01, 5), y: 50.11, name: "3023" },
        { x: new Date(2016, 02, 1), y: 40.75, name: "10023" },
        { x: new Date(2016, 02, 13), y: 43.34, name: "10023" },
        { x: new Date(2016, 03, 3), y: 51.44, name: "10023" },
        { x: new Date(2016, 05, 12), y: 20.90, name: "10023"},
        { x: new Date(2016, 06, 18), y: 30.22, name: "10023" },
        { x: new Date(2016, 06, 25), y: 38.45, name: "10023" },
        { x: new Date(2016, 07, 12), y: 59.65, name: "10023"},
        { x: new Date(2016, 08, 3), y: 64.21, name: "10023"},
        { x: new Date(2016, 08, 24), y: 57.64, name: "10023"},
        { x: new Date(2016, 09, 4), y: 47.43, name: "10023"},
        { x: new Date(2016, 09, 19), y: 36.22, name: "10023"},
        { x: new Date(2016, 10, 5), y: 34.78, name: "32023"},
        { x: new Date(2016, 11, 1), y: 44.77, name: "34023"}
        ]
      }

      ]
    });    

    chart.render();

    function onMouseover(e){
        e.dataPoint.markerType = "circle";
    }    

});

