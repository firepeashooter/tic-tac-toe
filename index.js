
// A Cell represents one square on the gameboard
// A Cell can have the following values:
// null - empty Cell
// X - cell has an X
// O - cell has a 0

function Cell(){

    let value = null;

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
    let usedCells = 0;

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
    //Return: true if cell was added, false if cell was not added
    const addMarker = (x, y, marker)  => {

        //If x or y is out of bounds throw an error
        if(x >= 3 || y >= 3 || x < 0 || y < 0){
            throw new Error("Marker coords must be between 0 and 2 inclusive");
        }

        const cell = board[x][y];

        //If there is no marker already there
        if (cell.getValue() == null){
            cell.setValue(marker);
            usedCells += 1;
            return true;
        }else{
            console.log('Cannot Place a marker on an existing one');
            return false;
        }


    }

    const resetBoard = () => {

        //iterate through the board and set all the cell values to null

        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                board[i][j].setValue(null);
            }
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

    const checkTie = () => {
        return usedCells >= 9;
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

    return {getBoard, addMarker, displayBoard, checkWin, checkTie, resetBoard};
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


    const getCurrentPlayer = () => {
        return currPlayer;
    }


    const printNewRound = () => {
        
        board.displayBoard();
        console.log(`${getCurrentPlayer().name}'s turn`);

    }

    const resetGame = () => {
        board.resetBoard();
        currPlayer = players[0];
    }


    const playRound = (row, col) => {
        
        if (board.addMarker(row, col, getCurrentPlayer().token)){

        
            let gameTie = board.checkTie();

            if (board.checkWin() != null){

                //Win condition
                let winningToken = board.checkWin();
            
            

                if (winningToken == "X"){
                    alert(`Game Over! ${players[0].name} wins!`)
                    return true;
                }else if (winningToken == "O"){
                    alert(`Game Over! ${players[1].name} wins!`)
                    return true;
                }

            
            }else{

                if (gameTie == true){
                    alert(`Game Tie!`);
                    return true;
                }

                switchPlayerTurn();
                printNewRound();
            }
        }else{
            return false;
        };
        
    }


    return {playRound, resetGame, getCurrentPlayer, getBoard: board.getBoard};

}



function ScreenController(){

    const playerTurnHeader = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const startButton = document.querySelector('.start--button');
    const dialogue = document.querySelector('.dialogue');
    const submit = document.querySelector('.submit');
    const form = document.querySelector('.start--form');
    const rows = 3;
    const cols = 3;
    let game;
    let gameOver = false;
    let gameStart = false;

    const initialRender = () => {
        for (let i = 0; i < rows; i ++){
            for (let j = 0; j < cols; j++){
                const cell = document.createElement("div");
                cell.classList.add("cell");
                boardDiv.appendChild(cell);
            }
        }
    };

    const updateScreen = () => {

        const board = game.getBoard();
        const currPlayer = game.getCurrentPlayer();

        //display current player name

        
        playerTurnHeader.textContent = currPlayer.name + '\'s Turn';

        //clear the board
        boardDiv.textContent = '';

        //loop through the board and add the squares back to the boardDiv
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                const cellButton = document.createElement("div");

                cellButton.classList.add("cell");
                
                if (board[i][j].getValue() == "X"){
                    cellButton.innerHTML = '<svg style="pointer-events:none;" width="100" height="100" viewBox="0 0 100 100"> <line x1="20" y1="20" x2="80" y2="80" stroke="#FFA500" stroke-width="10"/><line x1="80" y1="20" x2="20" y2="80" stroke="#FFA500" stroke-width="10"/></svg>';
                }else if (board[i][j].getValue() == "O"){
                    cellButton.innerHTML = '<svg style="pointer-events:none;" "width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" stroke="#1E90FF" stroke-width="10" fill="none"/></svg>';
                };
                cellButton.dataset.row = i;
                cellButton.dataset.col = j;
                boardDiv.appendChild(cellButton);


            }
        }
    }

       

    function startGame() {
        gameStart = true;
        gameOver = false;

        dialogue.showModal();
        dialogue.classList.add("show");
        
    }


    function clickHandelerBoard(e){

        if (gameOver){
            gameStart = false;
            return;
        }

        if (!gameStart){
            return;
        }
        
        const selectedRow = parseInt(e.target.dataset.row);
        const selectedCol = parseInt(e.target.dataset.col);

        let returnCode = game.playRound(selectedRow, selectedCol);
        
        if (returnCode == true){
            gameOver = true;
        }else if (returnCode == false){
            let cell = e.target.closest(".cell");

            cell.classList.add("active");

            setTimeout(() => {cell.classList.remove("active")}, 100);
            return;
        }
            
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandelerBoard);
    startButton.addEventListener("click", startGame);

    submit.addEventListener("click", () => {

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let p1Name = data.player1;
        let p2Name = data.player2;

        if (p1Name == ''){
            p1Name = "Player 1";
        }

        if (p2Name == ''){
            p2Name = "Player 2";
        }
        
        game = GameController(p1Name, p2Name);

        game.resetGame();
        updateScreen();


        form.reset();
        dialogue.close();
        dialogue.classList.remove("show");
    })




    //initially renders the screen
    initialRender();
    console.log("initially rendered");
}

ScreenController();

