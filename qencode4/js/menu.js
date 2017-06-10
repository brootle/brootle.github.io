document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');
   
   // this part is same as in main.js

    // get menu
    var menu = document.querySelector('.header-menu');  


    var showMenuButton = document.querySelector("#menu-button");
    var closeMenuButton = document.querySelector("#сlose-button");
    var subMenu = document.querySelector(".menu-nav-items");    

    showMenuButton.addEventListener('click', function(){
        this.style.display = "none";
        closeMenuButton.style.display = "inline-block";
        subMenu.classList.toggle("hide-menu");

    });

    closeMenuButton.addEventListener('click', function(){
        this.style.display = "none";
        showMenuButton.style.display = "inline-block";
        subMenu.classList.toggle("hide-menu"); 
    });     

});