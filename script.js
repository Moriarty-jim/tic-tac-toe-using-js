
const gameStats = document.querySelector('.game-stats');
let currentPlayer = 'X';

const winner = () => `player ${currentPlayer} has won`;
const drawCondition = () => `its a draw`;
const playeTurnIndicatur = () =>  `Its ${currentPlayer}'s turn`;

gameStats.innerHTML = playeTurnIndicatur();

let boardState = ['','','','','','','','',''];
let gameOn = true;

//game logic
//here cell is the individual div with class griditem looped by the foreach
document.querySelectorAll('.grid-item').forEach(cell => cell.addEventListener('click', cellClicked));


function cellClicked(cellClickedEvent){
    clickedCell = cellClickedEvent.target;
    clickdCellIndex = clickedCell.getAttribute('data-cellIndex')
    if(boardState[clickdCellIndex] != '' || !gameOn)
    {
        return;
    }
    cellPlayed(clickedCell, clickdCellIndex);
    validateResult();
}

function cellPlayed(clickedCell, clickdCellIndex){

    boardState[clickdCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer
    
}

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
]
function validateResult(){
    let gameWon = false;
    for(let i=0; i < 8; i++){
        let individualCondition = winConditions[i];
        let a = boardState[individualCondition[0]];
        let b = boardState[individualCondition[1]];
        let c = boardState[individualCondition[2]];
        if(a === '' || b === '' || c === '' ){
            continue;
        }
        if(a == b && b == c){
            gameWon = true;
            break;
        }
    }

    if(gameWon){
        gameOn = false;
        gameStats.innerHTML = winner();
        return;
    }

    if(!boardState.includes(''))
    {
        gameStats.innerHTML = drawCondition();
        return;
    }
    playerChange();
}
function playerChange(){
    if(currentPlayer ==='X'){
        currentPlayer = 'O';
    }
    else if(currentPlayer === 'O'){
        currentPlayer = 'X';
    }
    gameStats.innerHTML = playeTurnIndicatur();
}

//restart
document.querySelector('.btn-restart').addEventListener('click', gameRestart);

function gameRestart()
{
    boardState = ['','','','','','','','',''];  
    document.querySelectorAll('.grid-item').forEach(cell => cell.innerHTML='');
    gameOn = true;
}