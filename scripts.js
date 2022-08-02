console.log('heyho')


let GameBoardModule = (() => {
    let gameBoardContainer = document.getElementById('game-board-container')
    const GAMEBOARD = [
        ['X', 'o', '0'],
        ['o', 'x', 'o'],
        ['x', 'o', 'x']
    ]

    function createCells(text,index) {
        for (let row = 0; row < GAMEBOARD.length; row++) {
            for (let col = 0; col < GAMEBOARD[row].length; col++) {
                var cell = document.createElement('div')
                gameBoardContainer.appendChild(cell)
                cell.classList.add('cells')
                cell.innerHTML = text                
                // GAMEBOARD[col][row]
                console.log(cell)
            }
        }
        return cell;
    }

    return {
        createCells
    }
})()

GameBoardModule.createCells('Heh')