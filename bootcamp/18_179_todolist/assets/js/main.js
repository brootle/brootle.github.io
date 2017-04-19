$(function () {
    console.log('DOM loaded with jQuery - short version');

    // toggle some styles when we click item in the list
    //$("li").click(function(){ // delete this version as it won't work on new elements
    // this below will work on all future 'li' inside 'ul' that exists
    $("ul").on("click","li",function(){

        $(this).toggleClass("completed");

        // if($(this).css("color") === "rgb(251, 231, 231)"){
        //     $(this).css({
        //         color:"rgb(0, 0, 0)",
        //         textDecoration:"none"
        //     });            
        // } else{
        //     $(this).css({
        //         color:"rgb(251, 231, 231)",
        //         textDecoration:"line-through"
        //     });
        // }

    });

    // delete item from the list
    //$("span").click(function(event){ // change this as it won't work with future elements
    // this is going to work with all future elements inside 'ul'
    $("ul").on("click","span",function(event){    
        // remove li element
        // we start fadeOut that will make display none
        // and after that we add function that will delete element
        $(this).parent().fadeOut(500,function(){
            // at this point 'this' refers to parent element - 'li'
            $(this).remove();
        });
        // stop even from bubling on top to parents: li, ul, body
        event.stopPropagation();
    });

    // add item to the list
    $("input[type='text']").keypress(function(event){
        // if we press enter key
        if(event.which === 13){
            // get value of text input
            var newItemText = $(this).val();
            // clear input
            $(this).val("");
            // add new 'li' element to 'ul' list
            $("ul").append(`<li><span><i class="fa fa-trash" aria-hidden="true"></i></span> ${newItemText}</li>`);
        }
    });

    $(".fa-plus").click(function(){
        $("input[type='text']").fadeToggle();
    });

});