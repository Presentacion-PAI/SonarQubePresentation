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

export class Hand {
  protected cards: Card[] = [];
  private label: string;

  constructor(label: string = 'Hand') {
    this.cards = [];
    this.label = label;
  }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  public moveCardsToHand(destination: Hand, count: number): void {
    for (let i = 0; i < count; i++) {
      const card = this.popCard();
      if (card) destination.addCard(card);
    }
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

  public toString(): string {
    return this.cards.map(card => card.toString()).join(', ');
  }
}