
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream) {
    //inserting our stream to the video tag     
    video.src = window.URL.createObjectURL(stream); 
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);









// //enabling video and audio channels 
// navigator.getUserMedia({ video: true, audio: true }, function (stream) { 
    
//     var video = document.querySelector('video'); 
    
//     //inserting our stream to the video tag     
//     video.src = window.URL.createObjectURL(stream); 
// }, function (err) {
//     console.log(err);
// }); 


