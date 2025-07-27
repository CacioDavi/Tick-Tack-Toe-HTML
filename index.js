let turn = 'x' // define de quem pertence o turno
let hasAWinner = false; // define se há um vencedor

const congragulationsTextElement = document.getElementById('congragulations'); // obtém o elemento que revela o vencedor do jogo

// constrói uma cópia do tabuleiro do usuário para ser usada nas verficações
const getBoard = () => {
    const grid = document.getElementsByClassName('cell');
    let board = [];

    for(let linha = 0; linha < 3; linha++) {
        board.push([]);
        for (let celula = 0; celula < 3; celula++) {
            board[linha].push(grid[celula + (linha * 3)].innerText);
        }
    }

    return board; // board[linha][coluna]
}

// verifica se já temos um vencedor
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

// Altera o texto, o que consequentemente altera o turno dos jogadores
const SkipTurn = () => {
    if(turn == 'x'){
        turn = 'o';
    }else{ turn = 'x';}
}

// Responsável por atualizar o tabuleiro, e chamar as funções necessárias para o funcionamento do jogo
const SlotClicked = (slot) => {
    if(slot.textContent == '' && !hasAWinner) {
        slot.classList.add("cell-marked");
        slot.textContent = turn;
    }

    SkipTurn();
    let winner = checkForWinner();
    if(!winner == '') {
        Congragulations(winner)
    }
}

// Revela o vencedor do jogo
const Congragulations = (winner) => {
    congragulationsTextElement.textContent = `Parabéns jogador ${winner == 1 ? 'X' : 'O'}!`
    let cells = document.getElementsByClassName("cell")
    for (let cell = 0; cell < cells.length; cell++) {
        if (!cells[cell].classList.contains('cell-marked')) {
            cells[cell].classList.add("cell-marked");
        }
    };

}

// Reseta o tabuleiro e as variáveis para que um novo jogo comece
const Reset = () => {
    hasAWinner = false;
    congragulationsTextElement.textContent = '';
    turn = 'x';
    let CellsList = document.getElementsByClassName('cell');
    if(CellsList.length > 0){
        for(let i = 0; i < CellsList.length; i++){
            CellsList[i].textContent = '';
            CellsList[i].classList.remove("cell-marked");

        }
    }
}

