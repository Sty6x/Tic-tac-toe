console.log('heyho')


let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')

    const GAMEBOARD = [
        ['X', 'o', '0'],
        ['o', 'x', 'o'],
        ['x', 'o', 'x']
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
        createCells
    }
})()



function player() {
    let cells = GameBoardModule.createCells()
    let GameboardContainer = GameBoardModule.gameBoardContainer;

    function getCellPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            console.log(e.target)
        })
    }
    return {
        getCellPosition
    }
}

let player1 = player()
player1.getCellPosition()