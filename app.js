//create the players and set the current player to playerOne
const playerOne = "one";
const playerTwo = "two";
let currPlayer = playerOne;

//set gameOver to false at the start of the game
let gameOver = false;
let board;
let currColumns; //this will be used later to add "gravity" to the pieces

//connect four board set up with 6 rows and 7 columns
const rows = 6;
const columns = 7;

//when the page loads call a function to set the game
window.onload = function() {
    setGame();
};

//this function will populate the tiles within the board
function setGame(){
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]// all pieces will start at row 5
    for (let r=0; r<rows; r++){
        let row = [];
        for (let c=0; c<columns; c++){
            row.push(' '); //creates row array with 7 columns ' '
            //HTML create a <div id="r-c" class="tile"></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener('click', setPiece)
            document.querySelector(".board").append(tile);
            //console.log(r,c); checking to see that prints out coordinates for each tile 0-0 through 5-6
        }
        //console.log (row);check for 6 (7)[' ', ' ', ' ', ' ', ' ', ' ', ' '] so we can add it to the board
        board.push(row); 
    } 
};

function setPiece() {
    //first we want to check if game is over and if true return and do nothing so that you can't set another piece
    if(gameOver){
        return;
    }
    
    //lets get the coordinate of the piece
    let coords = this.id.split("-"); // "0-0" -> returns an array ["0", "0"]
    //becuase they are strings we need to parse them as integers
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    //if r < 0 the column is filled and we will return, no piece is set
    if(r<0) {
        return;
    }
    //with coordinates update the board with currplayer
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currPlayer == playerOne){
        tile.classList.add("playerOne-piece");
        currPlayer = playerTwo;
    } else {
        tile.classList.add("playerTwo-piece");
        currPlayer = playerOne
    }
    
    r -= 1 //updating the row height for the column
    currColumns[c] = r; //update the array

    checkWinner(); //this function should be called evertime a piece is set on the board
}

function checkWinner() {
    //learned about a techniue called the "sliding window technique"
    //horizontally
   for(let r=0; r<rows; r++){
    //C < columns -3 so that we can check 3 ahead of us with out going out of bounds
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r, c);
                    return; //no need to check vertically and diagonally if winner is set
                }
            }
        }
   }
   //vertically
   for(let c=0; c<columns; c++){
        for(let r=0; r<rows-3; r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
   }
   //anti-diagonally
   for(let r=0; r<rows-3; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                 if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r, c)
                     return;
                }
            }
        }
   }
   //diagonally
   for(let r=3; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r, c)
                    return;
                }
            }
        }
   } 
};

function setWinner(r, c){
    let winner = document.getElementById("winner")
    if(board[r][c] == playerOne){
        winner.innerText = "Player One Wins!!!!"
    } else {
        winner.innerText = "Player Two Wins!!!!"
    }
    gameOver = true;    
}