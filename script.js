document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const moveDisplay = document.getElementById('moves')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let lastMove = []
    let moves = 0

    //create board display
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }

    createBoard();

    //generate random 2 on board
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else {
            generate()
        }
        addStyling()
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < squares.length; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //swipe left
    function moveLeft() {
        for (let i = 0; i < squares.length; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width*2].innerHTML
            let totalFour = squares[i + width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width*2].innerHTML = newColumn[2]
            squares[i + width*3].innerHTML = newColumn[3]
        }
    }

        //swipe up
        function moveUp() {
            for (let i = 0; i < 4; i++) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + width].innerHTML
                let totalThree = squares[i + width*2].innerHTML
                let totalFour = squares[i + width*3].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
    
                let filteredColumn = column.filter(num => num)
                let missing = 4 - filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = filteredColumn.concat(zeros)
    
                squares[i].innerHTML = newColumn[0]
                squares[i + width].innerHTML = newColumn[1]
                squares[i + width*2].innerHTML = newColumn[2]
                squares[i + width*3].innerHTML = newColumn[3]
            }
        }

    //adding numbers
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && 
                (i + 1) % 4 != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML*2)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
            }
        }
        moves++
        moveDisplay.innerHTML = moves
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
            }
        }
        moves++
        moveDisplay.innerHTML = moves
        checkForWin()
    }

    //assing keycode PC
    function control(e) {
        if(e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }

    document.addEventListener('keyup', control)

    //check for swipe mobile

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
        return evt.touches
    }                                                     

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                keyLeft()
            } else {
                keyRight()
            }                       
        } else {
            if ( yDiff > 0 ) {
                keyUp()
            } else { 
                keyDown()
            }                                                                 
        }
        
        xDown = null;
        yDown = null;                                             
    };

    function keyRight() {
        saveLastMove()
        moveRight()
        combineRow()
        moveRight()
        generate()
        setSavedGame();
    }

    function keyLeft() {
        saveLastMove()
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        setSavedGame();
    }

    function keyDown() {
        saveLastMove()
        moveDown()
        combineColumn()
        moveDown()
        generate()
        setSavedGame();
    }

    function keyUp() {
        saveLastMove()
        moveUp()
        combineColumn()
        moveUp()
        generate()
        setSavedGame();
    }

    //check for win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You won!'
                resultDisplay.style.visibility = 'visible'
                document.removeEventListener('keyup', control)
                document.removeEventListener('touchstart', handleTouchStart, false);        
                document.removeEventListener('touchmove', handleTouchMove, false);
            }
        }
    }

    //check for lose
    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'Game Over'
            resultDisplay.style.visibility = 'visible'
            document.removeEventListener('keyup', control)
            document.removeEventListener('touchstart', handleTouchStart, false);        
            document.removeEventListener('touchmove', handleTouchMove, false);
        }
    }

    //add styling to different numbers
    function addStyling() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].className = '';
            if (squares[i].innerHTML == 0) {
                squares[i].classList.add('zero')
            } else if (squares[i].innerHTML == 2) {
                squares[i].classList.add('two')
            } else if (squares[i].innerHTML == 4) {
                squares[i].classList.add('four')
            } else if (squares[i].innerHTML == 8) {
                squares[i].classList.add('eight')
            } else if (squares[i].innerHTML == 16) {
                squares[i].classList.add('sixteen')
            } else if (squares[i].innerHTML == 32) {
                squares[i].classList.add('thirtytwo')
            } else if (squares[i].innerHTML == 64) {
                squares[i].classList.add('sixfour')
            } else if (squares[i].innerHTML == 128) {
                squares[i].classList.add('ontwoei')
            } else if (squares[i].innerHTML == 256) {
                squares[i].classList.add('twfisi')
            } else if (squares[i].innerHTML == 512) {
                squares[i].classList.add('fionetwo')
            } else if (squares[i].innerHTML == 1024) {
                squares[i].classList.add('oneotwfo')
            } else if (squares[i].innerHTML == 2048) {
                squares[i].classList.add('win')
            }
        }
    }

    // undo last move
    function saveLastMove() {
        for (let i = 0; i < squares.length; i++) {
            lastMove.push(JSON.parse(squares[i].innerHTML))
        }
    }

    document.querySelector('.undo').addEventListener('click', () => {
        for (let i = 0; i < lastMove.length; i++) {
            gridDisplay.childNodes[i].innerHTML = lastMove[i]
        }
        moves--
        addStyling()
    })

    //reset the game
    document.querySelector('.reload').addEventListener('click', () => {
        window.location.reload()
    })

    //Cache

    function setSavedGame() {
        for (let i = 0; i < squares.length; i++) {
            localStorage.setItem(`savedGameSquare${i}`, JSON.stringify(squares[i].innerHTML));
        }
        localStorage.setItem('moves', JSON.stringify(moves));
    }

    document.querySelector('.save').addEventListener('click', () => {
        for (let i = 0; i < squares.length; i++) {
            let savedgameValue = localStorage.getItem(`savedGameSquare${i}`);
            let savedMoves = localStorage.getItem('moves');
            squares[i].innerHTML = JSON.parse(savedgameValue);
            moves = JSON.parse(savedMoves);
            moveDisplay.innerHTML = moves;
            addStyling();
        }
    })

})