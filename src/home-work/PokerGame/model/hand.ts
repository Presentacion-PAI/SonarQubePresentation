/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Clase que representa una mano genérica de cartas.
 */

import { Card } from './card';
import { Deck } from './deck';

/**
 * Clase que representa una mano genérica de cartas.
 * Útil para cualquier juego de cartas.
 * @class
 */
export class Hand {
  protected cards: Card[];
  protected label: string;

  /**
   * Crea una mano vacía con una etiqueta opcional.
   * @param {string} label - Etiqueta de la mano.
   */
  constructor(label: string = 'Unnamed hand') {
    this.cards = [];
    this.label = label;
  }

  /**
   * Añade una carta a la mano.	
   * @param {Card} card - Carta a añadir.
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Añade varias cartas a la mano.
   * @param {Hand} hand - Mano de la que se añaden las cartas.
   */
  public addCards(hand: Hand): void {
    this.cards.push(...hand.getCards());
  }

  /**
   * Extrae la última carta de la mano.
   * @returns {Card | undefined} La carta extraída o undefined si la mano está vacía.
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  /**
   * Reparte un número dado de cartas desde un mazo a esta mano.
   * @param {Deck} deck - Mazo del que se reparten las cartas.
   * @param {number} numCards - Número de cartas a repartir.
   */
  public moveCardsFromDeck(deck: Deck, numCards: number): void {
    for (let i = 0; i < numCards; i++) {
      const card = deck.popCard();
      if (card) {
        this.addCard(card);
      }
    }
  }

  /**
   * Devuelve una copia de las cartas de la mano.
   * @returns {Card[]} Copia de las cartas de la mano.
   */
  public getCards(): Card[] {
    return [...this.cards];
  }

  /**
   * Devuelve el número de cartas en la mano.
   * @returns {number} Número de cartas.
   */
  public size(): number {
    return this.cards.length;
  }

  /**
   * Devuelve la etiqueta de la mano.
   * @returns {string} Etiqueta.
   */
  public getLabel(): string {
    return this.label;
  }

  /**
   * Representación textual de la mano.
   * @returns {string} Las cartas en formato legible.
   */
  public toString(): string {
    const cardStrings = this.cards.map(card => card.toString());
    return `${this.label}: ${cardStrings.join(', ')}`;
  }

  public clear(): void {
    this.cards = [];
  }
}