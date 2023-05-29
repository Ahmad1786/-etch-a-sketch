let mainContainer = document.querySelector('.main-container');
let numberOfSquaresPerSide = 16; //start with 16x16 grid by default
fillGrid(numberOfSquaresPerSide); 

// let eraserOn = false;

const gridSizeButton = document.querySelector("#gridSizeButton");
gridSizeButton.addEventListener('click', () => getUserChoice());

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener('click', () => resetGrid());

const eraserButton = document.querySelector("#eraserButton");
eraserButton.addEventListener('click', () => becomeEraser());


function getUserChoice() {
    userSizeChoice = +prompt("Chose Size of Grid if you wish");
    numberOfSquaresPerSide = userSizeChoice;
    if (!(userSizeChoice)) return;
    removeGrid();
    fillGrid(numberOfSquaresPerSide);
}
function resetGrid() {
    let allSquares = document.querySelectorAll('.square');
    allSquares.forEach(s => {
        s.style.backgroundColor = '';
        s.classList.remove('colored-red');
    });

}

function becomeEraser() {
    let allSquares = document.querySelectorAll('.square');
    allSquares.forEach(s => {
        s.addEventListener('mouseover', e => {
            if (isMouseDown) {
            e.target.classList.remove('colored-red')   
            e.target.classList.add('colored-white')
            }
        });
        s.addEventListener('mousedown', e => {
            e.target.classList.remove('colored-red')   
            e.target.classList.add('colored-white')
        });
    });
}


function removeGrid() {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
}

function fillGrid(numberOfSquaresPerSide) {
   
    let squareSize = mainContainer.clientWidth / numberOfSquaresPerSide;

    for (let i = 0; i < numberOfSquaresPerSide ** 2; i++) {
    let squareDiv = document.createElement('div');
    squareDiv.classList.add('square');
    squareDiv.style.width = `${squareSize}px`;
    squareDiv.style.height = `${squareSize}px`;
    mainContainer.appendChild(squareDiv);
    
    let isMouseDown = false; 
    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);
    
    let allSquares = document.querySelectorAll('.square');
    allSquares.forEach(s => {
        s.addEventListener('mouseover', e => {
            if (isMouseDown) {
            e.target.classList.add('colored-red')
            }
        });
        s.addEventListener('mousedown', e => {
            e.target.classList.add('colored-red')
        });
    });
}
}
