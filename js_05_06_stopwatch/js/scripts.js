var initialTimestamp = Date.now();

var timecounter = document.querySelector('.timecounter');

var milliseconds = document.querySelector('.milliseconds');
var seconds = document.querySelector('.seconds');
var minutes = document.querySelector('.minutes');
var hours = document.querySelector('.hours');

function updateStopwatch() {

    //var currentTimestamp = Date.now() + 199937654; // here we add time

    var currentTimestamp = Date.now();

    timecounter.innerHTML = currentTimestamp - initialTimestamp;

    milliseconds.innerHTML = (currentTimestamp - initialTimestamp) % 1000;

    var stopwatchSeconds = Math.floor((currentTimestamp - initialTimestamp) / 1000);
    if (stopwatchSeconds > 59) {
        stopwatchSeconds = stopwatchSeconds % 60;
    }
    seconds.innerHTML = stopwatchSeconds;

    var stopwatchMinutes = Math.floor((currentTimestamp - initialTimestamp) / 1000 / 60);
    if (stopwatchMinutes > 59) {
        stopwatchMinutes = stopwatchMinutes % 60;
    }
    minutes.innerHTML = stopwatchMinutes;

    var stopwatchHours = Math.floor((currentTimestamp - initialTimestamp) / 1000 / 60 / 60);
    if (stopwatchHours > 59) {
        stopwatchHours = stopwatchHours % 60;
    }
    hours.innerHTML = stopwatchHours;
}

setInterval(updateStopwatch, 1);
