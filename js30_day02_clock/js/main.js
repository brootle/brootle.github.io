
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    const secondHand = document.querySelector('.second-hand');
    const mindHand = document.querySelector('.min-hand');
    const hourdHand = document.querySelector('.hour-hand');

    var secondsCounter = 0;

    function setDate(){

      const now = new Date();

      const seconds = now.getSeconds();
      if(seconds === 0){
        secondsCounter++;
      } 
      //console.log(counter);
      // we add counter * 60 so degree doesn't go to zero, it if goes to zero
      // the hand would jump back counter clockwise and this would look stupid
      // the idea is that we keep incrementing degree
      const secondsDegree = ( ((secondsCounter * 60 + seconds) / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegree}deg)`;

      const minutes = now.getMinutes();
      const minutesDegree = ( ( minutes / 60) * 360) + 90;      
      mindHand.style.transform = `rotate(${minutesDegree}deg)`;

      const hours = now.getHours();          
      const hoursDegree = (( hours / 12) * 360) + 90;      
      hourdHand.style.transform = `rotate(${hoursDegree}deg)`;      
    }

    setInterval(setDate, 1000);

});