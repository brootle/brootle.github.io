
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    const pressed = [];
    const secretCode = 'alex';

    window.addEventListener('keyup', (e) => {
      console.log(e.key);
      pressed.push(e.key);

      // we should keep only number of letters
      // which is equal to length of secret code
      // 'alex' -> -5 - 1 = -6...
      pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

      console.log(pressed);

      // now let's check it sequence is equal to secret code
      if(pressed.join('').includes(secretCode)){
        console.log("____MATCH____");
      }

    });


});