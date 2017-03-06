
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var canvas = document.getElementById("gameCanvas");

    var context = canvas.getContext('2d');

    var container = document.querySelector(".container");

    // we set dimentions to match container so it will scale correctly
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    var ballRadius = 6;
    var ballPositionX = 0;
    var ballPositionY = 0;
    var ballColor = "#ffce4e";

    var fieldColor = "#12081b";

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
    const PADDLE_WIDTH = 12;
    // var paddleColor = "white";
    var paddle1Color = "#bad64e";
    var paddle2Color = "#f26d22";

    const PADDLE_OFFSET = 20;

    var player1Score = 0;
    var player2Score = 0;

    const WINNING_SCORE = 5;

    var showWinScreen = false;


    //drawField();

    var framesPerSecond = 30;
    var second = 1000; // 1 sec = 1000 milleseconds
    var frameRate = second/framesPerSecond; // so framerate is 30 frames per second

    //var intervalPointer = setInterval(callBoth,frameRate);


    var intervalPointer = setInterval(drawFrames,frameRate);

    function drawFrames(){
      drawFrame();
      calculateObjects();        
    }

    canvas.addEventListener('mousedown',handleMouseClick);        

    canvas.addEventListener('mousemove',function(e){
      var mousePosition = calculateMousePosition(e);

      paddle1Y = mousePosition.y - PADDLE_HEIGHT/2;
      //paddle2Y = mousePosition.y - PADDLE_HEIGHT/2;
      // console.log(`mouse position X: ${mousePosition.x} | mouse position Y: ${mousePosition.y}`);
    });    

    function handleMouseClick(e){
      if(showWinScreen){
        player1Score = 0;
        player2Score = 0;
        // stop all audio
        var sounds = document.getElementsByTagName('audio');
        for(i=0; i<sounds.length; i++) sounds[i].pause();        
        // start playing frames again
        intervalPointer = setInterval(drawFrames,frameRate);
        showWinScreen = false;
      }
    }

    function resetBallPosition(){
      // check the score, if WIN - reset score
      if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
        // player1Score = 0;
        // player2Score = 0;
        showWinScreen = true;
      }

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
    
      //console.log(`clientY: ${e.clientY}`)
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

    function playGameWin(){
      const audio = document.querySelector('audio[data-game='+'win');
      audio.currentTime = 0; // rewind audio to the start
      audio.play();        
    }    

    function playBallBounce(){
      const audio = document.querySelector('audio[data-ball='+'bounce');
      audio.currentTime = 0; // rewind audio to the start
      audio.play();        
    }

    function playPaddleBounce(){
      const audio = document.querySelector('audio[data-ball='+'paddle');
      audio.currentTime = 0; // rewind audio to the start
      audio.play();        
    }    

    function playBallLost(){
      const audio = document.querySelector('audio[data-ball='+'lost');
      audio.currentTime = 0; // rewind audio to the start
      audio.play();        
    }    

    function calculateObjects(){

      // basically if someone WIN we do nothing
      if(showWinScreen){
        return;
      }

      computerMovement();

      // if ball touches the border we stop calling this function
      // or we can bounce the ball back
      // if(roundBallTouchBorderX()){
      //   ballSpeedX = -ballSpeedX;
      //   //clearInterval(intervalPointer);
      // }            

      if(ballPositionX < (PADDLE_WIDTH * 2 + PADDLE_OFFSET)){
        // check if the ball hits paddle
        if(ballPositionY > paddle1Y && ballPositionY < paddle1Y + PADDLE_HEIGHT){
          ballSpeedX = -ballSpeedX;
          // get the angle after ball hits the paddle --need to fix the logic
          var deltaY = ballPositionY - (paddle1Y + PADDLE_HEIGHT/2);
          playPaddleBounce();
          ballSpeedY = deltaY * 0.25
        }else{
          // continue to move the ball till it touches the net-border
          // and reset it only after that
          if(ballPositionX < 0){
            ballSpeedX = -ballSpeedX;
            player2Score++;
            playBallLost();
            resetBallPosition();
          }
        }        
      }

      if(ballPositionX > (canvas.width - PADDLE_WIDTH * 2 - PADDLE_OFFSET)){
        // check if the ball hits paddle
        if(ballPositionY > paddle2Y && ballPositionY < paddle2Y + PADDLE_HEIGHT){
          ballSpeedX = -ballSpeedX;
          var deltaY = ballPositionY - (paddle2Y + PADDLE_HEIGHT/2);
          playPaddleBounce();
          ballSpeedY = deltaY * 0.25;          
        }else{
          if(ballPositionX > canvas.width){
            ballSpeedX = -ballSpeedX;
            player1Score++;
            playBallLost();
            resetBallPosition();
          }
        }        
      }      

      // if(roundBallTouchBorderX()){
      //   ballSpeedX = -ballSpeedX;
      //   //clearInterval(intervalPointer);
      // }        

      if(roundBallTouchBorderY()){
        playBallBounce();
        ballSpeedY = -ballSpeedY;
        //clearInterval(intervalPointer);
      }          



      shiftX+=ballSpeedX;
      shiftY+=ballSpeedY;

      ballPositionX = shiftX + canvas.width/2 - ballRadius/2;
      ballPositionY = shiftY + canvas.height/2 - ballRadius/2;
      //ballPositionY = canvas.height/2 - ballRadius/2;
    }

    function drawNet(){
      for(var i = 10; i < canvas.height; i+=40){
        drawColoredRectangle(canvas.width/2-1,i,2,20,'white');
      }
    }

    function drawFrame(){
      // draw field
      // context.fillStyle = "black";
      // context.fillRect(0,0,canvas.width,canvas.height);    
      drawColoredRectangle(0,0,canvas.width,canvas.height,fieldColor);


      // basically if someone WIN we do nothing
      if(showWinScreen){

        clearInterval(intervalPointer); // stops repeating function - pause

        playGameWin();

        // and we also must stop drawing frames!

        context.fillStyle = "white";
        context.font = "30px Arial";

        if(player1Score >= WINNING_SCORE){
          context.fillText("Human Win!",canvas.width/2 - 65,100); 
        }else if (player2Score >= WINNING_SCORE){
          context.fillText("Robot Win!",canvas.width/2 - 65,100); 
        }            

        context.font = "20px Arial";
        context.fillText("Click to continue!",canvas.width/2 - 65,canvas.height - 50);      
        //context.fillText(player2Score,canvas.width-100,50);  

        // here we also need to enable cursor
        //canvas.style.cursor("pointer");

        return;
      }     

      // draw NET
      drawNet();

      // draw paddle 1
      drawColoredRectangle(PADDLE_OFFSET,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT,paddle1Color);

      // draw paddle 2
      drawColoredRectangle(canvas.width - PADDLE_WIDTH - PADDLE_OFFSET,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT,paddle2Color);

      // draw Players score
      // context.fillText(player1Score,100,100,)
      // context.fillText(player2Score,400,100,)
      context.fillStyle = "white";
      context.font = "30px Arial";
      context.fillText("Human Score : "+player1Score,50,50);      
      context.fillText("Robot Score : "+player2Score,canvas.width-250,50);           

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