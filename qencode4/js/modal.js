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

});