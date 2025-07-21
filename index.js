
// A Cell represents one square on the gameboard
// A Cell can have the following values:
// null - empty Cell
// X - cell has an X
// O - cell has a 0

function Cell(){

    value = null;

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

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < cols; j++){
            board[i].push(Cell());
        }
    }

    console.log(board[2][1].getValue());

    const getBoard = () => {
        return board
    }


    return {getBoard};
}




