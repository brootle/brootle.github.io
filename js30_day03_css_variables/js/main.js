
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    const inputs = document.querySelectorAll('.container input');

    function handleUpdate(){
      //console.log(this.value);

      // here this.dataset.sizing we get value of sizing parameter of
      // of data object -> data-sizing="px"
      // we add || '' in case there is no sizing parameter
      const suffix = this.dataset.sizing || '';

      // we can get the name parameter from calling element
      // for example -> name="spacing" and we also called it same was as variable
      document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change',handleUpdate));

    inputs.forEach(input => input.addEventListener('mousemove',handleUpdate));

});