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
    function enemyMove(playerID){
        let IdRandomizer = {
            IdNum: 3,
            randomNum() {
                return Math.floor(Math.random() * this.IdNum)
            }
        }
        let firstNum = IdRandomizer.randomNum()
        let secondNum = IdRandomizer.randomNum()
        let aIidentifier = `${firstNum}${secondNum}`
    cellArray.forEach(cell => {
        if (aIidentifier == cell.id && cell.textContent == '') {
            console.log(cell)
            cell.textContent = 'X'
            console.log('enemy ' + cell.id)

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

    // turn into function that runs if playerID is !== AI Identifier when mouse click
    // and so we can loop this function everytime if playerID is == AI Identifier
    // function aI(playerID) {

    //     let randomize = {
    //         randId: 3,
    //         randomizeID: () => {
    //             console.log('randomize')
    //             return Math.floor(Math.random() * 3)
    //         }

    //     }
    //     // function randomizeID(){
    //     // }
    //     let firstNum = randomize.randomizeID()
    //     let secondNum = randomize.randomizeID()
    //     let aIidentifier = `${firstNum}${secondNum}`

    //     cellArray.forEach(cell => {
    //         if (aIidentifier == cell.id && cell.textContent == '') {
    //             // console.log(cell)
    //             cell.textContent = 'X'
    //             console.log('enemy ' + cell.id)
    //             randomize.randomizeID()

    //         }
    //         let i = 0
            

    //         // dont invoke or run this, run this only when the condition is true otherwise invoke
    //         // the above code
    //         if(aIidentifier == playerID || cell.id == aIidentifier){
    //             do{
    //                 randomize.randomizeID()
    //                 console.log(`assigned var ${firstNum}${secondNum}`)
    //                 console.log(`from  ai Identifier ${aIidentifier}`)
    //             }
    //             while (aIidentifier !== cell.id || aIidentifier !== playerID)
    //         }
    //     });
    //     return {

    //         aIidentifier
    //     }

    // }

    function getPlayerPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            let playerID = e.target.id
            if (!e.target.matches('.cell')) return
            e.target.textContent = pick
            console.log('player' + ' ' + playerID)
            Ai.enemyMove(playerID)


        })
    }
    return {
        getPlayerPosition
    }
}

GameBoardModule.gameBoardContainer.addEventListener('click', (e) => {
    if (e.target.textContent == 'X') {
        console.log('there is x')
    }
})

GameBoardModule.createCells()
let player1 = player('O')
player1.getPlayerPosition()