document.addEventListener('DOMContentLoaded', function () {
    // console.log('Accordion loaded with JavaScript');
    
    var accodrionButtons = document.querySelectorAll(".q5-accordion-button");

    accodrionButtons.forEach(button => {

        button.addEventListener('click', function(){

            var panels = document.querySelectorAll(".q5-accordion-panel");
            var currentpanel = this.nextElementSibling;

            this.classList.toggle("q5-active-accordion");

            // 1. find displayed panel (not current) and hide it
            panels.forEach(panel => {
                if(panel !== currentpanel){
                    if(panel.style.maxHeight){
                        panel.style.maxHeight = null;
                        panel.previousElementSibling.classList.toggle("q5-active-accordion");
                    }                    
                }
            });

            // 2. show subling panel if it's not shown already 
            if (currentpanel.style.maxHeight){
                currentpanel.style.maxHeight = null;
            } else {
                currentpanel.style.maxHeight = currentpanel.scrollHeight + "px";
            }             
        
            
        });

    });



});