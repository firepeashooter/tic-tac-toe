
// A Cell represents one square on the gameboard
// A Cell can have the following values:
// null - empty Cell
// X - cell has an X
// O - cell has a 0

function Cell(){

    let value = "empty";

    //takes in a player token and changes it's value
    const setValue = (player) => {

        value = player;
    }

    const getValue = () => {
        return value;
    }

    return {setValue, getValue};

}


// The Gameboard represents the tic tac toe board
// it containts a 2D array of Cells.
function GameBoard(){

    const board = [];
    const rows = 3;
    const cols = 3;

    //Creates the board and fills it with cells
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < cols; j++){
            board[i].push(Cell());
        }
    }

    //A fuction to return the board (for later UI display)
    //Inputs:
    //Return:
    const getBoard = () => {
        return board;
    }

    //A function that adds a player marker to the specified x, y of the gameboard
    //Inputs:
    //Return:
    const addMarker = (x, y, marker)  => {

        //If x or y is out of bounds throw an error
        if(x >= 3 || y >= 3 || x < 0 || y < 0){
            throw new Error("Marker coords must be between 0 and 2 inclusive");
        }

        const cell = board[x][y];

        //If there is no marker already there
        if (cell.getValue() == "empty"){
            cell.setValue(marker);
        }else{
            throw new Error("Marker cannot be placed on an existing marker");
        }
    }


    const displayBoard = () => {

        let firstRow = board[0].map(cell => cell.getValue());
        let secondRow = board[1].map(cell => cell.getValue());
        let thirdRow = board[2].map(cell => cell.getValue());
        
        console.log(`Row 1: ${firstRow}`);
        console.log(`Row 2: ${secondRow}`);
        console.log(`Row 3: ${thirdRow}`);
    }

    return {getBoard, addMarker, displayBoard};
}


//Test Code for displayBoard()
board = GameBoard();

board.displayBoard();

board.addMarker(1,2, "X");

board.displayBoard();