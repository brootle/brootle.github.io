
// document.addEventListener('DOMContentLoaded', function () {
//   console.log('DOM loaded with JavaScript');    




// });

// window.addEventListener('scroll', function() {
//             if (document.body.scrollTop > 400) {
//                 var currScrollPos2 = document.body.scrollTop;
//                 document.getElementById('test').style.opacity = -currScrollPos2/400 + 2;
//                 }
//             }
//       // if (document.body.scrollTop > 400){
//       //    //document.getElementById('test').style.opacity = 0;
//       //    // start making it transparent
//       //    var currScrollPos2 = document.body.scrollTop;
//       //    document.getElementById('test').style.opacity = -currScrollPos2/400 + 2;
//       // }
//       // console.log(document.body.scrollTop);
// });

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 400) {
        var currScrollPos2 = document.body.scrollTop;
        document.getElementById('test').style.opacity = -currScrollPos2/400 + 2;
    }
});

// http://stackoverflow.com/a/43570045/6261255