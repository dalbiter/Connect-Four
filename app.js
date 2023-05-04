//create the players and set the current player to playerOne
const playerOne = "one";
const playerTwo = "two";
let currPlayer = playerOne;

//set gameOver to false at the start of the game
const gameOver = false;
let board;

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
    for (let r=0; r<rows; r++){
        let row = [];
        for (let c=0; c<columns; c++){
            row.push(' '); //creates row array with 7 columns ' '
            //HTML create a <div id="r-c" class="tile"></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.querySelector(".board").append(tile);
            //console.log(r,c); checking to see that prints out coordinates for each tile 0-0 through 5-6
        }
        //console.log (row);check for 6 (7)[' ', ' ', ' ', ' ', ' ', ' ', ' '] so we can add it to the board
        board.push(row); 
    } 
}