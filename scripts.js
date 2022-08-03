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
        GAMEBOARD
    }
})()



function player(pick) {
    let GameBoard = GameBoardModule
    // let cells = GameBoard.createCells()
    let GameboardContainer = GameBoard.gameBoardContainer;
    let GameBoardArray = GameBoard.GAMEBOARD;

    function aI() {
        // console.log(GameBoardArray)
        //randomizer set to ID and set innerHTML
        let IdRandomizer = {
            IdNum:3,
            randomNum (){
                return Math.floor(Math.random()*this.IdNum)
            }
        }
        let firstNum = IdRandomizer.randomNum()
        let secondNum = IdRandomizer.randomNum()
        // let firstNum secondNum = Math.floor(Math.random() * 3)
        console.log(firstNum+secondNum)
        
        
    }

    function getCellPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            let target = e.target
            if (!target.matches('.cell')) return
            e.target.innerHTML = pick
            console.log(GameBoardArray)
            console.log(target)
            setTimeout(aI, 500)
        })
    }
    return {
        getCellPosition
    }
}

GameBoardModule.createCells()
let player1 = player('o')
player1.getCellPosition()