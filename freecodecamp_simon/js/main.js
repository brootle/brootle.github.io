
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript');    

  // ABOUT SOUNDS READ HERE https://modernweb.com/creating-sound-with-the-web-audio-api-and-oscillators/
  // FIX CLICK AT THE END OF SOUND http://alemangui.github.io/blog//2015/12/26/ramp-to-value.html
  // scheduling sounds one by one aprouch https://www.html5rocks.com/en/tutorials/audio/scheduling/

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();

  var oscillator;

  const sound = {
    length: 0.6,
    volume: 1,
    interval: 200
  }  

  // WIN score
  const WIN = 5;

  var gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = sound.volume;  

  var playing = false;

  const tone = {
    green:300,
    red:400,
    yellow:500,
    blue:600
  }

  const error = {
    frequency: 90,
    volume: 3,
    length: 0.6
  }

  const pause = 2000;

  //var melody = ["green", "red", "red", "green", "blue", "yellow", "red"];
  var melody = [];
  var userMelody = [];
  var notesCounter = 0;

  var userMadeError = false;

  var flags = {
    on:false,
    strict:false
  };

  // add event listenter to catch when we start playing and stop playing
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener('mousedown',startPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseup',stopPlayingSound));
  
  // make sure we stop sound if we move mouse out of button but it is still pressed
  buttons.forEach(button => button.addEventListener('mouseout',stopPlayingSound));  

  //disableButtons(); // disable buttons initially


  // var centralButton = document.querySelector(".central-controller");
  // centralButton.addEventListener('click',continueGame);

  var strictButton = document.querySelector(".strict");
  strictButton.addEventListener('click',function(){
    this.classList.toggle('mode-on');
    flags.strict = !flags.strict;
    console.log("strict mode: ", flags.strict);
  });  

  var startButton = document.querySelector(".start");
  startButton.addEventListener('click',function(){
    console.log("start button clicked");
    // when we click start button we restart the game
    melody = [];
    userMadeError = false;
    notesCounter = 0;
    setTimeout(continueGame,1000);
  });     

  var switchButton = document.querySelector(".switch-btn");
  switchButton.addEventListener('click',function(){
    this.classList.toggle('on');

    flags.on = !flags.on;
    // turn off strict mode when switch is off
    if(!flags.on){
      // disable all buttons and reset game data
      disableButtons();
      // reset game data
      melody = [];
      userMadeError = false;
      notesCounter = 0;       

      flags.strict = false;
      // remove 'mode-on' class
      document.querySelector(".strict").classList.remove('mode-on');

      // set count value to nothing when ON is off 
      document.querySelector(".count > span").textContent = '';

      // disable START and STRICT buttons
      strictButton.classList.add('disabled');
      startButton.classList.add('disabled');
       
    } else{
      // set some values when ON is on
      document.querySelector(".count > span").textContent = '- -';
      // enable START and STRICT buttons
      strictButton.classList.remove('disabled');
      startButton.classList.remove('disabled');      
    }

    console.log("game on: ", flags.on);
    console.log("strict mode: ", flags.strict);
  });

 
  function continueGame(){

    // only if game is ON
    if(flags.on){
      if(!userMadeError){
        addRandomSoundToMelody();
      }
      playSong(melody); 
      // reser user melody
      userMelody = [];
      notesCounter = 0;
      //playSong(userMelody);    
      if(melody.length < 10){
        document.querySelector(".count > span").textContent = `0${melody.length}`;
      } else{
        document.querySelector(".count > span").textContent = melody.length;
      }
    }


  
  }

  function addToUserMelody(sound){
    userMelody.push(sound);
    notesCounter++;
  }

  function addRandomSoundToMelody(){
    // we must add random sound to melody
    const randomIndex = Math.floor(Math.random() * Object.keys(tone).length);
    melody.push(Object.keys(tone)[randomIndex]);
  }

  function activateButtons(){
    // remove disabled class
    buttons.forEach(button => button.classList.remove('disabled')); 
    startButton.classList.remove('disabled');
  }

  function disableButtons(){
    // let's just add disabled class  
    buttons.forEach(button => button.classList.add('disabled'));  
    startButton.classList.add('disabled');
  }

  //playSong(melody);

  function playSong(melody){
    // disable buttons
    disableButtons();

    

    console.log("Playing melody..........");

    var timeouts = [];

    // using http://stackoverflow.com/a/5226335/6261255
    // an immediately-invoked function expression (IIFE) to create a closure around setTimeout
    for (var i = 0; i < melody.length; i++) {

      // if switch was turned OFF stop playing and 
      
        (function(index) {

            timeouts.push(setTimeout(function() {   
                console.log("index:", index,"game on:",flags.on,"timeouts number:",timeouts);
                if(!flags.on){
                  timeouts.forEach(timeout => clearTimeout(timeout));
                  disableButtons();
                }else{
                  playSound(melody[index]);                  
                }  
            }, i * (sound.length * 1000 + sound.interval))); 

        })(i);      
        // we add 100 milliseconds just to make sure sounds won't overlap

        // (function(index) {
        //     setTimeout(function() {   

        //         playSound(melody[index]);   
            
        //     }, i * (sound.length * 1000 + sound.interval)); // we add 100 milliseconds just to make sure sounds won't overlap
        // })(i);

    }

    // avtivate buttons only after melody is finished and only if game is ON

    // console.log("activate buttons after melody played");
    var melodyTime =  (sound.length * 1000 + sound.interval) * melody.length;
    // it's timesetout is created before buttons, but we add it so we can clean it
    timeouts.push(setTimeout(activateButtons,melodyTime));    

  }

  function playSound(button){ 

      try{
        oscillator.stop();
      }
      catch(e){

      }

      // make button pressed
      var pressedButton = document.querySelector(`.${button}`);   
      pressedButton.classList.toggle('pressed');

      // make button not pressed after sound finished 
      (function(btn){
        setTimeout(function(){
          pressedButton = document.querySelector(`.${btn}`);   
          pressedButton.classList.toggle('pressed');
          //activateButtons();
        },sound.length * 1000);
      })(button);


      oscillator = audioContext.createOscillator();
      oscillator.frequency.value = tone[button];        

      gainNode.gain.setValueAtTime(sound.volume, audioContext.currentTime);
      
      oscillator.connect(gainNode);

      oscillator.start(0);   

      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + sound.length);     
  }

  function melodiesMatch(){
    // just compare last elements to corresponding note in melody
    return userMelody[userMelody.length-1] === melody[notesCounter-1];
  }

  function startPlayingSound(e){

    const button = e.currentTarget.getAttribute("data-button");

    addToUserMelody(button);

    var soundTone = tone[button];
    var soundVolume = sound.volume;
  
    // compare melody and user melody
    if(melodiesMatch()){
      userMadeError = false;
      console.log("melodies match");
    } else{
      soundTone = error.frequency;
      soundVolume = error.volume;    
      userMadeError = true;
      disableButtons(); // when user made error we imidiatelly disable buttons
      // reset melodies if strict mode
      // melody = [];
      // userMelody = [];
      // notesCounter = 0;   
      // play again if not strict mode  
      userMelody = [];
      notesCounter = 0;      
      // we must play melody after we played wrong button
    }
    

    if(!playing){
      // if sound is playing we must stop it
      try{
        oscillator.stop();
      }
      catch(e){

      }
    }

    playing = true;
    e.currentTarget.classList.toggle('pressed');

    oscillator = audioContext.createOscillator();

    oscillator.frequency.value = soundTone;        

    gainNode.gain.setValueAtTime(soundVolume, audioContext.currentTime);
    
    oscillator.connect(gainNode);

    oscillator.start();    
          

  }

  function stopPlayingSound(e){
    //console.log("Stop playing sound....",e.currentTarget);

    if(playing){
      disableButtons();
      
      // change sound volume to 0, so when we stop it we avoid ugly click bug
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      //gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.3);   
      playing = false;
      
      //make button not pressed after sound finished       
      // we can do
      // OPTION 1
      // e.currentTarget.classList.toggle('pressed');
      // OR
      // OPTION 2
      var button = e.currentTarget;
      (function(btn){
        setTimeout(function(){ 
          btn.classList.toggle('pressed');  
          // activate buttons only if we didn't put all tones of if no error by user
          if((melody.length !== userMelody.length) && (userMadeError == false)){
            activateButtons();  
          }            
        },0.1 * 1000); // this is a little delay after we unpress the button
      })(button);      

      // here we must check if we reach win score
      if(melody.length === userMelody.length && melody.length === WIN){
        // reset game
        document.querySelector(".count > span").textContent = 'WIN';
        console.log("restart game");
        melody = [];
        userMadeError = false;
        notesCounter = 0; 
        setTimeout(continueGame,pause); 
      }

      // if it was the last button we must continue game
      if(melody.length === userMelody.length || userMadeError){
        console.log("strict mode ",flags.strict);
        // if strict mode = true -> reset
        if(flags.strict && userMadeError){
          melody = [];
          userMadeError = false;
          notesCounter = 0;          
        }
        setTimeout(continueGame,pause); // make a 2 seconds pause before continue  
      }
  

    }

  }


});