
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var canvas = document.getElementById("gameCanvas");

    var context = canvas.getContext('2d');

    var container = document.querySelector(".container");

    // we set dimentions to match container so it will scale correctly
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    var ballRadius = 5;
    var ballPositionX = 0;
    var ballPositionY = 0;
    var ballColor = "#ffce4e";

    var fieldColor = "black";

    var shiftX = 0;
    var shiftY = 0;    

    // set initial position to the center
    ballPositionX = shiftX + canvas.width/2 - ballRadius/2;
    ballPositionY = shiftY + canvas.height/2 - ballRadius/2;    

    var ballSpeedX = -7;
    var ballSpeedY = 3;

    var paddle1Y = 250;
    var paddle2Y = 250;
    const PADDLE_HEIGHT = 100;
    const PADDLE_WIDTH = 10;
    var paddleColor = "white";

    var player1Score = 0;
    var player2Score = 0;


    //drawField();

    var framesPerSecond = 30;
    var second = 1000; // 1 sec = 1000 milleseconds
    var frameRate = second/framesPerSecond; // so framerate is 30 frames per second

    //var intervalPointer = setInterval(callBoth,frameRate);


    var intervalPointer = setInterval(function(){

      //console.log(ballPositionX + ":" + shiftX);

      drawFrame();
      calculateObjects();  
      
          
    },frameRate);

    canvas.addEventListener('mousemove',function(e){
      var mousePosition = calculateMousePosition(e);

      paddle1Y = mousePosition.y - PADDLE_HEIGHT/2;
      //paddle2Y = mousePosition.y - PADDLE_HEIGHT/2;
      console.log(`mouse position X: ${mousePosition.x} | mouse position Y: ${mousePosition.y}`);
    });    

    function resetBallPosition(){
      shiftX = 0;
      shiftY = 0;    

      // set initial position to the center
      ballPositionX = shiftX + canvas.width/2 - ballRadius/2;
      ballPositionY = shiftY + canvas.height/2 - ballRadius/2;          
    }

    // this doesn't work correct if parent has padding
    function calculateMousePosition(e){
      var rect = canvas.getBoundingClientRect();
      //console.log(rect);
      var root = document.documentElement;
      var mouseX = e.clientX - rect.left - root.scrollLeft;
      var mouseY = e.clientY - rect.top - root.scrollTop;
    
      console.log(`clientY: ${e.clientY}`)
      return {
        x:mouseX,
        y:mouseY
      }
    }

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

    function computerMovement(){
      var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
      if(paddle2YCenter < ballPositionY - 25){
        paddle2Y += 5;
      } else if(paddle2YCenter > ballPositionY + 25){
        paddle2Y -= 5;
      }
    }

    function calculateObjects(){

      computerMovement();

      // if ball touches the border we stop calling this function
      // or we can bounce the ball back
      // if(roundBallTouchBorderX()){
      //   ballSpeedX = -ballSpeedX;
      //   //clearInterval(intervalPointer);
      // }            

      if(ballPositionX < PADDLE_WIDTH){
        // check if the ball hits paddle
        if(ballPositionY > paddle1Y && ballPositionY < paddle1Y + PADDLE_HEIGHT){
          ballSpeedX = -ballSpeedX;
          // get the angle after ball hits the paddle --need to fix the logic
          var deltaY = ballPositionY - (paddle1Y + PADDLE_HEIGHT/2);
          ballSpeedY = deltaY * 0.25
        }else{
          ballSpeedX = -ballSpeedX;
          resetBallPosition();
          player2Score++;
        }        
      }

      if(ballPositionX > canvas.width - PADDLE_WIDTH){
        // check if the ball hits paddle
        if(ballPositionY > paddle2Y && ballPositionY < paddle2Y + PADDLE_HEIGHT){
          ballSpeedX = -ballSpeedX;
          var deltaY = ballPositionY - (paddle2Y + PADDLE_HEIGHT/2);
          ballSpeedY = deltaY * 0.25;          
        }else{
          ballSpeedX = -ballSpeedX;
          resetBallPosition();
          player1Score++;
        }        
      }      

      // if(roundBallTouchBorderX()){
      //   ballSpeedX = -ballSpeedX;
      //   //clearInterval(intervalPointer);
      // }        

      if(roundBallTouchBorderY()){
        ballSpeedY = -ballSpeedY;
        //clearInterval(intervalPointer);
      }          



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
      drawColoredRectangle(0,0,canvas.width,canvas.height,fieldColor);


      // draw paddle 1
      drawColoredRectangle(0,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT,paddleColor);

      // draw paddle 2
      drawColoredRectangle(canvas.width - PADDLE_WIDTH,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT,paddleColor);

      // draw Players score
      // context.fillText(player1Score,100,100,)
      // context.fillText(player2Score,400,100,)
      context.font = "30px Arial";
      context.fillText(player1Score,100,50);      
      context.fillText(player2Score,canvas.width-100,50);     

      // draw circle ball
      drawColoredCircle(ballPositionX,ballPositionY,ballRadius,ballColor);

      // draw red ball
      // context.fillStyle = "red";
      // put the ball in the middle
      // context.fillRect(ballPositionX,ballPositionY,ballRadius,ballRadius);
      //drawColoredRectangle(ballPositionX,ballPositionY,ballRadius,ballRadius,"red");

      //console.log(shiftX + canvas.width/2 - ballRadius/2);
    }

});