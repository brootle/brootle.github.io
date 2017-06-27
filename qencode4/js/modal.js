document.addEventListener('DOMContentLoaded', function () {
    console.log('Modal loaded with JavaScript');

    const modal = document.querySelector('#payInvoice');

    const payNowButtons = document.querySelectorAll('.has-modal');

    const seePaymentHistory = document.querySelector("#see_payment_history");

    payNowButtons.forEach(link => link.addEventListener('click', showModal));

    function showModal(){
        console.log("show modal");
        modal.style.display = "block";
    }

    // When the user clicks anywhere outside of the modal, close it
    // or when user clicks 'see payment history' button
    window.onclick = function(event) {
        if (event.target == modal || event.target == seePaymentHistory) {
            modal.style.display = "none";
        }
    }    


    //////////////////////////////////////////////////////////////////////////
    // this is to handle the click on "See Payment History" in modal window //
    
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

});