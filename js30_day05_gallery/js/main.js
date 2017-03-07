
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    const panels = document.querySelectorAll(".panel");

    function toggleOpen(){
      this.classList.toggle('open');
    }

    panels.forEach(panel => panel.addEventListener('click',toggleOpen));


    function toggleActive(e){
      // we need to check what transition ended
      // we have font-size and flex transitions there
      // we check for "flex" in the name of a transition because in Safari 
      // this is called "flex" and in other browsers "flex-grow"
      if(e.propertyName.includes('flex')){
        this.classList.toggle('open-active');
      }
    }
    // start this when transition ended
    panels.forEach(panel => panel.addEventListener('transitionend',toggleActive));

});