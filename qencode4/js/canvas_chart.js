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
			    content: "{x} <br> <strong>{label}</strong> min <br>  <strong>{name}: $ {y}</strong>",
          cornerRadius:0,
          fontFamily: "'Lato', sans-serif, sans-serif",
          fontStyle:"normal",
          fontColor: "#73767d",
          borderThickness:0,
          shared: false  //disable here. 
        },      

        colorSet: "greenShades",
    //   title: {
    //     text: "Monthly Downloads",
    //     fontSize: 25
    //   },

      axisY:{
        maximum: 125,
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
        valueFormatString: "MMM" ,
        interval: 1,
        intervalType: "month"

      },
    //   axisY: {
    //     title: "Downloads"
    //   },

      data: [
      { 
        name: "SD",
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

        { x: new Date(2016, 00, 1), y: 22.04, label: "10023" },
        { x: new Date(2016, 00, 26), y: 40.34, label: "10023" },
        { x: new Date(2016, 01, 15), y: 65.00, label: "10023" },
        { x: new Date(2016, 02, 3), y: 58.78, label: "10023" },
        { x: new Date(2016, 03, 17), y: 40.03, label: "10023" },
        { x: new Date(2016, 04, 20), y: 35.12, label: "10023" },
        { x: new Date(2016, 05, 12), y: 45.97, label: "10023"},
        { x: new Date(2016, 06, 18), y: 57.22, label: "10023" },
        { x: new Date(2016, 07, 5), y: 68.55, label: "10023" },
        { x: new Date(2016, 07, 26), y: 60.72, label: "10023" },
        { x: new Date(2016, 08, 13), y: 63.22, label: "10023"},
        { x: new Date(2016, 09, 1), y: 61.12, label: "10023"},
        { x: new Date(2016, 09, 14), y: 53.86, label: "10023"},
        { x: new Date(2016, 09, 28), y: 48.12, label: "10023"},
        { x: new Date(2016, 11, 1), y: 35.34, label: "10023"}
        ]
      },

      {
        name: "UHD",
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

        { x: new Date(2016, 00, 1), y: 14.33, label: "34023"},
        { x: new Date(2016, 00, 22), y: 20.21, label: "10023" },
        { x: new Date(2016, 01, 5), y: 50.11, label: "3023" },
        { x: new Date(2016, 02, 1), y: 40.75, label: "10023" },
        { x: new Date(2016, 02, 13), y: 43.34, label: "10023" },
        { x: new Date(2016, 03, 3), y: 51.44, label: "10023" },
        { x: new Date(2016, 05, 12), y: 20.90, label: "10023"},
        { x: new Date(2016, 06, 18), y: 30.22, label: "10023" },
        { x: new Date(2016, 06, 25), y: 38.45, label: "10023" },
        { x: new Date(2016, 07, 12), y: 59.65, label: "10023"},
        { x: new Date(2016, 08, 3), y: 64.21, label: "10023"},
        { x: new Date(2016, 08, 24), y: 57.64, label: "10023"},
        { x: new Date(2016, 09, 4), y: 47.43, label: "10023"},
        { x: new Date(2016, 09, 19), y: 36.22, label: "10023"},
        { x: new Date(2016, 10, 5), y: 34.78, label: "32023"},
        { x: new Date(2016, 11, 1), y: 44.77, label: "34023"}
        ]
      }

      ]
    });    

    // var chart = new CanvasJS.Chart("chartContainer",
    // {
    //   title:{
    //   text: "Multi-Series Line Chart"  
    //   },
    //   data: [
    //   {        
    //     type: "line",
    //     dataPoints: [
    //     { x: 10, y: 21 },
    //     { x: 20, y: 25},
    //     { x: 30, y: 20 },
    //     { x: 40, y: 25 },
    //     { x: 50, y: 27 },
    //     { x: 60, y: 28 },
    //     { x: 70, y: 28 },
    //     { x: 80, y: 24 },
    //     { x: 90, y: 26}
      
    //     ]
    //   },
    //     {        
    //     type: "line",
    //     dataPoints: [
    //     { x: 10, y: 31 },
    //     { x: 25, y: 35},
    //     { x: 33, y: 30 },
    //     { x: 40, y: 35 },
    //     { x: 50, y: 35 },
    //     { x: 60, y: 38 },
    //     { x: 70, y: 38 },
    //     { x: 80, y: 34 },
    //     { x: 90, y: 44}
      
    //     ]
    //   },
    //     {        
    //     type: "line",
    //     dataPoints: [
    //     { x: 10, y: 45 },
    //     { x: 20, y: 50},
    //     { x: 30, y: 40 },
    //     { x: 40, y: 45 },
    //     { x: 50, y: 45 },
    //     { x: 60, y: 48 },
    //     { x: 70, y: 43 },
    //     { x: 80, y: 41 },
    //     { x: 90, y: 28}
      
    //     ]
    //   },
    //     {        
    //     type: "line",
    //     dataPoints: [
    //     { x: 10, y: 71 },
    //     { x: 20, y: 55},
    //     { x: 30, y: 50 },
    //     { x: 40, y: 65 },
    //     { x: 50, y: 95 },
    //     { x: 60, y: 68 },
    //     { x: 70, y: 28 },
    //     { x: 80, y: 34 },
    //     { x: 90, y: 14}
      
    //     ]
    //   }
    //   ]
    // });

    chart.render();

    function onMouseover(e){
        e.dataPoint.markerType = "circle";
    }    

});

