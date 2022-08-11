let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')
    let GAMEBOARD = [];


    function createBoard() {
        for (let row = 0; row < 3; row++) {
            //makes a 2d array  
            // GAMEBOARD.push([row])
            GAMEBOARD[row] = []
            //removes the first element that includes the row elemenet
            // GAMEBOARD[row].shift(0)
            for (let col = 0; col < 3; col++) {
                //appends each iteration of col in row array
                GAMEBOARD[row].push(col)
                var cell = document.createElement('div')
                gameBoardContainer.appendChild(cell)
                cell.classList.add('cell')
                // [0][0] [0][1] [0][2]
                cell.setAttribute('id', `${row}${col}`)
            }
        }
    }
    return {
        gameBoardContainer,
        createBoard,
        GAMEBOARD,
    }
})()

let displayControllers = (function () {
    let game = GameBoardModule
    let gameContainer = game.gameBoardContainer
    let mainWrapper = document.getElementById('main-wrapper')
    let playButton = document.createElement('button')

    mainWrapper.appendChild(playButton)
    playButton.textContent = 'Play Game'
    playButton.setAttribute('id', 'play-game')
    mainWrapper.removeChild(gameContainer)
    playButton.addEventListener('click', () => {
        mainWrapper.appendChild(gameContainer)
        mainWrapper.removeChild(playButton)
        ticTacToe.playGame()


    })

    function states(isGO) {
        let restartGame = document.createElement('button')
        restartGame.setAttribute('id', 'restart-button')
        if (isGO) {
            // mainWrapper.removeChild(gameContainer)
            mainWrapper.appendChild(restartGame)
            restartGame.textContent = "play again?"
            // gameContainer.setAttribute('style', 'width: 100px; height:100px;,position:absolute;, left:100px')
        }
        restartGame.addEventListener('click', () => {
            location.reload();

        })
    }

    return {
        states
    }
})()





function aI() {
    let cells = document.getElementsByClassName('cell')
    let cellArray = Array.from(cells)

    function IdRandomizer(num) {
        return Math.floor(Math.random() * num)
    }


    function enemyMove(playerID) {
        console.log('called')
        let firstNum = IdRandomizer(3)
        let secondNum = IdRandomizer(3)
        let aIidentifier = `${firstNum}${secondNum}`

        cellArray.forEach(cell => {
            if (aIidentifier == cell.id && cell.textContent == '') {
                setTimeout(
                    () => {
                        cell.textContent = 'X'
                        console.log('enemy ' + cell.id)
                    }, 500)

            } else if (aIidentifier == cell.id) {
                enemyMove()
                console.log('same ID ' + cell.id + ' <cellid || playerID> ' + playerID)
                console.log('same ID ' + cell.id + ' <cellid || aiId> ' + aIidentifier)
                let i = 0
            }

        })
    }

    return {
        IdRandomizer,
        enemyMove
    }
}


function player(pick) {
    let GameBoard = GameBoardModule

    function playerMove(e) {
        let playerID = e.target.id
        if (!e.target.matches('.cell')) return
        e.target.textContent = pick
        e.target.classList.add(pick)
        setColor(e)
    }

    function setColor(event) {
        if (pick == 'O') {
            event.target.setAttribute('style', 'background-color:#fb4934')
            console.log('change color')
        } else if (pick == 'X') {
            event.target.setAttribute('style', 'background-color:#83a598')
        }
    }




    function checkHorizontal(cellArray) {
        // im cheating
        for (let i = 0; i < cellArray.length; i++) {
            let nextCell = cellArray[i].nextElementSibling;
            let previousCell = nextCell.previousElementSibling; // looks at previous cell of nextCell
            let thirdCell = nextCell.nextElementSibling;
            if (nextCell.classList.contains(pick) && previousCell.classList.contains(pick) &&
                thirdCell.classList.contains(pick)) {
                return true
            } else {
                return false
            }

        }
    }

    function checkVertical(arr, cell, nth) {
        let startingPoint = arr.indexOf(cell)
        let thirdCell = [];
        for (let i = 0; i < arr.length; i += nth) {
            let getThirdCell = (i + startingPoint) % arr.length
            thirdCell.push(arr[getThirdCell])
        }

        if (thirdCell[0].classList.contains(pick) && thirdCell[1].classList.contains(pick) &&
            thirdCell[2].classList.contains(pick)) {
            return true
        } else {
            return false
        }
    }

    function checkDiagonal(cellArray) {
        for (let i = 0; i < cellArray.length; i++) {
            if (cellArray[0].classList.contains(pick) && cellArray[4].classList.contains(pick) &&
                cellArray[8].classList.contains(pick) || cellArray[2].classList.contains(pick) && cellArray[4].classList.contains(pick) &&
                cellArray[6].classList.contains(pick)) {
                return true
            } else {
                return false
            }
        }
    }
    return {
        playerMove,
        pick,
        checkHorizontal,
        checkVertical,
        checkDiagonal

    }
}



//Game logic
let ticTacToe = (function () {
    // handles the game logic
    let boardModule = GameBoardModule
    let createGame = boardModule.createBoard
    let playerOne = player('O')
    let playerTwo = player('X')
    let AI = aI()
    let displayReset = displayControllers.states
    let playerOneClick = {
        isTurn: true
    }
    let playerTwoClick = {
        isTurn: false
    }
    let isGameOver = false

    function playGame() {
        console.log('Tic-Tac-Toe is running')
        createGame()
        let cellArray = Array.from(document.getElementsByClassName('cell'))
        let announcer = document.getElementById('announcer')


        //playercontroller
        cellArray.forEach(cell => {
            cell.addEventListener('click', (e) => {
                playerTurns(e,cellArray)
                if (
                    playerOne.checkVertical(cellArray, cell, 3) ||
                    playerOne.checkDiagonal(cellArray) ||
                    playerOne.checkHorizontal(cellArray)
                ) {
                    isGameOver = true
                    console.log('player 0 wins')
                    announcer.textContent = 'Player 0 Wins'
                    playerOne.playerMove
                    displayReset(isGameOver)
                } else if (
                    playerTwo.checkVertical(cellArray, cell, 3) ||
                    playerTwo.checkDiagonal(cellArray) ||
                    playerTwo.checkHorizontal(cellArray)
                ) {
                    isGameOver = true
                    console.log('player X wins')
                    announcer.textContent = 'Player X Wins'
                    displayReset(isGameOver)
                }
            })
        })

    }


    function playerTurns(event,cellarr) {

        if (!isGameOver) {
            if (playerOneClick.isTurn) {
                playerOne.playerMove(event)
                playerOneClick.isTurn = false;
                playerTwoClick.isTurn = true;
            } else if (playerTwoClick.isTurn) {
                playerTwo.playerMove(event)
                // resets isTurn on both players
                playerOneClick.isTurn = true;
                playerTwoClick.isTurn = false;
            }
        } 
    }
    return {
        isGameOver,
        playGame
    }

})()