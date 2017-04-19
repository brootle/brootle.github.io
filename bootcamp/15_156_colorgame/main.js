document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var numberOfSquares = 6;
    var colors = generateRandomColors(numberOfSquares); // generate 6 random colors as array

    var squares = document.querySelectorAll(".square");
    var pickedColor = pickColor(); // get random color
    var colorDisplay = document.querySelector("#colorDisplay");
    var messageDisplay = document.querySelector("#message");
    var h1 = document.querySelector("h1");
    // var easyBtn = document.querySelector("#easyBtn");
    // var hardBtn = document.querySelector("#hardBtn");
    var modeButtons = document.querySelectorAll(".mode");
    var resetdBtn = document.querySelector("#resetdBtn");

    colorDisplay.textContent = pickedColor;

    modeButtons.forEach(button => button.addEventListener("click",function(){
        modeButtons.forEach(button => button.classList.remove("selected"));

        this.classList.add("selected");

        this.textContent === "easy" ? numberOfSquares = 3 : numberOfSquares = 6;

        reset();
    }));

    function reset(){
        colors = generateRandomColors(numberOfSquares);
        pickedColor = pickColor();    
        colorDisplay.textContent = pickedColor;

        messageDisplay.textContent = "";
        resetdBtn.textContent = "New Colors";

        for(var i = 0, length = squares.length; i < length; i++){
            if(colors[i]){
                squares[i].style.display = "block";
                squares[i].style.background = colors[i];
            } else{
                squares[i].style.display = "none";
            }            
            // squares[i].style.background = colors[i];
        }        

        h1.style.background = "steelblue";        
    }

    resetdBtn.addEventListener("click", reset);

    // resetdBtn.addEventListener("click", function(){
    //     colors = generateRandomColors(numberOfSquares);
    //     pickedColor = pickColor();    
    //     colorDisplay.textContent = pickedColor;

    //     messageDisplay.textContent = "";
    //     this.textContent = "New Colors";

    //     for(var i = 0, length = squares.length; i < length; i++){
    //         squares[i].style.background = colors[i];
    //     }        

    //     h1.style.background = "steelblue";
    // });    

    // easyBtn.addEventListener("click", function(){
    //     easyBtn.classList.add("selected");
    //     hardBtn.classList.remove("selected");

    //     numberOfSquares = 3;

    //     colors = generateRandomColors(numberOfSquares);
    //     pickedColor = pickColor();

    //     for(var i = 0, length = squares.length; i < length; i++){
    //         if(colors[i]){
    //             squares[i].style.background = colors[i];
    //         } else{
    //             squares[i].style.display = "none";
    //         }
    //     }        
    // });

    // hardBtn.addEventListener("click", function(){
    //     hardBtn.classList.add("selected");
    //     easyBtn.classList.remove("selected");

    //     numberOfSquares = 6;

    //     colors = generateRandomColors(numberOfSquares);
    //     pickedColor = pickColor();

    //     for(var i = 0, length = squares.length; i < length; i++){
    //         squares[i].style.background = colors[i];
    //         squares[i].style.display = "block";
    //     }           
    // });    

    // set initial colors
    for(var i = 0, length = squares.length; i < length; i++){
        squares[i].style.background = colors[i];
    }

    // add even listeners to color squares
    squares.forEach(square => {
        square.addEventListener("click", function(){
            var clickedColor = square.style.background;
            //console.log(square.style.background);
            if(clickedColor === pickedColor){
                console.log("CORRECT");
                messageDisplay.textContent = "Correct!";
                resetdBtn.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else{
                console.log("WRONG");
                square.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    });

    function changeColors(color){
        squares.forEach(square => square.style.background = color);
    }

    function pickColor(){
        var random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    function generateRandomColors(num){
        var arr = []
        for(var i = 0; i < num; i++){
            arr.push(randomColor());            
        }
        return arr;
    }

    function randomColor(){
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

        // var red = Math.floor(Math.random() * 256);
        // var green = Math.floor(Math.random() * 256);
        // var blue = Math.floor(Math.random() * 256);
        // console.log(`rgb(${red}, ${green}, ${blue})`);    

});