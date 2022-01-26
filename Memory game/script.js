
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        console.log(true);

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

let counterBlock = document.querySelector(".points");
let counter = 0;

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    counter++;
    counterBlock.innerHTML = `Points: ${counter}`
    if (counter === 9) {
        stop();
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const images = document.querySelectorAll('img');

images.forEach(e => {
    e.addEventListener("click", () => {
        start();
    });
});

const timer = document.querySelector('#timer');
let m = 0;
let s = 0;
let stopTime = true;

function start() {
    if (stopTime === true) {
        stopTime = false;
        cycle();
    }
}

function stop() {
    timer.classList.add("blink");
    if (stopTime === false) {
        stopTime = true;
    }
}

function cycle() {
    if (stopTime === false) {
        s = Number(s);
        m = Number(m);

        s = s + 1;

        if (s === 60) {
            m = m + 1;
            s = 0;
        }
        if (m === 60) {
            m = 0;
            s = 0;
        }

        if (s < 10 || s === 0) {
            s = '0' + s;
        }
        if (m < 10 || m === 0) {
            m = '0' + m;
        }

        timer.innerHTML = m + ':' + s;

        setTimeout(cycle, 1000);
    }
}
