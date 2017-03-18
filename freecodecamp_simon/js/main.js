
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

  // add event listenter to catch when we start playing and stop playing
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener('mousedown',startPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseup',stopPlayingSound));
  
  // make sure we stop sound if we move mouse out of button but it is still pressed
  buttons.forEach(button => button.addEventListener('mouseout',stopPlayingSound));  

  //activateButtons();


  var centralButton = document.querySelector(".central-controller");
  centralButton.addEventListener('click',continueGame);

  function continueGame(){
    if(!userMadeError){
      addRandomSoundToMelody();
    }
    playSong(melody); 
    // reser user melody
    userMelody = [];
    notesCounter = 0;
    //playSong(userMelody);    
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
    buttons.forEach(button => button.classList.toggle('disabled'));
  }

  function disableButtons(){
    buttons.forEach(button => button.classList.toggle('disabled'));    
  }

  //playSong(melody);

  function playSong(melody){
    // disable buttons
    disableButtons();

    console.log("Playing melody..........");

    // using http://stackoverflow.com/a/5226335/6261255
    // an immediately-invoked function expression (IIFE) to create a closure around setTimeout
    for (var i = 0; i < melody.length; i++) {
        (function(index) {
            setTimeout(function() {              
              playSound(melody[index]); 
              console.log("just played: ",melody[index]);            
            }, i * (sound.length * 1000 + sound.interval)); // we add 100 milliseconds just to make sure sounds won't overlap
        })(i);
    }

    // avtivate buttons only after melody is finished
    var melodyTime =  (sound.length * 1000 + sound.interval) * melody.length;
    setTimeout(activateButtons,melodyTime);    
  }

  function playSound(button){ 

      try{
        oscillator.stop();
      }
      catch(e){

      }

      // make button pressed
      var pressedButton = document.querySelector(`.${button}`);   
      console.log(pressedButton);
      pressedButton.classList.toggle('pressed');

      // make button not pressed after sound finished 
      (function(btn){
        setTimeout(function(){
          pressedButton = document.querySelector(`.${btn}`);   
          pressedButton.classList.toggle('pressed');
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
    console.log(notesCounter,userMelody,melody);
    // just compare last elements to corresponding note in melody
    return userMelody[userMelody.length-1] === melody[notesCounter-1];
    //return true;
  }

  function startPlayingSound(e){
    console.log("Srart playing sound....",e.currentTarget);

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

    // Adding a gain node just to lower the volume a bit and to make the
    // sound less ear-piercing. It will also allow us to mute and replay
    // our sound on demand
    //var gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(soundVolume, audioContext.currentTime);
    
    oscillator.connect(gainNode);

    oscillator.start();    
          

  }

  function stopPlayingSound(e){
    console.log("Stop playing sound....",e.currentTarget);

    if(playing){
      
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
        },0.1 * 1000); // this is a little delay after we unpress the button
      })(button);      

      // if it was the last button we must continue game
      if(melody.length === userMelody.length || userMadeError){
        setTimeout(continueGame,pause); // make a 2 seconds pause before continue  
        //continueGame();
      }

    }

  }


});