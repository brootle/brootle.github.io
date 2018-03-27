document.addEventListener('DOMContentLoaded', function () {

  var nextButton = document.querySelector("#next-button");
  var backButton = document.querySelector("#back-button");

  var videos = ["video 1", "video 2", "video 3", "video 4", "video 5", "video 6", "video 7", "video 8"];

  // everything will be based on what video is central 
  // max is the last video, leght - 1;
  var centralVideoIndex = 7; // it must be less than videos lengh -1

  // how many items will exist on a page
  var intemsNumber = 5;

  // we need to fill positions based on videos that we have and based on how many of them we have
  // in total we only have 5 available positions
  // there will be 3 visible blocks

  var positions = new Array();
  fillPositions();
  console.log(positions);
  

  nextButton.addEventListener("click", moveNext); 
  backButton.addEventListener("click", moveBack); 

  function fillPositions(){
      console.log("filling positions....");
      // we fill positions array based of index of central video
      // 3-2=1 | 3-1=2 | 3-0=3 | 3+1=4 | 3+2=5
      for (i = -2; i < intemsNumber - 2; i++){
          if((centralVideoIndex+i)<0){
              positions.push(videos.length+i+1);
          } else if((centralVideoIndex+i) > videos.length-1){
              positions.push(centralVideoIndex+i - videos.length);
          } else{
              positions.push(centralVideoIndex+i);
          }
      }
  }

  function moveNext(){
      console.log("move next");

      // when we click next we update positions in the array
      // [1,2,3,4,5] => [2,3,4,5,6]
      
      positions = positions.map(position => {
          position-=1;
          // if position is <0 videos lenght-1 we assign videos.length - 1 to position
          if(position < 0){
              position = videos.length - 1;
          }
          return position;
      });

      console.log(positions);
  }

  function moveBack(){
      console.log("move back");

      // [1,2,3,4,5] => [0,1,2,3,4]

      positions = positions.map(position => {
          position+=1;
          // if position is > videos lenght-1 we assign 0 to position
          if(position > videos.length -1){
              position = 0;
          }          
          return position;
      });

      console.log(positions);      
  }


//   activePlayer = 6;
//   cardNumber = 3;

//   var dealButton = document.querySelector("button");
//   dealButton.addEventListener("click", dealCard);  

//   function dealCard(){

//     // get coordinates of the deck card
//     deckCard = document.querySelector('#deckCard');
//     deckCardCoordinates = deckCard.getBoundingClientRect();

//     console.log(deckCardCoordinates);

//     // get coordinates of the empty card of the player
//     emptyCardHolder = document.querySelector(`#player${activePlayer} .card-placeholder:nth-of-type(${cardNumber})`);
//     emptyCardHolderCoordinates = emptyCardHolder.getBoundingClientRect();    

//     console.log(emptyCardHolderCoordinates);

//     // calculate delta between coordinates
//     deltaX = emptyCardHolderCoordinates.left - deckCardCoordinates.left;
//     deltaY = emptyCardHolderCoordinates.top - deckCardCoordinates.top;

//     // move card

//     deckCard.style["transform"] = `translate(${deltaX}px,${deltaY}px)`;

//     console.log("card moved");
//   }

});