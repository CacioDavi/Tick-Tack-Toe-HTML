let turn = 'x' // define de quem pertence o turno
let hasAWinner = false; // define se há um vencedor

const congragulationsTextElement = document.getElementById('congragulations');
var x // Uma variável qualquer para testes

const getBoard = () => {
    const grid = document.getElementsByClassName('cell');
    let board = [];

    for(let linha = 0; linha < 3; linha++) {
        board.push([]);
        for (let celula = 0; celula < 3; celula++) {
            board[linha].push(grid[celula + (linha * 3)].innerText);
        }
    }
    // board[0].forEach()

    return board;
}


const checkForWinner = () => {
    let board = getBoard();
    if(!hasAWinner) {
        // verifica as linhas
        for(line in board) {
            if(!board[line].includes('')) {
                if(board[line].includes('X') && !board[line].includes('O')) {
                    hasAWinner = true;
                    return 1
                } else if(!board[line].includes('X') && board[line].includes('O')) {
                    hasAWinner = true;
                    return -1
                }
            }
        }

        // verifica as colunas
        for(let collumn = 0; collumn < 3; collumn++){
            if(board[0][collumn] !== '' && board[0][collumn] === board[1][collumn] && board[1][collumn] === board[2][collumn]) {
                hasAWinner = true;
                if(board[0][collumn] === "X") {
                    return 1;
                } else {
                    return -1;
                }
            } 
        }


        // verifica a diagonal da esquerda
        if(board[0][0] !== '' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            hasAWinner = true;
            if(board[0][0] === "X") {
                return 1;
            } else if(board[0][0] === "O") {
                return -1;
            }
        }       
    


        // verifica a diagonal da direita
        if(board[0][2] !== '' && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            hasAWinner = true;
            if(board[0][2] === "X") {
                return 1;
            } else if(board[0][2] === "O") {
                return -1;
            }
        }
            
    }
}

const SkipTurn = () => {
    if(turn == 'x'){
        turn = 'o';
    }else{ turn = 'x';}
}

const SlotClicked = (slot) => {
    let hasAWinner = checkForWinner();
    if(slot.textContent == '') {
        slot.classList.add("cell-marked");

        slot.textContent = turn;
    }

    SkipTurn();
    let winner = checkForWinner()
    console.log(hasAWinner)
    console.log(winner)
    if(!winner == '') {
        Congragulations(winner)
    }
}

const Congragulations = (winner) => {
    congragulationsTextElement.textContent = `Parabéns jogador ${winner == 1 ? 'X' : 'O'}!`
}

const Reset = () => {
    hasAWinner = false;
    congragulationsTextElement.textContent = '';
    let CellsList = document.getElementsByClassName('cell');
    if(CellsList.length > 0){
        for(let i = 0; i < CellsList.length; i++){
            CellsList[i].textContent = '';
            CellsList[i].classList.remove("cell-marked");

        }
    }
}

