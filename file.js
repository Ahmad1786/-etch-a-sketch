/* eslint-disable no-return-assign */
/* eslint-disable no-loop-func */
/* eslint-disable no-alert */
const mainContainer = document.querySelector('.main-container');
let numberOfSquaresPerSide = 16; // start with 16x16 grid by default
let eraserOn = false;

function removeAllColorClasses(element) {
  let className;

  for (let i = 0; i < element.classList.length; i++) {
    className = element.classList.item(i);

    if (className !== 'square') {
      element.classList.remove(className);
      i--;
    }
  }
}

function fillGrid(numOfSquaresPerSide) {
  const squareSize = mainContainer.clientWidth / numOfSquaresPerSide;

  for (let i = 0; i < numOfSquaresPerSide ** 2; i++) {
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('square');
    squareDiv.style.width = `${squareSize}px`;
    squareDiv.style.height = `${squareSize}px`;
    mainContainer.appendChild(squareDiv);

    let isMouseDown = false;
    document.addEventListener('mousedown', () => isMouseDown = true);
    document.addEventListener('mouseup', () => isMouseDown = false);

    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach((s) => {
      s.addEventListener('mouseover', (e) => {
        if (isMouseDown) {
          if (eraserOn) {
            removeAllColorClasses(e.target);
            e.target.classList.add('colored-white');
          } else {
            removeAllColorClasses(e.target);
            e.target.classList.add('colored-red');
          }
        }
      });
      s.addEventListener('mousedown', (e) => {
        if (eraserOn) {
          removeAllColorClasses(e.target);
          e.target.classList.add('colored-white');
        } else {
          removeAllColorClasses(e.target);
          e.target.classList.add('colored-red');
        }
      });
    });
  }
}

function removeGrid() {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

function getUserChoice() {
  const userSizeChoice = +prompt('Chose Size of Grid if you wish');
  numberOfSquaresPerSide = userSizeChoice;
  if (!(userSizeChoice)) return;
  removeGrid();
  fillGrid(numberOfSquaresPerSide);
}
function resetGrid() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach((s) => {
    removeAllColorClasses(s);
  });
}

fillGrid(numberOfSquaresPerSide);

const gridSizeButton = document.querySelector('#gridSizeButton');
gridSizeButton.addEventListener('click', () => getUserChoice());

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', () => resetGrid());

const eraserButton = document.querySelector('#eraserButton');
eraserButton.addEventListener('click', () => {
  eraserOn = !eraserOn;
});
