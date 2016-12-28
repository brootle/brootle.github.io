// using JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    var menu = document.getElementById("menu-head_menu");

    var moreMenuID = "more-menu-head_menu";

    //var moreMenuLink = document.getElementById("more-menu-link");

    // 1. duplicate menu and set display to none and all it's links to none
    // 2. on resize if floats out: 
    //    a. display MORE link
    //    b. set display none to links until menu doesn't overflow
    //    c. in MORE menu display links that are hidden in main MENU

    buildMoreMenu();

    addMoreLink("more-menu-link");

    window.addEventListener("resize", function(){
        console.log("resized"); 

        console.log("Out of border: ", checkOverflow(menu))
    });      

    // just copy main manu to moreMenu
    function buildMoreMenu(){
        var moreMenu = document.createElement("ul");
        moreMenu.id = moreMenuID;
        
        // now we add moreMenu to the parent of out main manu
        menu.parentNode.appendChild(moreMenu);

        moreMenu.addEventListener("mouseleave", function(){
            moreMenu.style.display = "none";
        });          

        // ok, now the task is to copy all LI from main manu to more menu
        
    }

    function addMoreLink(id){
        var moreMenuLink = document.createElement("li");
        moreMenuLink.id = id;
        //moreMenuLink.style.display = "none"
        moreMenuLink.innerHTML = "<a>Більше</a>";

        menu.appendChild(moreMenuLink);

        moreMenuLink.addEventListener("mouseover", function(){
            var moreMenu = document.getElementById(moreMenuID);
            moreMenu.style.display = "flex";
        });        
    }

    // http://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
    function checkOverflow(el){
        var curOverflow = el.style.overflow;

        if ( !curOverflow || curOverflow === "visible" )
            el.style.overflow = "hidden";

        var isOverflowing = (el.clientWidth)  < (el.scrollWidth);

        console.log("CLIENT WIDTH: ",el.clientWidth);
        console.log("SCROLL WIDTH: ",el.scrollWidth);

        el.style.overflow = curOverflow;

        return isOverflowing;
    }    

    console.log(getScrollBarWidth());
    
    // http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
    function getScrollBarWidth () {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);

        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild (outer);

        return (w1 - w2);
    };    


});