$(function () {
  
    // run on page load
    $("#header_logo").addClass("active");

    // set delay for other animation not related to scroll
    setTimeout(function() {
        $(".header-title").addClass("active");
    }, 400);    

    setTimeout(function() {
        $(".header-description").addClass("active");
    }, 800);   

    setTimeout(function() {
        $("#btn_01").addClass("active");
    }, 1200);      

    setTimeout(function() {
        $("#btn_02").addClass("active");
    }, 1400);      

    setTimeout(function() {
        $("#btn_03").addClass("active");
    }, 1600);     

    setTimeout(function() {
        $(".header-social-buttons").addClass("active");
    }, 2000);         

});