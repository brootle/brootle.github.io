
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var ctx = new AudioContext();
    var o;
    //var o = ctx.createOscillator();
    //o.type = e.currentTarget.id;
    //o.frequency.value = 261.63;    


  // add event listenter to open and close
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener('mousedown',startPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseup',stopPlayingSound));
  buttons.forEach(button => button.addEventListener('mouseout',stopPlayingSound));

  function startPlayingSound(e){
    console.log("Srart playing sound....",e.currentTarget);
    
    o = ctx.createOscillator();
    o.frequency.value = 261.63;        
    o.start(0);
    o.connect(ctx.destination);
    
  }

  function stopPlayingSound(e){
    console.log("Stop playing sound....",e.currentTarget);

    o.stop();
  }


});