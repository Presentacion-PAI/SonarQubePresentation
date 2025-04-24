/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module Deck
 * Contiene la clase `Deck` con sus atributos y métodos implementados.
 * 
 */

import { Card, Suit, Rank } from './card.js';
import { Hand } from './hand.js';

/**
 * Clase que representa una baraja de cartas.
 */
export class Deck {
  private cards: Card[] = [];

  /**
   * Crea una nueva baraja con todas las cartas.
   */
  constructor() {
    for (let suit of Object.values(Suit)) {
      for (let rank of Object.values(Rank)) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  /**
   * Extrae la última carta de la baraja.
   * @returns La carta extraída o `undefined` si la baraja está vacía.
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  /**
   * Añade una carta a la baraja.
   * @param card - La carta a añadir.
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Mezcla las cartas de la baraja.
   */
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const random: number = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[random]] = [this.cards[random], this.cards[i]];
    }
  }

  /**
   * Ordena las cartas de la baraja.
   */
  public sort(): void {
    this.cards.sort((a, b) => a.compareTo(b));
  }

  /**
   * Imprime las cartas de la baraja en la consola.
   */
  public print(): void {
    this.cards.forEach(card => console.log(card.toString()));
  }

  /**
   * Mueve un número de cartas de la baraja a una mano.
   * @param hand - La mano a la que se moverán las cartas.
   * @param numCards - El número de cartas a mover.
   */
  public moveCardsToHand(hand: Hand, numCards: number): void {
    for (let i = 0; i < numCards; i++) {
      const card = this.popCard();
      if (card) {
        hand.addCard(card);
      }
    }
  }

  /**
   * Reparte un número de manos con un número específico de cartas.
   * @param numHands - El número de manos a repartir.
   * @param cardsPerHand - El número de cartas por mano.
   * @returns Un arreglo de manos repartidas.
   */
  public dealHands(numHands: number, cardsPerHand: number): Hand[] {
    const hands: Hand[] = [];
    for (let i = 0; i < numHands; i++) {
      hands.push(new Hand("Hand " + (i + 1)));
    }
    for (let hand of hands) {
      this.moveCardsToHand(hand, cardsPerHand);
    }
    return hands;
  }
}
