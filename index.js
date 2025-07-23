
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

//TODO: MAKE THIS A MODULE INSTEAD OF A FACTORY
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


    //A function that displays the gameboard to the console
    //Inputs:
    //Return:
    const displayBoard = () => {

        let firstRow = board[0].map(cell => cell.getValue());
        let secondRow = board[1].map(cell => cell.getValue());
        let thirdRow = board[2].map(cell => cell.getValue());
        
        console.log(`Row 1: ${firstRow}`);
        console.log(`Row 2: ${secondRow}`);
        console.log(`Row 3: ${thirdRow}`);
    }


    //A funciton that checks if the gameboard is in a winning state, and returns the winning players token
    //Inputs:
    //Return: "X" or "O" or null
    const checkWin = () => {

        //Defines the all possible winning lines
        const lines = [

            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ]

        //Loop through the winning lines above
        for (let line of lines) {
            const [a, b, c] = line;
            //Accesses the board at coordinate a ([0,0], or [1, 0] , or [2, 0])
            const valA = board[a[0]][a[1]].getValue(); 
            const valB = board[b[0]][b[1]].getValue();
            const valC = board[c[0]][c[1]].getValue();

            //valA valB and valC together represent any given line on the board 
            
            //check if this line is winning
            if (valA && valA === valB && valA === valC) {
                return valA; // "X" or "O"
            }
        }

        return null;
    }

    return {getBoard, addMarker, displayBoard, checkWin};
}


//The GameController controlls the flow of the game and creates the players
function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){

    board = GameBoard()

    players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let currPlayer = players[0];

    //A function that switches the active player
    //Inputs: none
    //Return: none
    const switchPlayerTurn = () => {

        //Can we just check which player is active and then invert it?
        if (currPlayer == players[0]){
            currPlayer = players[1];
        }else if (currPlayer == players[1]){
            currPlayer = players[0];
        }

    }

    //Optional probably not needed
    const getCurrentPlayer = () => {
        return currPlayer;
    }


    return {switchPlayerTurn, getCurrentPlayer}

}



