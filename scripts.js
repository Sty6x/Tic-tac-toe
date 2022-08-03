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
        // cells
    }
})()



function player(pick) {
    let cells = document.getElementsByClassName('cell')
    let GameBoard = GameBoardModule
    let GameboardContainer = GameBoard.gameBoardContainer;
    let GameBoardArray = GameBoard.GAMEBOARD;
    let cellArray = Array.from(cells)

    function aI() {
        //randomizer set to ID and set innerHTML
        let IdRandomizer = {
            IdNum:3,
            randomNum (){
                return Math.floor(Math.random()*this.IdNum)
            }
        }
        let firstNum = IdRandomizer.randomNum()
        let secondNum = IdRandomizer.randomNum()
        let randomID = `${firstNum}${secondNum}`
        setTimeout(
            ()=>{
                // console.log(typeof cellArray)
                cellArray.forEach(cell => {
                    // console.log(cell.id)
                    if(randomID == cell.id){
                        cell.innerHTML = 'XX'
                        console.log(randomID,cell.id)
                    }
                });
            
            }
            , 500)
   
    }

    function getCellPosition() {
        GameboardContainer.addEventListener('click', (e) => {
            let target = e.target
            if (!target.matches('.cell')) return
            target.innerHTML = pick
            console.log('player' +' '+target.id)
            aI(target,e)
        })
    }
    return {
        getCellPosition
    }
}

GameBoardModule.createCells()
let player1 = player('o')
player1.getCellPosition()