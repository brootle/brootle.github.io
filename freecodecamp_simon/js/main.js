
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

  // add event listenter to open and close
  var buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener('click',playSound));

  function playSound(e){
    console.log(e.currentTarget);
  }


});