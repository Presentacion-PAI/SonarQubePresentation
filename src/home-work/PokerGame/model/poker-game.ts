/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Clase que representa una partida de poker.
 */

import { PokerHand } from './poker-hand';
import { Deck } from './deck';

export class PokerGame {
  private deck: Deck;
  private hand1: PokerHand;
  private hand2: PokerHand;

  /**
   * Constructor de la clase PokerGame.
   * Inicializa el mazo y las manos de los jugadores.
   * @constructor
   */
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.hand1 = new PokerHand('Player 1');
    this.hand2 = new PokerHand('Player 2');
  }

  /**
   * Reparte nuevas cartas a ambas manos desde un mazo barajado.
   */
  public deal(numCards: number = 5): void {
    this.deck.recoverCardsFromHands([this.hand1, this.hand2]);
    this.deck.shuffle();
    const hands = this.deck.dealHands(2, numCards);
    this.hand1.addCards(hands[0]);
    this.hand2.addCards(hands[1]);
    this.hand1.classify();
    this.hand2.classify();
  }

  public dealHand1(numberCards: number): void {
    this.deck.recoverCardsFromHands([this.hand1]);
    this.deck.shuffle();
    this.deck.moveCardsToHand(this.hand1, numberCards);
    this.hand1.classify();
  }
  
  public dealHand2(numberCards: number): void {
    this.deck.recoverCardsFromHands([this.hand2]);
    this.deck.shuffle();
    this.deck.moveCardsToHand(this.hand2, numberCards);
    this.hand2.classify();
  }

  /**
   * Compara ambas manos y determina el ganador.
   * @returns {number} 1 si gana la mano 1, 2 si gana la mano 2, 0 si hay empate.
   */
  public getWinner(): number {
    const size1 = this.hand1.size();
    const size2 = this.hand2.size();
    if (size1 === 0 && size2 === 0) return 0;
    if (size1 > 0 && size2 === 0) return 1;
    if (size2 > 0 && size1 === 0) return 2;
    const result = this.hand1.compareWith(this.hand2);
    return result === 1 ? 1 : result === -1 ? 2 : 0;
  }

  /**
   * Obtiene la mano del jugador 1.
   * @returns {PokerHand} La mano del jugador 1.
   */
  public getHand1(): PokerHand {
    return this.hand1;
  }

  /**
   * Obtiene la mano del jugador 2.
   * @returns {PokerHand} La mano del jugador 2.
   */
  public getHand2(): PokerHand {
    return this.hand2;
  }
}
