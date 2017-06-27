document.addEventListener('DOMContentLoaded', function () {
    console.log('Modal loaded with JavaScript');

    // Pay Invoice clicked
    const payInvoiceModal = document.querySelector('#payInvoice');

    const payNowButtons = document.querySelectorAll('.pay-now-modal');

    const seePaymentHistory = document.querySelector("#see_payment_history");

    payNowButtons.forEach(link => link.addEventListener('click', showPayInvoiceModal));

    function showPayInvoiceModal(){
        payInvoiceModal.style.display = "block";
        // add modal-open class to body
        document.querySelector("body").classList.add("modal-open");
    }


    // Show Invoice clicked
    const showInvoiceModal = document.querySelector('#showInvoice');

    const shoInvoiceButtons = document.querySelectorAll('.show-invoice-modal');  

    shoInvoiceButtons.forEach(link => link.addEventListener('click', showInvoiceInfoModal));  

    function showInvoiceInfoModal(){
        showInvoiceModal.style.display = "block";
        // add modal-open class to body
        document.querySelector("body").classList.add("modal-open");

        // expand all details
        var headers = document.querySelectorAll(".project-header");
        headers.forEach(header => {
            header.classList.add("active-project");

            var currentpanel = header.nextElementSibling;
            // 2. show panel
            currentpanel.style.maxHeight = currentpanel.scrollHeight + "px";

        })        
    }    

    // When the user clicks anywhere outside of the modal, close it
    // or when user clicks 'see payment history' button
    window.onclick = function(event) {
        if (event.target == payInvoiceModal || event.target == showInvoiceModal || event.target == seePaymentHistory) {
            payInvoiceModal.style.display = "none";
            showInvoiceModal.style.display = "none";
            // remove 'modal open' from body
            document.querySelector("body").classList.remove("modal-open");

            // close all details on projects
            var headers = document.querySelectorAll(".project-header");
            headers.forEach(header => {
                header.classList.remove("active-project");

                var currentpanel = header.nextElementSibling;
                // 2. hide panel
                currentpanel.style.maxHeight = null;

            })            
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

        // remove 'modal open' from body
        document.querySelector("body").classList.remove("modal-open");        
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