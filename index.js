
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

    const getValue = () =>{
        return value;
    }

    return {setValue, getValue};

}

