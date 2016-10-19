
// initialize Masonry
var container = document.getElementById("container");
container.masonry();
// layout Masonry again after all images have loaded
container.imagesLoaded( function() {
    container.masonry();
});