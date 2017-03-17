
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript');    

  // ABOUT SOUNDS READ HERE https://modernweb.com/creating-sound-with-the-web-audio-api-and-oscillators/

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();
  var oscillator;
  var gainNode = audioContext.createGain();
  //o.type = e.currentTarget.id;
  var playing = false;

  // add event listenter to catch when we start playing and stop playing
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener('mousedown',startPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseup',stopPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseout',stopPlayingSound));


  function startPlayingSound(e){
    console.log("Srart playing sound....",e.currentTarget);

    const tone = e.currentTarget.getAttribute("data-tone");

    if(!playing){
      // if sound is playing we must stop it
      try{
        oscillator.stop();
      }
      catch(e){

      }
    }

    playing = true;

    
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = tone;        

    // Adding a gain node just to lower the volume a bit and to make the
    // sound less ear-piercing. It will also allow us to mute and replay
    // our sound on demand
    //var gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = 0.5;
    oscillator.start();    
      

  }

  function stopPlayingSound(e){
    console.log("Stop playing sound....",e.currentTarget);

    if(playing){
       gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
       //oscillator.stop();
       //gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.3);
       playing = false;
    }

  }


});