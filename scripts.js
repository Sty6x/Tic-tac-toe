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
            // console.log(cell)
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
        // console.log(e.target.classList)
        // aI().enemyMove()
    }


    function checkWin(cellArray, event) {
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
        checkWin,

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

        // for vertical and diagonal

        // giving each cell a function that returns the current cell and loops 
        //through cell array starting from the current cell
        function getVertAndDiag(arr,nth){
            let cell = []
            for(let i = 0; i < arr.length;i += nth){
                cell.push(arr[i])
            }
            return cell
        }
        // console.log(getVertAndDiag(cellArray,3))

        cellArray.forEach(cell=>{
            cell.addEventListener('click', (e)=>{
                // console.log(cellArray.indexOf(cell) )
                cell.setAttribute('style','background-color:green')
                try {
                    let startingPoint = cellArray.indexOf(cell)
                        for(let i = 0;i < cellArray.length; i++){
                        //  get back to this we actually want to loop through every 3rd 
                        // cell for vertical and every 4th cell for diagonal
                        //  STARTING from the cell we clicked on. 
                        var indx = (i + startingPoint) % cellArray.length +1;
                        console.log(cellArray[indx])
                        cellArray[indx].setAttribute('style','background-color:red')
                    }
                    } catch (error) {
                        console.log('stops looping at the end of the array');
                    }
            })
        })

        boardModule.gameBoardContainer.addEventListener('click', event => {
            
            if (event.target.matches('.cell')) {
                playerTurns(event)
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
    let playerTwoClick ={
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
    // handles the display in browser
})()