
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    document.querySelector("#test").addEventListener('click', function(){
        console.log("clicked");

        var menu = document.getElementById('top-menu');
        //menu.style.background = "rgba(0, 0, 0, 0) linear-gradient(45deg, rgba(126, 47, 182, 0.5) 0%, rgba(126, 47, 182, 0.5) 25%, rgba(249, 71, 157, 0.5) 80%, rgba(249, 71, 157, 0.5) 100%) repeat scroll 0% 0% / auto padding-box border-box";
        menu.style.background = "linear-gradient(45deg, rgba(126, 47, 182, 0.5) 0%, rgba(126, 47, 182, 0.5) 25%, rgba(249, 71, 157, 0.5) 80%, rgba(249, 71, 157, 0.5) 100%) 0% 0%";
    });
          
    window.addEventListener('scroll', function(){

        var menu = document.querySelector('.header-menu-background');

        console.log(window.scrollY);

        // add shadow
        if(window.scrollY > 40){
            menu.classList.add('show-background');
        }

        // remove shadow
        if(window.scrollY < 40){
            menu.classList.remove('show-background');
        }   

    });


   
    

});


