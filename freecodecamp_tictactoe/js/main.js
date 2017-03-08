
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    var player = "X";
    var computer = "O";    

    const blocks = document.querySelectorAll('span[data-state]');

    // first we need to choose who we play X or O
    const x_and_y = document.querySelectorAll('.choice');
    //console.log(x_and_y);
    x_and_y.forEach(selectedSide => selectedSide.addEventListener('click', setPlayerSide));

    function setPlayerSide(e){
      resetGameData();

      const state = e.currentTarget.getAttribute("data-player-choice");
      //console.log(state);
      player = state;
      computer = player === "X" ? "O" : "X";
      //console.log(player + " : " + computer);

      // hide info windo
      // this.classList.toggle('open');
      document.querySelector('.info-window').classList.toggle('hide');

      // X always makes 1st move
      if(computer==="X"){
        computerMove();
      }

    }


    // console.log(blocks[0]);

    //blocks.forEach(block => block.addEventListener('click', putXO));
    blocks.forEach(block => block.addEventListener('click', playerMove));

    function playerMove(e){
      //console.log("player moves");

      // 1. make move
      const state = e.currentTarget.getAttribute("data-state");

      if(state==="empty"){
        e.currentTarget.textContent = player;
        // change font-size from 0 to 7 for animation
        e.currentTarget.style.fontSize = "7em";
        // change state to X
        e.currentTarget.setAttribute("data-state",player);         
      }

      // 2. check for draw
      if(isDraw()){
        showStartWindow(`draw!`); 
      }      

      // 3. check for win
      if(whoWin() === player){
        showStartWindow(`${player} win!`);
      }         

      // 4. give move to computer
      if(whoWin() === undefined){
        // let computer move after our animation ended
        e.currentTarget.addEventListener('transitionend',computerMove);
      }

    }

    function showStartWindow(message){
        //console.log("show start window");
        document.querySelector('.win-message span').textContent = message;
        document.querySelector('.info-window').classList.toggle('hide');      
    }

    function isDraw(){
      const emptyBlocks = document.querySelectorAll('span[data-state="empty"]');
      if(emptyBlocks.length < 1 && whoWin() === undefined){
        return true;
      }
      return false;
    }

    function resetGameData(){
      //const blocks = document.querySelectorAll('span[data-state]');
      //blocks.forEach(block => block.setAttribute("data-state", "empty"));
      blocks.forEach(function(block) {
          block.setAttribute("data-state", "empty");
          block.textContent = "";
          block.style.fontSize = "0";
          block.removeEventListener('transitionend',computerMove);
      });      
    }

    function computerMove(){

      const emptyBlocks = document.querySelectorAll('span[data-state="empty"]');
      if(emptyBlocks.length > 0){
        const randomPosition = Math.floor(Math.random() * emptyBlocks.length);
        //console.log(randomPosition);
        emptyBlocks[randomPosition].textContent = computer;
        // increase font-size for animation font-size: 0em; -> font-size: 7em;
        emptyBlocks[randomPosition].style.fontSize = "7em";
        emptyBlocks[randomPosition].setAttribute("data-state",computer);  
      }
      

      // after computer moves 

      // check if computer wins
      if(whoWin() === computer){
        showStartWindow(`${computer} win!`);
      }      

      // check if it's a draw
      if(isDraw()){
        showStartWindow(`draw!`);         
      }
     
    }

    function whoWin(){
      // check horizontal
      for(var j = 1; j < 9; j+=3){
        for(var i = j; i < j+2; i++){
          if(blocks[i].textContent !== blocks[i-1].textContent || blocks[i].textContent === ''){
            //move to next line
            i = j+2;
          } else if(i === j+1){
            return blocks[i].textContent;
          }
        }
      }

      // check vertival
      for(var j = 3; j < 6; j++){
        for(var i = j; i < j+4; i+=3){
          if(blocks[i].textContent !== blocks[i-3].textContent || blocks[i].textContent === ''){
            //return undefined;
            i = j+4;
          } else if(i === j+3){
            return blocks[i].textContent;
          }
        }        
      }

      // check diagonal from left to right
      if(blocks[0].textContent===blocks[4].textContent && blocks[0].textContent===blocks[8].textContent && blocks[0].textContent !== ''){
        return blocks[0].textContent;
      }

      // check diagonal from right to left
      if(blocks[2].textContent===blocks[4].textContent && blocks[2].textContent===blocks[6].textContent && blocks[2].textContent !== ''){
        return blocks[2].textContent;
      }      

      return undefined;   

      
    }

});