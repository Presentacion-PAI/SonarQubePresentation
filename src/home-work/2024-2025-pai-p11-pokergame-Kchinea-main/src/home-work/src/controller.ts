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


import { PokerModel } from './model.js';
import { PokerView } from './view.js';

export class PokerController {
  constructor(private model: PokerModel, private view: PokerView) {
    this.view.bindPlayHandler(this.handlePokerPlay);
  }

  private handlePokerPlay = (isPlayer1: boolean): void => {
    const { cards1, cards2, classification1, classification2, result } = this.model.playGame();
    this.view.showHands(cards1, cards2);
    const player1Wins = result > 0;
    const userWins = (isPlayer1 && player1Wins) || (!isPlayer1 && !player1Wins);
    this.view.showResult(userWins, classification1, classification2);
  };
}

