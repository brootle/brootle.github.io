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

    var expandAllButton = document.querySelector('#expand_all');
    var collapseAllButton = document.querySelector('#collapse_all');

    expandAllButton.addEventListener('click', function(){

        collapseAllButton.classList.remove("hidden");
        expandAllButton.classList.add("hidden");

        var headers = document.querySelectorAll(".project-header");
        headers.forEach(header => {
            header.classList.add("active-project");

            var currentpanel = header.nextElementSibling;
            // 2. show panel
            currentpanel.style.maxHeight = currentpanel.scrollHeight + "px";

        })
    })

    collapseAllButton.addEventListener('click', function(){

        collapseAllButton.classList.add("hidden");
        expandAllButton.classList.remove("hidden");        

        var headers = document.querySelectorAll(".project-header");
        headers.forEach(header => {
            header.classList.remove("active-project");

            var currentpanel = header.nextElementSibling;
            // 2. hide panel
            currentpanel.style.maxHeight = null;

        })
    })    


});