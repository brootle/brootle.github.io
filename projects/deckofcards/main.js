document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript');

  activePlayer = 6;
  cardNumber = 3;

  var dealButton = document.querySelector("button");
  dealButton.addEventListener("click", dealCard);  

  function dealCard(){

    // get coordinates of the deck card
    deckCard = document.querySelector('#deckCard');
    deckCardCoordinates = deckCard.getBoundingClientRect();

    console.log(deckCardCoordinates);

    // get coordinates of the empty card of the player
    emptyCardHolder = document.querySelector(`#player${activePlayer} .card-placeholder:nth-of-type(${cardNumber})`);
    emptyCardHolderCoordinates = emptyCardHolder.getBoundingClientRect();    

    console.log(emptyCardHolderCoordinates);

    // calculate delta between coordinates
    deltaX = emptyCardHolderCoordinates.left - deckCardCoordinates.left;
    deltaY = emptyCardHolderCoordinates.top - deckCardCoordinates.top;

    // move card

    deckCard.style["transform"] = `translate(${deltaX}px,${deltaY}px)`;

    console.log("card moved");
  }

});
