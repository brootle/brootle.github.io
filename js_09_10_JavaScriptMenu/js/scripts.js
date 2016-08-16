document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    // get a collection of all dropdown menu
    var dropDownMenu = document.getElementsByClassName("dropdown");
    console.log(dropDownMenu.length);


    // add even on each dropdown menu element
    for (var i = 0; i < dropDownMenu.length; i++)
    {
        // display 1st child when mouse is over
        dropDownMenu[i].addEventListener("mouseover", function () {
            console.log('mouse is IN dropdown menu');

            var subMenu = this.getElementsByClassName("sub-menu")[0];
            subMenu.style.display = "block";
            console.log(subMenu);
        });

        // hide 1st child when mouse is out
        dropDownMenu[i].addEventListener("mouseout", function () {
            console.log('mouse is OUT of dropdown menu');
            var subMenu = this.getElementsByClassName("sub-menu")[0];
            subMenu.style.display = "none";
        });

    }

});