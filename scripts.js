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
            }
        }
        return {
            cell
        };
    }
    return {
        gameBoardContainer,
        createCells,
        GAMEBOARD
    }
})()



function player() {
    let GameBoard = GameBoardModule
    let cells = GameBoard.createCells()
    let GameboardContainer = GameBoard.gameBoardContainer;

    function getCellPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            let target = e.target
            if (!target.matches('.cell')) return
            console.log(target)
            e.target.innerHTML = 'x'
        })
    }
    return {
        getCellPosition
    }
}

let player1 = player()
player1.getCellPosition()