/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Esta clase representa un mazo de cartas de una baraja francesa estándar de 52 cartas.
 */

import { Card, Suit, Rank } from './card';
import { Hand } from './hand';

/**
 * Clase que representa un mazo de cartas.
 * @class
 * @property {Card[]} cards - Cartas contenidas en el mazo.
 */
export class Deck {
  private cards: Card[];

  /**
   * Crea un mazo completo de 52 cartas.
   * @constructor
   */
  constructor() {
    this.cards = [];
    this.reset();
  }

  /**
   * Reinicia el mazo con las 52 cartas de la baraja francesa.
   * @method
   */
  public reset(): void {
    this.cards = [];
    for (const suit of [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades]) {
      for (let rank = Rank.Ace; rank <= Rank.King; rank++) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  /**
   * Baraja el mazo utilizando el algoritmo de Fisher-Yates.
   */
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Extrae la última carta del mazo.
   * @returns {Card | undefined} La carta extraída o undefined si el mazo está vacío.
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  public moveCardsToHand(hand: Hand, count: number): void {
    for (let i = 0; i < count; i++) {
      const card = this.popCard();
      if (card) hand.addCard(card);
    }
  }

  public recoverCardsFromHands(hands: Hand[]): void {
    for (const hand of hands) {
      const cards = hand.getCards();
      this.cards.push(...cards);
      hand.clear();
    }
  }

  /**
   * Reparte un número específico de manos con un número específico de cartas cada una.
   * @param numHands - Número de manos a repartir.
   * @param cardsPerHand - Número de cartas por mano.
   * @returns {Hand[]} - Un array de manos repartidas.
   */
  public dealHands(numHands: number, cardsPerHand: number): Hand[] {
    const hands: Hand[] = [];
    for (let i = 0; i < numHands; i++) {
      const hand = new Hand(`Jugador ${i + 1}`);
      this.moveCardsToHand(hand, cardsPerHand);
      hands.push(hand);
    }
    return hands;
  }

  /**
   * Añade una carta al mazo.
   * @param {Card} card - La carta a añadir.
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Ordena las cartas por palo y luego por rango.
   */
  public sort(): void {
    this.cards.sort((a, b) => {
      if (a.getSuit() !== b.getSuit()) {
        return a.getSuit() - b.getSuit();
      }
      return a.getRank() - b.getRank();
    });
  }

  /**
   * Devuelve una copia de las cartas actuales en el mazo.
   * @returns {Card[]} Copia de las cartas en el mazo.
   */
  public getCards(): Card[] {
    return [...this.cards];
  }

  /**
   * Devuelve el número de cartas restantes en el mazo.
   * @returns {number} Número de cartas restantes.
   */
  public size(): number {
    return this.cards.length;
  }
}