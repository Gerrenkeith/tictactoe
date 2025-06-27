const body = document.querySelector('body');
const startButton = document.createElement('button')
startButton.innerText = 'Start Game';
startButton.style.backgroundColor = 'red';

startButton.addEventListener('click', () => {
    startGame()
})

body.appendChild(startButton);




const game = () => {

  const gameBoard = 
  ["", "", "", "", "", "", "", "", ""];

  console.log(gameBoard);

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    console.log(winningCombos);

const checkWinner = (board, combos) => {
    for (let i = 0; i < combos.length; i++) {
        const [a, b, c] = combos[i];
        if (
            board[a] === board[b] &&
            board[a] === board[c] &&
            board[a] !== ""
        ) {
            console.log(combos[i]);
            return true;
        }
    }
    if (board.every(cell => cell !== "")) {
        return null; // Draw
    }
    return false; // No winner yet
}

function resetGame() {
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = "";
    }
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = 0;
}       

    function createPlayer(name, marker) {
    return { name, marker };
}

    console.log(createPlayer);

    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

    console.log(player1);
    console.log(player2);



    const players = [player1, player2];
    console.log(players); 
    const playersContainer = document.createElement('div');
    playersContainer.classList.add('playersContainer');
    body.appendChild(playersContainer)
    
    for (let i = 0; i < players.length; i++){
        const playerCard = document.createElement('div');
        playerCard.classList.add('playerCard');   
        playersContainer.appendChild(playerCard)

        const name = document.createElement('h2');
        name.id = i;
        name.innerText = players[i].name
        playerCard.appendChild(name)

        const button = document.createElement('button')
        button.style.backgroundColor = 'lightgray';
        button.innerText = 'edit'


        button.addEventListener("click", () => {
                name.remove()
                button.remove()

                const nameInput = document.createElement('input')
                nameInput.classList.add('nameInput')
                const submitButton = document.createElement('button')
                submitButton.classList.add('submitButton')
                submitButton.style.background = 'lightgray';
                submitButton.innerText = '✔️'

                submitButton.addEventListener('click', () => {
                    name.innerText = nameInput.value;
                    players[i].name = nameInput.value;

                    console.log(players)

                  nameInput.remove()
                  submitButton.remove();

                    playerCard.appendChild(name)
                    playerCard.appendChild(button)
                })
                
                playerCard.appendChild(nameInput)
                playerCard.appendChild(submitButton)

        })

        playerCard.appendChild(button)
   
        }
    

 

    let currentPlayer = 0 ;

    function handleMarker(index){
        const marker = players[currentPlayer].marker;
        gameBoard[index] = marker;
        console.log(`Current Player: ${players[currentPlayer].name}`);
    }


   
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
    body.appendChild(gameContainer);

    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => {
            let winner = checkWinner(gameBoard, winningCombos)
            if(gameBoard[i] === "" && winner === false){
                handleMarker(i)
                cell.innerText = players[currentPlayer].marker
                console.log(gameBoard)
                winner = checkWinner(gameBoard, winningCombos);
                    if (winner === true){
                        setTimeout(() => {
                        alert(`${players[currentPlayer].name} wins`);
                        resetGame();
                        }, 10);
                    } else if(winner === null){
                        setTimeout(() => {
                        alert('draw');
                        resetGame();
                    }, 10);
                    }else{
                            currentPlayer = ( currentPlayer + 1 ) % players.length;
                        }
            }else if(gameBoard[i] !== "" && winner === false){
                alert(`${players[currentPlayer].name}, choose a different space`)
        };
    })
        gameContainer.appendChild(cell);
}

const resetButton = document.createElement('button');
resetButton.id = 'reset';
resetButton.style.backgroundColor = 'lightgray';
resetButton.innerText = 'Reset';

resetButton.addEventListener("click", () => {resetGame()})

body.appendChild(resetButton)
}


const startGame = () => {
    startButton.remove()
    game()
}
