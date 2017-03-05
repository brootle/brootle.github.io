
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var canvas = document.getElementById("gameCanvas");

    var context = canvas.getContext('2d');

    var container = document.querySelector(".container");

    // we set dimentions to match container so it will scale correctly
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    var ballRadius = 15;
    var ballPositionX = 0;
    var ballPositionY = 0;

    var shiftX = 0;
    var shiftY = 0;    

    // set initial position to the center
    ballPositionX = shiftX + canvas.width/2 - ballRadius/2;
    ballPositionY = shiftY + canvas.height/2 - ballRadius/2;    

    var ballSpeedX = -10;
    var ballSpeedY = 10;


    //drawField();

    var framesPerSecond = 30;
    var second = 1000; // 1 sec = 1000 milleseconds
    var frameRate = second/framesPerSecond; // so framerate is 30 frames per second

    //var intervalPointer = setInterval(callBoth,frameRate);

    var intervalPointer = setInterval(function(){
      // if ball touches the border we stop calling this function
      // or we can bounce the ball back
      if(roundBallTouchBorderX()){
        ballSpeedX = -ballSpeedX;
        //clearInterval(intervalPointer);
      }            

      if(roundBallTouchBorderY()){
        ballSpeedY = -ballSpeedY;
        //clearInterval(intervalPointer);
      }          

      console.log(ballPositionX + ":" + shiftX);

      drawFrame();
      calculateObjects();  
      
          
    },frameRate);

    function drawColoredRectangle(posX, posY, width, height, color){
      context.fillStyle = color;
      context.fillRect(posX,posY,width,height);  
    }

    function drawColoredCircle(posX, posY, radius, color){
      context.fillStyle = color;
      context.beginPath();
      context.arc(posX, posY, radius, 0, 2 * Math.PI, true);  
      context.fill();    
    }

    // checks if ball touch the border for square
    // function ballTouchBorder(){
    //   if(ballPositionX > (canvas.width - ballRadius) || ballPositionX < 0){
    //     return true;
    //   }        
    //   return false;
    // }

    function roundBallTouchBorderX(){
      if(ballPositionX > (canvas.width - ballRadius) || ballPositionX < (0 + ballRadius) ){
        return true;
      }        
      return false;
    }    

    function roundBallTouchBorderY(){
      if(ballPositionY > (canvas.height - ballRadius) || ballPositionY < (0 + ballRadius) ){
        return true;
      }        
      return false;
    }        

    // function callBoth(){    
      
    //   // if ball touches the border we stop calling this function
    //   if(ballTouchBorder()){
    //     clearInterval(intervalPointer);
    //   }            

    //   //console.log(ballPositionX);

    //   drawFrame();
    //   calculateObjects();
    // }

    function calculateObjects(){
      shiftX+=ballSpeedX;
      shiftY+=ballSpeedY;

      ballPositionX = shiftX + canvas.width/2 - ballRadius/2;
      ballPositionY = shiftY + canvas.height/2 - ballRadius/2;
      //ballPositionY = canvas.height/2 - ballRadius/2;
    }

    function drawFrame(){
      // draw field
      // context.fillStyle = "black";
      // context.fillRect(0,0,canvas.width,canvas.height);    
      drawColoredRectangle(0,0,canvas.width,canvas.height,"black");

      // draw circle ball
      drawColoredCircle(ballPositionX,ballPositionY,ballRadius,"red");

      // draw red ball
      // context.fillStyle = "red";
      // put the ball in the middle
      // context.fillRect(ballPositionX,ballPositionY,ballRadius,ballRadius);
      //drawColoredRectangle(ballPositionX,ballPositionY,ballRadius,ballRadius,"red");

      //console.log(shiftX + canvas.width/2 - ballRadius/2);
    }

});