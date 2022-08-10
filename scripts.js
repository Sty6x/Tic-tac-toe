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

        // console.log(e.target.classList)
        // aI().enemyMove()
    }

    function setColor(event) {
        // if (pick == 'O') {
        //     event.target.setAttribute('style', 'background-color:#fb4934')
        //     console.log('change color')
        // } else if (pick == 'X') {
        //     event.target.setAttribute('style', 'background-color:#83a598')
        // }
    }


    // giving each cell a function that returns the current cell and loops 
    //through cell array starting from the current cell


    function checkWin(cellArray, event) {
        // checks horizontally
        // working
        for (let i = 0; i < cellArray.length; i++) {
            let nextCell = cellArray[i].nextElementSibling;
            let previousCell = nextCell.previousElementSibling; // looks at previous cell of nextCell
            let thirdCell = nextCell.nextElementSibling;

            if (nextCell.classList.contains(pick) && previousCell.classList.contains(pick) &&
                thirdCell.classList.contains(pick)) {
                console.log(`${pick} wins`)
            }
        }

    }



    return {
        playerMove,
        pick,
        checkWin

    }
}



// Do Game logic first and then after that do displayControllers

let ticTacToe = (function () {
    // handles the game logic
    let boardModule = GameBoardModule
    let createGame = boardModule.createBoard
    let playerOne = player('O')
    let playerTwo = player('X')
    let AI = aI()


    function playGame() {
        console.log('Tic-Tac-Toe is running')
        createGame()
        // cellArrays available after createGame is invoked
        let cellArray = Array.from(document.getElementsByClassName('cell'))


        function getVertAndDiag(arr, cell, nth) {
            let startingPoint = arr.indexOf(cell)
            let thirdCell = [];
            // i+=3 iterates every third cell
            // 0 + 3 = 3 
            // 1 + 3 = 4
            for (let i = 0; i < arr.length; i += nth) {
                let getThirdCell = (i + startingPoint) % arr.length
                thirdCell.push(arr[getThirdCell])
            }
            return thirdCell
        }

            // problem
            cellArray.forEach(cell => {
                cell.addEventListener('click',(e)=>{
                    let thirdCells = getVertAndDiag(cellArray, cell, 3)
                    let hasMark = cellArray.every(()=>{
                        if (thirdCells[1].classList.contains('O') && thirdCells[1].classList.contains('O')
                        && thirdCells[2].classList.contains('O')
                        ) {
                            return true
                        }
                    })
                    console.log(thirdCells[1])
                    console.log(hasMark)
                    console.log(cell)
                })
            })
        // problem
        // dont erase this
        // .setAttribute('style', 'background-color:pink')




        //playercontroller
        boardModule.gameBoardContainer.addEventListener('click', event => {
            if (event.target.matches('.cell')) {
                playerTurns(event)
                // loopThirdCell()
                try {
                    playerOne.checkWin(cellArray, event)
                } catch (err) {
                    console.log('Current cell does not have a sibling with a player symbol yet');
                }
            }

        })



    }

    let playerOneClick = {
        isTurn: true
    }
    let playerTwoClick = {
        isTurn: false
    }

    function playerTurns(event) {
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
    return {
        playGame
    }
})()

ticTacToe.playGame()

let displayControllers = (function () {

})()