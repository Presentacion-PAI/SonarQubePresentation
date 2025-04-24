/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author kyliam Chinea Salcedo
 * @since Mar 24, 2025
 * @description Program that reads JSON data from URL
 *
 *  If you use fetch It produces an error
 *  But when I load the page I Obtain this error:
 *    Access to fetch at  from origin  has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 *    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 *
 * This 0error occurs because of the CORS (Cross-Origin Resource Sharing) policy which is implemented by the server hosting
 * the resource you are trying to access. This policy restricts cross-origin requests made by web browsers, for security reasons.
 *
 * @see {@link
* https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe}
*/
import { Card } from './card.js';
import { Deck } from './deck.js';

export class PokerView {
  private body: HTMLBodyElement;
  private player1: HTMLDivElement;
  private player2: HTMLDivElement;
  private player1Button: HTMLButtonElement;
  private player2Button: HTMLButtonElement;
  private canvasPlayer1: HTMLCanvasElement;
  private canvasPlayer2: HTMLCanvasElement;
  private deck: Deck;

  constructor() {
    this.body = document.body as HTMLBodyElement;

    this.player1 = this.createElement('div', 'player1') as HTMLDivElement;
    this.player2 = this.createElement('div', 'player2') as HTMLDivElement;

    this.canvasPlayer1 = document.createElement('canvas');
    this.canvasPlayer2 = document.createElement('canvas');

    this.player1Button = this.createElement('button') as HTMLButtonElement;
    this.player2Button = this.createElement('button') as HTMLButtonElement;

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
  public bindPlayHandler(handler: (isPlayer1: boolean) => void): void {
    this.player1Button.addEventListener('click', () => handler(true));
    this.player2Button.addEventListener('click', () => handler(false));
  }

  /**
   * Dibuja las manos de ambos jugadores en los canvas.
   */
  public showHands(cards1: Card[], cards2: Card[]): void {
    this.drawCards(cards1, this.canvasPlayer1);
    this.drawCards(cards2, this.canvasPlayer2);
  }

  /**
   * Muestra el resultado final al usuario.
   */
  public showResult(userWon: boolean, hand1: string, hand2: string): void {
    alert(
      userWon
        ? `¡Ganaste! (${hand1} vs ${hand2})`
        : `Perdiste :( (${hand1} vs ${hand2})`
    );
  }

  /**
   * Dibuja un conjunto de cartas en un canvas.
   */
  private drawCards(cards: Card[], canvas: HTMLCanvasElement): void {
    const scaleFactor = 5;
    const width = 1500;
    const height = 300;

    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);

    const cardWidth = 200;
    const cardHeight = 280;

    ctx.clearRect(0, 0, width, height);

    cards.forEach((card, i) => {
      const x = 120 + i * (cardWidth + 70);
      const y = 15;

      if (card.getImageFront().complete) {
        ctx.drawImage(card.getImageFront(), x, y, cardWidth, cardHeight);
      } else {
        card.getImageFront().onload = () => {
          ctx.drawImage(card.getImageFront(), x, y, cardWidth, cardHeight);
        };
      }
    });
  }

  /**
   * Dibuja las cartas de dorso al iniciar el juego.
   */
  private drawBackCards(canvas: HTMLCanvasElement): void {
    const scaleFactor = 5;
    const width = 1500;
    const height = 300;

    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
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
  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
}
