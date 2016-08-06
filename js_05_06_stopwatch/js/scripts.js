var initialTimestamp = Date.now();

var timeCounted = 0;

var currentTimestamp;

var timecounter = document.querySelector('.timecounter');

var milliseconds = document.querySelector('.milliseconds');
var seconds = document.querySelector('.seconds');
var minutes = document.querySelector('.minutes');
var hours = document.querySelector('.hours');

function updateStopwatch() {

    currentTimestamp = Date.now() + timeCounted;

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

var startButton = document.querySelector('.buttons__start');
var stopButton; // this button doesn't exist untill we press start button

var intervalPointer;

function startStopwatch() {
    initialTimestamp = Date.now(); // get current timestamp
    intervalPointer = setInterval(updateStopwatch, 1); // start updating time

    // change srat button to stop button
    startButton.classList.remove('buttons__start');
    startButton.classList.add('buttons__stop');
    startButton.innerHTML = 'Stop';
    stopButton = document.querySelector('.buttons__stop');

    startButton.removeEventListener('click', startStopwatch);
    stopButton.addEventListener('click', stopStopwatch);
}

function stopStopwatch() {
    clearInterval(intervalPointer); // stops repeating function

    // we must save current time that was already counted
    timeCounted = currentTimestamp - initialTimestamp;

    stopButton.classList.remove('buttons__stop');
    stopButton.classList.add('buttons__start');
    stopButton.innerHTML = 'Start';
    startButton = document.querySelector('.buttons__start');

    stopButton.removeEventListener('click', stopStopwatch);
    startButton.addEventListener('click', startStopwatch);
}

startButton.addEventListener('click', startStopwatch);

var resetButton = document.querySelector('.button__reset');

function resetStopwatch() {
    // here we must stop the function
    clearInterval(intervalPointer); // stops repeating function
    // zero all numbers
    timeCounted = 0;
    initialTimestamp = Date.now();
    updateStopwatch();

    // if button is STOP we must change it to START
    if (startButton.innerHTML === 'Stop') {

        stopButton.classList.remove('buttons__stop');
        stopButton.classList.add('buttons__start');
        stopButton.innerHTML = 'Start';
        startButton = document.querySelector('.buttons__start');

        stopButton.removeEventListener('click', stopStopwatch);
        startButton.addEventListener('click', startStopwatch);
    }
}

resetButton.addEventListener('click', resetStopwatch);
