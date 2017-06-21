document.addEventListener('DOMContentLoaded', function () {
    console.log('Chart loaded with JavaScript');

 
    // use d3 js <script src="https://d3js.org/d3.v4.min.js"></script>

    
    // using ChartJS 2 - http://www.chartjs.org/docs/latest/

    var chartDataSD = [
        { date: 'Feb 1, 2016', bill: 32.4, minutes: 34.43},
        { date: 'Feb 13, 2016', bill: 4.4, minutes: 10.12},
    ];

    var ctx = document.getElementById("chart").getContext('2d');

    /*** Gradient ***/
    var gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, 'rgba(80,197,57,1)');   
        gradientGreen.addColorStop(1, 'rgba(80,197,57,0)');

    // background: linear-gradient(to right, rgba(94,235,115,1) 0%, rgba(255,255,255,1) 31%, rgba(255,255,255,1) 100%);

    var gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
        gradientBlue.addColorStop(0, 'rgba(27,118,209,1)');   
        gradientBlue.addColorStop(1, 'rgba(27,118,209,0)');        
    /***************/

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: [new Date(2012, 00, 1),new Date(2012, 01, 1),new Date(2012, 02, 1),new Date(2012, 03, 1),new Date(2012, 04, 1),new Date(2012, 05, 1),new Date(2012, 06, 1),new Date(2012, 07, 1),new Date(2012, 08, 1),new Date(2012, 09, 1),new Date(2012, 10, 1),new Date(2012, 11, 1)], 
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],                       
            datasets: [{
                label: 'SD',
                data: [56, 46, 75, 65, 53, 48, 52, 42, 71, 52, 38, 46],
                backgroundColor: gradientGreen,
                borderColor: [
                    '#49c330'
                ],
                borderWidth: 2,
                lineTension: 0
            },
            {
                label: 'UHD',
                data: [13, 19, 11, 18, 10, 15, 15, 21, 13, 19, 13, 22],
                backgroundColor: gradientBlue,
                borderColor: [
                    '#1b79d1'
                ],
                borderWidth: 2,
                lineTension: 0
            }]
        },
        options: {
            scales: {              

                xAxes: [{
                    gridLines: {
                    drawOnChartArea: false
                    }
                }

                // to display only months from data http://jsfiddle.net/prfd1m8q/

                // ,
                // {
                //     type: "time",
                //     display: true,
                //     scaleLabel: {
                //         display: true,
                //         labelString: 'Date'
                //     }
                // }                
                ],

                yAxes: [{
                    ticks: {
                        // beginAtZero:true,
                        suggestedMax : 120,
                        // max : 125,    
                        min : 0                        
                    }
                }]            

            }
        }
    });


    // it is possible to have charts with multiple x and y axes. The sample config below will 
    // create 2 x axes, 2 y axes and then bind each dataset to one pair of axes.
    // see https://github.com/chartjs/Chart.js/issues/1544

    // var config = {
    //     data: {
    //         datasets: [{
    //             label: "My First dataset",
    //             xAxisID: "x-axis-1", // bottom axis
    //             yAxisID: "y-axis-1", // left axis
    //         data: []
    //         }, {
    //             label: "My Second dataset",
    //             xAxisID: "x-axis-2", // top axis
    //             yAxisID: "y-axis-2", // right axis
    //             data: []
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             xAxes: [{
    //                 position: "bottom",
    //                 type: "time", // gives us a date axis
    //                 id: "x-axis-1"
    //             }, {
    //                 position: "top",
    //                 type: "time",
    //                 id: "x-axis-2"
    //             }],
    //             yAxes: [{
    //                 type: "linear",
    //                 position: "left",
    //                 id: "y-axis-1",
    //             }, {
    //                 type: "linear",
    //                 position: "right",
    //                 id: "y-axis-2",
    //             }],
    //         }
    //     }
    // }    




    // based on old version - <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script>

    // var ctx = document.getElementById("chart").getContext("2d"); 

    // /*** Gradient ***/
    // var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    //     gradient.addColorStop(0, 'rgba(250,174,50,1)');   
    //     gradient.addColorStop(1, 'rgba(250,174,50,0)');
    // /***************/

    // var data = {
    //         labels : ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
    //         datasets: [
    //             {
    //                 fillColor : gradient, // Put the gradient here as a fill color
    //                 strokeColor : "#ff6c23",
    //                 pointColor : "#fff",
    //                 pointStrokeColor : "#ff6c23",
    //                 pointHighlightFill: "#fff",
    //                 pointHighlightStroke: "#ff6c23",
    //                 data : [10.0,18.4,50.2,40.4,42.2,55.0,57.2,48.1,45.0,41.4,49.1,0.0,12.3,43.4]
    //             }
    //         ]
    // };

    // var options = {
    //     responsive: true,      
    //     datasetStrokeWidth : 3,
    //     pointDotStrokeWidth : 4,
    //     tooltipFillColor: "rgba(0,0,0,0.8)",
    //     tooltipFontStyle: "bold",
    //     tooltipTemplate: "<%if (label){%><%= label %>: <%}%><%= '$ ' + value %>",
    //     scaleLabel : "<%= Number(value).toFixed(0).replace('.', ',') %>"
    // };

        


    // var myLineChart = new Chart(ctx).Line(data, options);    

});

