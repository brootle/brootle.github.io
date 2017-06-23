document.addEventListener('DOMContentLoaded', function () {
    console.log('Expand loaded with JavaScript');
    
    var expandButtons = document.querySelectorAll(".project-header");

    expandButtons.forEach(button => {

        button.addEventListener('click', function(){

            var panels = document.querySelectorAll(".project-content");
            var currentpanel = this.nextElementSibling;

            this.classList.toggle("active-project");

            // 2. show subling panel if it's not shown already 
            if (currentpanel.style.maxHeight){
                currentpanel.style.maxHeight = null;
            } else {
                currentpanel.style.maxHeight = currentpanel.scrollHeight + "px";
            }             
        
            
        });

    });



});