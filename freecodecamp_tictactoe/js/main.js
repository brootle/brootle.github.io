
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
      console.log(state);
      player = state;
      computer = player === "X" ? "O" : "X";
      //console.log(player + " : " + computer);

      // hide info windo
      // this.classList.toggle('open');
      document.querySelector('.info-window').classList.toggle('hide');
    }


    // console.log(blocks[0]);

    blocks.forEach(block => block.addEventListener('click', putXO));

    function putXO(e){
      const state = e.currentTarget.getAttribute("data-state");
      //console.log(state);

      if(state==="empty"){
        e.currentTarget.textContent = player;

        // change state to X
        e.currentTarget.setAttribute("data-state",player);
        // check who win after we make a move
        console.log(whoWin());

        // let computer make a move only if we didn't  win already
        if(whoWin() === undefined){
          computerMove();
          // check who win after we make a move
          console.log(whoWin()); 
          if(whoWin() === computer){
            console.log("show start window");
            document.querySelector('.win-message span').textContent = `${computer} win!`;
            document.querySelector('.info-window').classList.toggle('hide');
          }
        } else {
          // reset all values in the field
          console.log("show start window");
          // update who win
          // show start window
          document.querySelector('.win-message span').textContent = `${player} win!`;
          document.querySelector('.info-window').classList.toggle('hide');
        }
       
      }
    }

    function resetGameData(){
      //const blocks = document.querySelectorAll('span[data-state]');
      //blocks.forEach(block => block.setAttribute("data-state", "empty"));
      blocks.forEach(function(block) {
          block.setAttribute("data-state", "empty");
          block.textContent = "";
      });      
    }

    function computerMove(){
      const emptyBlocks = document.querySelectorAll('span[data-state="empty"]');
      if(emptyBlocks.length > 0){
        //console.log(emptyBlocks.length);
        const randomPosition = Math.floor(Math.random() * emptyBlocks.length);
        //console.log(randomPosition);
        emptyBlocks[randomPosition].textContent = computer;
        emptyBlocks[randomPosition].setAttribute("data-state",computer);
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