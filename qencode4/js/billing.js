document.addEventListener('DOMContentLoaded', function () {
    console.log('Billing loaded with JavaScript');

    //////////////////////////////////////////////////////////////////////////
    // this is to handle the click on "See Payment History" in modal window //

    const seePaymentHistory = document.querySelector("#see_payment_history");
    seePaymentHistory.addEventListener('click', showPaymentHistoryTab);

    function showPaymentHistoryTab(){
        // find active elements and remove -> tablinks--active tabcontent--active
        const activeLink = document.querySelector('.tablinks--active');
        const activeContent = document.querySelector('.tabcontent--active');

        activeLink.classList.remove('tablinks--active');
        activeContent.classList.remove('tabcontent--active');

        // find what tab link was clicked and show tab content with that ID
        const clickedLink = document.querySelector('[data-tabcontent="history"]');
        clickedLink.classList.add('tablinks--active');

        const tabID = clickedLink.getAttribute("data-tabcontent");

        const tabContent = document.querySelector(`#${tabID}`);
        tabContent.classList.add('tabcontent--active');   

        // after we showed the tab we scroll to it
        document.getElementById("history").scrollIntoView();
    }
    //////////////////////////////////////////////////////////////////////////////////

    // function to scroll element into view
    function scrollIntoView(eleID) {
        var e = document.getElementById(eleID);
        if (!!e && e.scrollIntoView) {
            e.scrollIntoView();
        }
    }    


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

