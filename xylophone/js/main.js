
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    function playSound(e){

      var keyCode = undefined;

      // get the value for keyCode if button was clicked
      try{
        keyCode = e.currentTarget.getAttribute("data-key");
      } catch(err) {

      }

      // if keyCode got no value it means we got here from keyboard click
      if(keyCode === undefined){
        keyCode = e.keyCode;
      }
      
      // select audio element
      const audio = document.querySelector(`audio[data-key="${keyCode}"`);
      //console.log(audio);

      // select corresponding div element, so we can apply animation to it 
      const key = document.querySelector(`.xylophone-key[data-key="${keyCode}"`);
      //console.log(key);

      if(!audio) return; // if we don't find audio with key that we press - just stop

      // now if found this audio component we just play it

      audio.currentTime = 0; // rewind audio to the start

      audio.play();

      // when we play add class .play that will change the look of corresponding div
      key.classList.add("playing")      

    }

    ////////////////////////////////////////////////////////
    // now we want to remove class after playing ended - when transiotion ends

    function removeTransition(e){

      if(e.propertyName !== 'transform') return; // do nothing if it was not by 'transform' property
      // console.log(e);
      
      // here this is element that triggered even, so we delete 'playing' class from it
      this.classList.remove('playing');
    }

    // get all elements with 'key' class
    const keys = document.querySelectorAll('.xylophone-key');
    // add event Listener to each key to run a function when 'transiotionend' happens
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));


    window.addEventListener('keydown', playSound);

    // add click event to catch the button click
    keys.forEach(key => key.addEventListener('click', playSound));

});