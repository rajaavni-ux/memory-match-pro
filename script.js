const timerDisplay = document.getElementById('timer');
let timer;
let seconds = 0;
let gameStarted = false;


const grid = document.getElementById('grid');
const flipDisplay = document.getElementById('flip-count');
const restartBtn = document.getElementById('restart');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let flips = 0;

// 1. Define your card data (Emojis make it easy!)
const cardArray = [
    { name: '🔥', icon: '🔥' }, { name: '🔥', icon: '🔥' },
    { name: '🚀', icon: '🚀' }, { name: '🚀', icon: '🚀' },
    { name: '💎', icon: '💎' }, { name: '💎', icon: '💎' },
    { name: '🍀', icon: '🍀' }, { name: '🍀', icon: '🍀' },
    { name: '👻', icon: '👻' }, { name: '👻', icon: '👻' },
    { name: '🤖', icon: '🤖' }, { name: '🤖', icon: '🤖' },
    { name: '🍕', icon: '🍕' }, { name: '🍕', icon: '🍕' },
    { name: '🎨', icon: '🎨' }, { name: '🎨', icon: '🎨' }
];

// 2. Shuffle function (Fisher-Yates algorithm)
function shuffle() {
    cardArray.sort(() => 0.5 - Math.random());
}

// 3. Create the board
function createBoard() {
    grid.innerHTML = '';
    shuffle();
    cardArray.forEach((_, i) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(() => {
            seconds++;
            timerDisplay.innerText = seconds;
        }, 1000); // 1000ms = 1 second
    }
}

function stopTimer() {
    clearInterval(timer);
    gameStarted = false;
}

// 4. Flip card logic
function flipCard() {
    startTimer();
    let cardId = this.getAttribute('data-id');
    
    // Prevent clicking the same card or already matched cards
    if (cardsChosenId.includes(cardId) || this.classList.contains('matched')) return;

    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.classList.add('flipped');
    this.innerText = cardArray[cardId].icon;

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// 5. Check for match
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].classList.remove('flipped');
        cards[optionOneId].innerText = '';
        cards[optionTwoId].classList.remove('flipped');
        cards[optionTwoId].innerText = '';
    }

    cardsChosen = [];
    cardsChosenId = [];
    flips++;
    flipDisplay.innerText = flips;

    if (cardsWon.length === cardArray.length / 2) {
        stopTimer();
        alert('Congratulations! You found them all!');

    }
}

restartBtn.addEventListener('click', () => {
    stopTimer();            // Stop the current clock
    seconds = 0;            // Reset seconds to 0
    timerDisplay.innerText = 0; // Update the screen to 0
    flips = 0;
    flipDisplay.innerText = flips;
    cardsWon = [];
    createBoard();
});
