const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const firecrackerSound = document.getElementById('firecrackerSound');
let currentPlayer = 'X';
const boardState = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            showWinningLine();
            triggerFireworks();
            restartButton.classList.remove('hidden');
        } else if (boardState.every(cell => cell)) {
            alert('It\'s a draw!');
            restartButton.classList.remove('hidden');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            markWinningCells(combination);
            return true;
        }
        return false;
    });
}

function markWinningCells(combination) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = 'lightyellow';
    });
}

function showWinningLine() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            drawLine(a, c);
        }
    });
}

function drawLine(start, end) {
    const startCell = cells[start].getBoundingClientRect();
    const endCell = cells[end].getBoundingClientRect();
    const line = document.createElement('div');
    line.classList.add('winning-line');
    document.body.appendChild(line);

    const { x: x1, y: y1 } = startCell;
    const { x: x2, y: y2 } = endCell;
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const length = Math.hypot(x2 - x1, y2 - y1);

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${(y1 + y2) / 2}px`;
    line.style.left = `${(x1 + x2) / 2}px`;
}

function triggerFireworks() {
    firecrackerSound.play();
    for (let i = 0; i < 3; i++) {
        const firecracker = document.createElement('div');
        firecracker.classList.add('firecracker');
        firecracker.style.left = `${Math.random() * 100}vw`;
        firecracker.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(firecracker);
        setTimeout(() => {
            firecracker.remove();
        }, 1000);
    }
}

function resetGame() {
    firecrackerSound.pause();
    firecrackerSound.currentTime = 0;
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    })};
    document.querySelectorAll('.winning-line').forEach(line => line.remove());
   




