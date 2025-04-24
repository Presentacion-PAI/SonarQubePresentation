import { Deck } from './deck.js';
export class PokerView {
    constructor() {
        this.body = document.body;
        this.player1 = this.createElement('div', 'player1');
        this.player2 = this.createElement('div', 'player2');
        this.canvasPlayer1 = document.createElement('canvas');
        this.canvasPlayer2 = document.createElement('canvas');
        this.player1Button = this.createElement('button');
        this.player2Button = this.createElement('button');
        this.player1Button.id = 'pokerButton1';
        this.player1Button.classList.add('button', 'is-success', 'is-large', 'is-rounded');
        this.player1Button.textContent = 'player one';
        this.player2Button.id = 'pokerButton2';
        this.player2Button.classList.add('button', 'is-danger', 'is-large', 'is-rounded');
        this.player2Button.textContent = 'player two';
        this.player1.appendChild(this.canvasPlayer1);
        this.player1.appendChild(this.player1Button);
        this.player2.appendChild(this.canvasPlayer2);
        this.player2.appendChild(this.player2Button);
        this.body.appendChild(this.player1);
        this.body.appendChild(this.player2);
        this.deck = new Deck();
        this.deck.shuffle();
        this.drawBackCards(this.canvasPlayer1);
        this.drawBackCards(this.canvasPlayer2);
    }
    /**
     * Permite al controlador manejar los clicks en los botones.
     */
    bindPlayHandler(handler) {
        this.player1Button.addEventListener('click', () => handler(true));
        this.player2Button.addEventListener('click', () => handler(false));
    }
    /**
     * Dibuja las manos de ambos jugadores en los canvas.
     */
    showHands(cards1, cards2) {
        this.drawCards(cards1, this.canvasPlayer1);
        this.drawCards(cards2, this.canvasPlayer2);
    }
    /**
     * Muestra el resultado final al usuario.
     */
    showResult(userWon, hand1, hand2) {
        alert(userWon
            ? `¡Ganaste! (${hand1} vs ${hand2})`
            : `Perdiste :( (${hand1} vs ${hand2})`);
    }
    /**
     * Dibuja un conjunto de cartas en un canvas.
     */
    drawCards(cards, canvas) {
        const scaleFactor = 5;
        const width = 1500;
        const height = 300;
        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
        const cardWidth = 200;
        const cardHeight = 280;
        ctx.clearRect(0, 0, width, height);
        cards.forEach((card, i) => {
            const x = 120 + i * (cardWidth + 70);
            const y = 15;
            if (card.getImageFront().complete) {
                ctx.drawImage(card.getImageFront(), x, y, cardWidth, cardHeight);
            }
            else {
                card.getImageFront().onload = () => {
                    ctx.drawImage(card.getImageFront(), x, y, cardWidth, cardHeight);
                };
            }
        });
    }
    /**
     * Dibuja las cartas de dorso al iniciar el juego.
     */
    drawBackCards(canvas) {
        const scaleFactor = 5;
        const width = 1500;
        const height = 300;
        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
        const cardBack = new Image();
        cardBack.src = './img/red_back.png';
        const cardWidth = 200;
        const cardHeight = 280;
        cardBack.onload = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < 5; i++) {
                const x = 120 + i * (cardWidth + 70);
                const y = 15;
                ctx.drawImage(cardBack, x, y, cardWidth, cardHeight);
            }
        };
    }
    /**
     * Utilidad para crear elementos HTML con clase opcional.
     */
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }
}
