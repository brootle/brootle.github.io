
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var initialTime;

    var timerValueInMilleseconds;

    // active view can be session or break
    // when timer is on, we can't change session or break

    // when timer is on pause
    // we can change value of session or timer
    // and we also should change view if it's same type as controller that we change

    // if timer is on we can't change anything

    // when we click active view we can pause or start timer

    // get all elements with 'operation' class
    const keys = document.querySelectorAll('.operation');
    // add click event to catch the button click
    keys.forEach(key => key.addEventListener('click', changeTimerLength));

    // add event listeners on timer titles
    const timerTitlesButtons = document.querySelectorAll(`.controller-title`);
    //console.log(timerTitlesButtons);
    timerTitlesButtons.forEach(timerTitleButton => timerTitleButton.addEventListener('click', resetTimers));

    function resetTimers(e){
      // get the value for new timer if button was clicked
      const controller = e.currentTarget.getAttribute("data-controller");
      console.log(controller);    

      // set timer to pause and to break or session
      // reset the time in the timer

      clearInterval(intervalPointer); // stops repeating function - pause

      const timerElement = document.querySelector(`.pomodoro-timer span`);
      console.log(timerElement);

      const timerController = document.querySelector(`.controller-timer[data-timer="${controller}"]`);
      console.log(timerController);

      timerElement.setAttribute("data-timer-status", "paused");
      timerElement.setAttribute("data-active-timer", controller);
      timerElement.setAttribute("data-value", timerController.getAttribute("data-value"));
      timerElement.textContent = timerController.textContent;


      // update backgroundColor of main timer
      const pomodoroTimer = document.querySelector(`.pomodoro-timer`);
      console.log(pomodoroTimer);

      const styleToRemove = (controller === "break") ? "session" : "break" ;
      console.log(styleToRemove);

      pomodoroTimer.classList.remove(`selected-${styleToRemove}`);

      pomodoroTimer.className += ` selected-${controller}`;      

      // pomodoroTimer.classList.remove(`selected-${selectedController}`);

      // pomodoroTimer.className += ` selected-${controller}`;      

    }

    function changeTimerLength(e){

      const controller = e.currentTarget.getAttribute("data-controller");
      const operation = e.currentTarget.getAttribute("data-operation");
      const timerElement = document.querySelector(`.controller-timer[data-timer="${controller}"]`);
      const timerStatus = document.querySelector(`.pomodoro-timer span`).getAttribute("data-timer-status");

      const activeTimer = document.querySelector(`.pomodoro-timer span`).getAttribute("data-active-timer");

      // console.log(activeTimer);
      // console.log(timerStatus);

      if(timerStatus === "paused"){

        if(operation === "increment"){
          timerElement.textContent++;
          //console.log(timerElement);
          // and also must update data-value in milliseconds
        }

        if(operation === "decrement" && timerElement.textContent !== "1"){
          timerElement.textContent--;
          // and also must update data-value in milliseconds
        }     

        timerElement.setAttribute("data-value",timerElement.textContent * 60 * 1000);

        // we must also allow to change value in main timer if it match current session
        if(activeTimer === timerElement.getAttribute("data-timer")){
          //console.log("change main timer");
          document.querySelector(`.pomodoro-timer span`).textContent = timerElement.textContent;
          document.querySelector(`.pomodoro-timer span`).setAttribute("data-value",timerElement.textContent * 60 * 1000);
        }

      }

      // console.log(timerElement);

      // console.log(`${controller} : ${operation}`);

    }

    // get all element with 'pomodoro-timer' class
    const timer = document.querySelector('.pomodoro-timer');
    // add click event to catch the button click
    timer.addEventListener('click', changeTimerStatus);

    function changeTimerStatus(){

      const timerStatusElement = document.querySelector(`.pomodoro-timer span`);
      const currentTimerStatus = timerStatusElement.getAttribute("data-timer-status");

      if(currentTimerStatus === "paused"){
        timerStatusElement.setAttribute("data-timer-status", "running");

        // here we must trigger timer countdown
        initialTime = Date.now();
        intervalPointer = setInterval(updateStopwatch, 100); // start updating timer every 1/10 of second     

      }

      if(currentTimerStatus === "running"){
        timerStatusElement.setAttribute("data-timer-status", "paused");

        // here we must stop timer countdown
        clearInterval(intervalPointer); // stops repeating function - pause

        // here we should also get time from timer, convert it to milliseconds
        // console.log(timerValueInMilleseconds);
        // and put that time to "data-value" so we know where we paused
        timerStatusElement.setAttribute("data-value",timerValueInMilleseconds);
      }      

      //console.log(timerStatusElement); 
     
    }

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    var intervalPointer;

    var beepedCounter = 9;

    function updateStopwatch(){

        // here we must start counting down current active counter
        // get the value of the timer
        // 1:09:57

        // we must write data-value="25" in milliseconds!!!

        var currentTime = Date.now(); // we get current time every second

        var timePassed = currentTime - initialTime; // calculate how much time passed

        // there must be value in minutes in the session timer now
        // get that value and convert it to milliseconds
        const timerStatusElement = document.querySelector(`.pomodoro-timer span`);

        // get new timer value in milliseconds

        const timerMs = timerStatusElement.getAttribute("data-value") - timePassed;

        // save the value we put in timer to global variable;
        timerValueInMilleseconds = timerMs;

        if(timerValueInMilleseconds < 100){

          const audio = document.querySelector(`audio[data-sound="timer"`);
          audio.currentTime = 0; // rewind audio to the start
          audio.play();  

          swapActiveTimer()
        }        

        // we must update "data-value" in milliseconds
        // timerStatusElement.setAttribute("data-value",timerMs);


        // now we must convert timerMs to seconds, minutes, hours
        // update value in the timer in format hh:mm:ss

        var stopwatchSeconds = Math.floor(timerMs / 1000);
        if (stopwatchSeconds > 59) {
            stopwatchSeconds = stopwatchSeconds % 60;
        }

        // here we must also add "0" if 09
        if(stopwatchSeconds < 10){
          stopwatchSeconds = "0" + stopwatchSeconds;
        }        

        var stopwatchMinutes = Math.floor(timerMs / 1000 / 60);
        if (stopwatchMinutes > 59) {
            stopwatchMinutes = stopwatchMinutes % 60;
        }

        // here we must also add "0" if 09
        if(stopwatchMinutes < 10){
          stopwatchMinutes = "0" + stopwatchMinutes;
        }           

        var stopwatchHours = Math.floor(timerMs / 1000 / 60 / 60);
        if (stopwatchHours > 59) {
            stopwatchHours = stopwatchHours % 60;
        }    

        // put time in timer value
        if(stopwatchHours > 0){
          timerStatusElement.textContent=`${stopwatchHours}:${stopwatchMinutes}:${stopwatchSeconds}`;
        }else{
          timerStatusElement.textContent=`${stopwatchMinutes}:${stopwatchSeconds}`;
        }
        

    }

    function swapActiveTimer(e){

    // <div class="pomodoro-timer">
    //     <h3>Session</h3>
    //     <span data-active-timer="session" data-timer-status="paused" data-value="1500000">25</span>
    // </div>    

      console.log("switch active timer");

      // 1. If active timer = 'session', swith to 'break'

      // we must reset initial time
      initialTime = Date.now();

      const timerElement = document.querySelector(`.pomodoro-timer span`);
      const activeTimer = timerElement.getAttribute("data-active-timer");

      //console.log(activeTimer);

      if(activeTimer === "session"){
        timerElement.setAttribute("data-active-timer", "break");

        const controllerTimer = document.querySelector(`.controller-timer[data-timer="break"]`);

        timerElement.setAttribute("data-value",controllerTimer.getAttribute("data-value"));
      }

      if(activeTimer === "break"){
        timerElement.setAttribute("data-active-timer", "session");

        const controllerTimer = document.querySelector(`.controller-timer[data-timer="session"]`);

        timerElement.setAttribute("data-value",controllerTimer.getAttribute("data-value"));
      }      

      //const timerTitle = document.querySelector(`.pomodoro-timer h3`);
      //timerTitle.textContent = timerElement.getAttribute("data-active-timer");

      const selectedController = timerElement.getAttribute("data-active-timer"); // session or break
      //const selectedBackgroundColor = document.querySelector(`.selected-${selectedController}`).style.backgroundColor;

      const pomodoroTimer = document.querySelector(`.pomodoro-timer`);
      //pomodoroTimer.style.backgroundColor = selectedBackgroundColor;

      // just add 'selected-selectedController' class to pomodoroTimer

      pomodoroTimer.classList.remove(`selected-${activeTimer}`);

      pomodoroTimer.className += ` selected-${selectedController}`;

    }


});