console.log('heyho')


let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')

    const GAMEBOARD = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    function createCells() {
        for (let row = 0; row < GAMEBOARD.length; row++) {
            for (let col = 0; col < GAMEBOARD[row].length; col++) {
                var cell = document.createElement('div')
                gameBoardContainer.appendChild(cell)
                cell.classList.add('cell')
                // [0][0] [0][1] [0][2]
                cell.innerHTML = GAMEBOARD[row][col]
                cell.setAttribute('id', GAMEBOARD[row] + GAMEBOARD[cell])

            }
        }
    }
    return {
        gameBoardContainer,
        createCells,
        // GAMEBOARD
    }
})()



function player(pick) {
    let GameBoard = GameBoardModule
    // let cells = GameBoard.createCells()
    let GameboardContainer = GameBoard.gameBoardContainer;
    // let GameBoardArray = GameBoard.GAMEBOARD;

    function aI() {
        console.log('time')
        // console.log(GameBoardArray)
    }

    function getCellPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            let target = e.target
            if (!target.matches('.cell')) return
            e.target.innerHTML = pick
            // GameBoardArray
            console.log(target.id )
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