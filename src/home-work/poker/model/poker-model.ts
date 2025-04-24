/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module PokerModel
 * Contiene la clase `PokerModel` con sus atributos y métodos implementados.
 * 
 */

import { Deck } from './deck.js';
import { PokerHand } from './pokerhand.js';
import { Hand } from './hand.js';

/**
 * Clase que representa el modelo del juego de póker.
 * 
 * Gestiona el estado del juego, incluyendo la baraja y las manos de los jugadores.
 */
export class PokerModel {
  private deck: Deck;
  private hands: PokerHand[];

  /**
   * Crea una nueva instancia del modelo.
   */
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    const dealtHands: Hand[] = this.deck.dealHands(2, 5);
    this.hands = [];
    for (let i = 0; i < dealtHands.length; i++) {
      const playerName: string = 'Player ' + (i + 1);
      const playerHand: PokerHand = new PokerHand(playerName, dealtHands[i].getCards());
      this.hands.push(playerHand);
    }
  }

  /**
   * Obtiene las manos de los jugadores.
   * 
   * @returns Un arreglo de manos de póker.
   */
  public getHands(): PokerHand[] {
    return this.hands;
  }

  /**
   * Compara las manos de los jugadores.
   * 
   * @returns Una cadena con el resultado de la comparación.
   */
  public compareHands(): string {
    if (this.hands.length < 2) {
      throw new Error('Not enough hands to compare.');
    }
    return this.hands[0].compareHands(this.hands[1]);
  }
}