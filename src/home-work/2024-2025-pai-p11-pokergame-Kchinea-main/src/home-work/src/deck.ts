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
import { Card, Suit, Rank, ColorsBack } from './card.js';
import { Hand } from './hand.js';

export class Deck {
  private cards: Card[] = [];

  constructor(colorBack: ColorsBack = ColorsBack.RED) {
    this.cards = [];

    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        this.cards.push(new Card(suit, rank, colorBack));
      }
    }
  }

  public printDeck(): void {
    this.cards.forEach(card => {
      console.log(card.toString());
    });
  }

  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public sort(): void {
    this.cards.sort((a, b) => {
      return a.isHigherThan(b) ? 1 : -1;
    });
  }

  public dealHands(numHands: number, cardsPerHand: number): Hand[] {
    const hands: Hand[] = [];

    for (let i = 0; i < numHands; i++) {
      const hand = new Hand(`Hand ${i + 1}`);
      for (let j = 0; j < cardsPerHand; j++) {
        const card = this.popCard();
        if (card) hand.addCard(card);
      }
      hands.push(hand);
    }

    return hands;
  }

  public getCards(): Card[] {
    return this.cards;
  }
}