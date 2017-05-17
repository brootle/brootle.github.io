
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    var sidebar = document.querySelector('.sidebar');

    sidebar.addEventListener('click', function(){
         this.classList.toggle('hide');
    });

});