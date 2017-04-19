document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var movies = [
        {
            title: "It's my movie",
            rating: 4.5,
            hasWatched: true
        },
        {
            title: "Pirares of Caribean",
            rating: 3.8,
            hasWatched: false
        },
        {
            title: "Star Wars",
            rating: 4.6,
            hasWatched: true
        },
        {
            title: "The edge of tomorrow",
            rating: 4.9,
            hasWatched: false
        }                        
    ];

    movies.forEach(function(movie){
        watched = movie.hasWatched === true ? "watched" : "not seen"
        console.log(`You have ${watched} "${movie.title}" - ${movie.rating} stars.`);
    })

});