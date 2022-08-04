console.log('heyho')


let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')
    let GAMEBOARD = [];

    function createCells() {
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
        createCells,
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
        let firstNum = IdRandomizer(3)
        let secondNum = IdRandomizer(3)
        let aIidentifier = `${firstNum}${secondNum}`
        cellArray.forEach(cell => {
            if (aIidentifier == cell.id && cell.textContent == '') {
                // console.log(cell.id)
                cell.textContent = 'X'
                console.log('enemy ' + cell.id)
                // IdRandomizer() 

            } 
            else if (aIidentifier == cell.id) {
                enemyMove()
                console.log('same ID ' + cell.id + ' <cellid || playerID> ' + playerID)
                console.log('same ID ' + cell.id + ' <cellid || aiId> ' + aIidentifier)
                let i = 0
            }

        })
    }

    return {
      
        enemyMove
    }
}

function player(pick) {
    let cells = document.getElementsByClassName('cell')
    let GameBoard = GameBoardModule
    let GameboardContainer = GameBoard.gameBoardContainer;
    let GameBoardArray = GameBoard.GAMEBOARD;
    let cellArray = Array.from(cells)
    let Ai = aI()

    function playerMove() {
        GameboardContainer.addEventListener('click', (e) => {
            let playerID = e.target.id
            if (!e.target.matches('.cell')) return
            e.target.textContent = pick
            console.log('player' + ' ' + playerID)
            // Ai.enemyMove(playerID)



        })
    }
    return {
        playerMove
    }
}

GameBoardModule.gameBoardContainer.addEventListener('click', (e) => {
    // console.log(aI().aIidentifier)
    aI().enemyMove()

    // if (e.target.textContent == 'X') {
    //     console.log('there is x')
    // }
})

GameBoardModule.createCells()
let player1 = player('O')
// player1.playerMove()