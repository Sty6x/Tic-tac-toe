console.log('heyho')


let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')
    let GAMEBOARD = [];

    function createBoard() {
        for (let row = 0; row < 3; row++) {
            //makes a 2d array  
            GAMEBOARD.push([row])
            //removes the first element that includes the row elemenet
            GAMEBOARD[row].shift(0)
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



// MAKE 2 PLAYERS DUMBASS AHAHHAHA
function player(pick) {
    let GameBoard = GameBoardModule
    let GameboardContainer = GameBoard.gameBoardContainer;
    let Ai = aI()

    function playerMove(e) {
        let playerID = e.target.id
        if (!e.target.matches('.cell')) return
        e.target.textContent = pick
        // console.log('player' + ' ' + playerID)
        // if player wants to play with a computer
        // enemy.enemyMove(playerID)
        // GameboardContainer.addEventListener('click', (e) => {

        // })


    }
    return {
        playerMove,
        pick,

    }
}



// Do Game logic first and then after that do displayControllers

let gameLogicModule = (function () {
    // handles the game logic
    let cells = document.getElementsByClassName('cell')
    let cellArray = Array.from(cells)

    let boardModule = GameBoardModule
    let createGame = boardModule.createBoard
    let playerOne = player('O')
    let playerTwo = player('X')
    let AI = aI()


    function playGame() {

        console.log('playGame is running')




        let playerOneClick = {
            didClick: false,
            isTurn: false
        }
        let playerTwoClick = {
            didClick: false,
            isTurn: false
        }
        function turns() {
            console.log('Check Turns\n', {
                'Player One turn': playerOneClick.isTurn
            }, {
                'Player Two turn': playerTwoClick.isTurn
            })


            playerOneClick.isTurn = true;
            if (playerOneClick.isTurn) {
                boardModule.gameBoardContainer.addEventListener('click',e=>{
                    playerOne.playerMove(e)
                    playerOneClick.isTurn = false;
                    playerTwoClick.isTurn = true;
                })
                
                console.log('from first click for player 1\n', {
                    'Player One turn': playerOneClick.isTurn
                }, {
                    'Player Two turn': playerTwoClick.isTurn
                })
            }
                
            
            // OVERWRITING PLAYER 1
            if (playerTwoClick.isTurn) {
                // console.log('run from player 2')
                boardModule.gameBoardContainer.addEventListener('click',e=>{
                    playerTwo.playerMove(e)
                    playerTwoClick.isTurn = false;
                    playerOneClick.isTurn = true;
                })
                
                console.log('from first click for player 2\n', {
                    'Player One turn': playerOneClick.isTurn
                }, {
                    'Player Two turn': playerTwoClick.isTurn
                })
            }
            
            console.log('Check Changes\n', {
                'Player One turn': playerOneClick.isTurn
            }, {
                'Player Two turn': playerTwoClick.isTurn
            })

        }

        
        // click in invoke click invoke click invoke
        boardModule.gameBoardContainer.addEventListener('click', e => {
            turns()

        })
        createGame()

    }

    return {
        playGame
    }
})()

gameLogicModule.playGame()

let displayControllers = (function () {
    // handles the display in browser
})()