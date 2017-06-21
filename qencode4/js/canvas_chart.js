document.addEventListener('DOMContentLoaded', function () {
    console.log('Canvas Chart loaded with JavaScript');

    // see https://canvasjs.com/docs/charts/chart-types/html5-area-chart/

CanvasJS.addColorSet('greenShades',
     [//colorSet Array
     'green',
     'blue'
    ]);     

    var chart = new CanvasJS.Chart("chartContainer",
    {

        colorSet: "greenShades",
    //   title: {
    //     text: "Monthly Downloads",
    //     fontSize: 25
    //   },
      axisX:{
        valueFormatString: "MMM" ,
        interval: 1,
        intervalType: "month"

      },
    //   axisY: {
    //     title: "Downloads"
    //   },

      data: [
      {
        indexLabelFontColor: "green",
        type: "area",
        dataPoints: [//array

        { x: new Date(2012, 00, 1), y: 26},
        { x: new Date(2012, 01, 1), y: 38 },
        { x: new Date(2012, 02, 1), y: 43 },
        { x: new Date(2012, 03, 1), y: 29 },
        { x: new Date(2012, 04, 1), y: 41 },
        { x: new Date(2012, 05, 1), y: 45 },
        { x: new Date(2012, 06, 1), y: 86},
        { x: new Date(2012, 07, 1), y: 64 },
        { x: new Date(2012, 08, 1), y: 53 },
        { x: new Date(2012, 09, 1), y: 60}
        ]
      },

      {
        indexLabelFontColor: "blue",
        type: "area",
        dataPoints: [//array

        { x: new Date(2012, 00, 1), y: 16},
        { x: new Date(2012, 02, 13), y: 28 },
        { x: new Date(2012, 02, 18), y: 33 },
        { x: new Date(2012, 02, 30), y: 19 },
        { x: new Date(2012, 04, 1), y: 21 },
        // { x: new Date(2012, 05, 1), y: 5500 },
        { x: new Date(2012, 07, 1), y: 96},
        { x: new Date(2012, 07, 15), y: 24 },
        { x: new Date(2012, 08, 4), y: 13 },
        { x: new Date(2012, 09, 1), y: 70}
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

});

