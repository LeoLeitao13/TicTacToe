const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageText = document.querySelector('[data-winnin-message-text]');
const winningMessage = document.querySelector('[data-winnin-message]');
const restartClick = document.querySelector('[data-restart]')

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Funçao para começar o jogo
const startGame = () => {
    isCircleTurn = false;

    for(const cell of cellElements){
        cell.classList.remove('circulo')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message")
}

const endGame = (isDraw) => {
    if(isDraw){
        winningMessageText.innerText = 'Empate!';
    } else {
        winningMessageText.innerText = isCircleTurn ? 'O Venceu!': 'X Venceu!';
    }
    
    winningMessage.classList.add("show-winning-message");
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        //Every vai ver se alguma celula esta presente em todas as celulas que correspondem a vitoria
        return combination.every(index =>{
            //celula nessa index contem o current player? se sim contem  vai para a proxima
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkForDraw = () => {

    return [...cellElements].every(cell =>{ //cellElements nao é uma lista por isso o [], para conseguir usar o every
        return cell.classList.contains('x') || cell.classList.contains('circulo');
    }) 
}

// Funcao para marcar
const placeMark = (celulas, classToAdd) => {
    celulas.classList.add(classToAdd);
}

//Funçao para setar x e o e o hover ao dar restart

const setBoardHoverClass = () => {
    board.classList.remove('x');
    board.classList.remove('circulo');

    if(isCircleTurn){
        board.classList.add('circulo');
    } else {
        board.classList.add('x');
    }
}


//Funcao para trocar o simbolo
const swapTurn = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    //Colocar o X ou o Circulo
    const celulas = e.target;
    const classToAdd = isCircleTurn ? 'circulo' : 'x';

    placeMark(celulas, classToAdd);

    //Checar por vitoria em todo o clique
    const isWin = checkForWin(classToAdd);

    //Verificar por empate
    const isDraw = checkForDraw();

    if(isWin){
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //Mudar o simbolo
        swapTurn()
    }
}


startGame();

restartClick.addEventListener('click', startGame);