/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module Hand
 * Contiene la clase `Hand` con sus atributos y métodos implementados.
 * 
 */

import { Card } from './card.js';

/**
 * Clase que representa una mano de cartas.
 */
export class Hand {
  protected label: string;
  protected cards: Card[] = [];

  /**
   * Crea una nueva mano.
   * @param label - El nombre de la mano.
   * @param cards - Las cartas iniciales de la mano.
   */
  constructor(label: string = 'new hand', cards: Card[] = []) {
    this.cards = cards;
    this.label = label;
  }

  /**
   * Obtiene las cartas de la mano.
   * @returns Un arreglo de cartas.
   */
  public getCards(): Card[] {
    return this.cards;
  }

  /**
   * Añade una carta a la mano.
   * @param card - La carta a añadir.
   */
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Extrae la última carta de la mano.
   * @returns La carta extraída o `undefined` si la mano está vacía.
   */
  public popCard(): Card | undefined {
    return this.cards.pop();
  }

  /**
   * Convierte la mano a una representación en texto.
   * @returns Una cadena con las cartas de la mano.
   */
  public toString(): string {
    let result: string = '';
    for (const card of this.cards) {
      result += card.toString() + ', ';
    }
    return result.slice(0, -2);
  }
}
