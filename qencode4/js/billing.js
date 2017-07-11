document.addEventListener('DOMContentLoaded', function () {
    console.log('Billing loaded with JavaScript');

    /////////////////////////////////////////////////////////////////
    // below is the function to swith between tabs //////////////////

    const tabLinks = document.querySelectorAll('.tablinks');

    tabLinks.forEach(link => link.addEventListener('click', switchTab));

    function switchTab(e){

        // find active elements and remove -> tablinks--active tabcontent--active
        const activeLink = document.querySelector('.tablinks--active');
        const activeContent = document.querySelector('.tabcontent--active');

        activeLink.classList.remove('tablinks--active');
        activeContent.classList.remove('tabcontent--active');

        // find what tab link was clicked and show tab content with that ID
        const clickedLink = e.currentTarget;
        clickedLink.classList.add('tablinks--active');

        const tabID = clickedLink.getAttribute("data-tabcontent");

        const tabContent = document.querySelector(`#${tabID}`);
        tabContent.classList.add('tabcontent--active');
    }

});

