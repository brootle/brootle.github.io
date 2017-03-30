
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    // object.addEventListener("change", myScript);
    // document.getElementById("myCheck").checked = true;

    // select if shift is down #16
   

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes);

  let lastChecked;

  function handleCheck(e){
    console.log(e);

    let inBetween = false;

    if(e.shiftKey && this.checked){
      console.log("shift is down");

      checkboxes.forEach(checkbox => {

        if(checkbox === this || checkbox === lastChecked){
          inBetween = !inBetween;
        }

        if(inBetween){
          checkbox.checked = true;
        }

      });

    }

    lastChecked = this;
  }

  checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

});