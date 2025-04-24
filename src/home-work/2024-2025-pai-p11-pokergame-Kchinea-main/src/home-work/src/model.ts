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

import { Deck } from './deck.js';
import { PokerHand } from './poker_hand.js';
import { Card } from './card.js';

export class PokerModel {
  constructor() {}

  public playGame(): {
    cards1: Card[],
    cards2: Card[],
    classification1: string,
    classification2: string,
    result: number // 1 si player1 gana, -1 si player2 gana, 0 si hay empate
  } {
    const deck = new Deck();
    deck.shuffle();

    const hands = deck.dealHands(2, 5);
    const pokerHand1 = new PokerHand("hand1");
    pokerHand1.setCards(hands[0].getCards());

    const pokerHand2 = new PokerHand("hand2");
    pokerHand2.setCards(hands[1].getCards());

    const result = pokerHand1.compareWith(pokerHand2);

    return {
      cards1: pokerHand1.getCards(),
      cards2: pokerHand2.getCards(),
      classification1: pokerHand1.classify(),
      classification2: pokerHand2.classify(),
      result
    };
  }
}
