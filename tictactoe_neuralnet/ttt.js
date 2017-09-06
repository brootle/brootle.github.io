// based on https://www.youtube.com/watch?v=0a-52ntK3T8

// generate a randobly sized population
// of neural nets
// score new best one
// best ones to reproduce

// let's define our tic tac toe game

var ttt = function(ttt){

    var X;
    var Y;
    var TIE;

    // this is our game field
    // 0 1 2
    // 3 4 5
    // 6 7 8

    //
    // helper classes
    //

    // initialize new board
    function newBoard(){
        return 0;
    }

    // check if the board is empty
    function isEmpty(board){
        // this will return true is board is 0
        return (board === 0);
    }

    // get value inside a square on a board
    function getPiece(board, square){
        // we represent each value as a bit
        // because operation on bit level are faster
        return ((board >> (square << 1)) & 3);

        // explanation what it means
        // square * 2^ 1
        // board / (square * 2^ 1)
        // '& 3' means we multiply by 3 because there are 3 values
        // we get bit value whenever we are in the game
    }

    // move operation
    function move(board, square, piece){
        // again we use bitwise shift operation
        return (board | (piece << (square << 1)));

        // explanation
        // ' | ' is OR operation
        // 0101
        // 0111
        // 0111 - result of ' | ' OR operation
    } 

    // Now we write GAME FUNTIONALITY
    // everything will be stored localy in LocalStorage
    // history will be stack data structure
    function Game(board, turn, history){

        // initialize valuest
        this.board = board;
        this.turn = turn;
        this.history = history;
    }

    // define PROTOTYPE of GAME object
    // all objects inherit properties from it's PROTOTYPE
    // first we define 'equals' function
    // see if two places in the game state are equal to each other
    Game.prototype.equals = function Game_equals(other){
        // other board is the next state
        // so check if boards and turns are equal
        return (this.board === other.board && this.turn === other.turn)
    }

    // define get piece method, where square is the board
    Game.prototype.getPiece = function Game_getPiece(square){
        // we actually allready defined this function
        // so we just return it
        return getPiece(this.board, square);
    }

    // define prototype for move function
    Game.prototype.move = function Game_move(square){
        // save to history board state
        this.history.push(this.board);
        // save new state to board
        this.board = move(this.board, square, this.turn);
        // turn will be bitwise XOR operation
        // its just shifting bits to trace whos move: YOU or ME
        this.turn ^=2;
    }

    // define undo function
    Game.prototype.undo = function Game_undo(){
        // get last game state from history to current board state
        this.board = this.history.pop();
        // and switch the turn back
        this.turn ^=2;
    }

    // declare the winner
    Game.prototype.winner = function Game_winner(){
        return winner(this.board);
    }

    // draw board on canvas
    function drawBoard(ctx){
        ctx.beginPath();

        ctx.moveTo(0.333, 0.05);
        ctx.lineTo(0.333, 0.95);

        ctx.moveTo(0.666, 0.05);
        ctx.lineTo(0.666, 0.95);

        ctx.moveTo(0.95, 0.333);      
        ctx.lineTo(0.95, 0.666);

        ctx.stroke();          
    }


}