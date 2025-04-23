/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Este archivo contiene la definición de la clase Card, que representa una carta de una baraja de poker.
 */

/**
 * Enumeración de los palos de la baraja francesa.
 * @enum {number}
 * @property {number} Hearts - Corazones
 * @property {number} Diamonds - Diamantes
 * @property {number} Clubs - Tréboles
 * @property {number} Spades - Picas
 */
export enum Suit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3
}

/**
 * Enumeración de los valores de las cartas.
 */
export enum Rank {
  Ace = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

/**
 * Clase que representa una carta de la baraja francesa.
 * @class
 * @property {number} suit - Palo de la carta (0-3).
 * @property {number} rank - Valor de la carta (1-13).
 * @property {string} image - Ruta de la imagen de la carta.
 */
export class Card {
  private suit: Suit;
  private rank: Rank;
  private image: string;

  /**
   * Crea una carta con el palo y el rango especificados.
   * Si no se especifican, crea el 2 de tréboles.
   * @constructor
   * @param {number} suit - Palo de la carta (Por defecto: Clubs).
   * @param {number} rank - Valor de la carta (Por defecto: Two).
   */
  constructor(suit: Suit = Suit.Clubs, rank: Rank = Rank.Two) {
    this.suit = suit;
    this.rank = rank;
    this.image = this.generateImagePath();
  }

  /**
   * Genera la ruta de la imagen correspondiente a la carta.
   * @returns {string} Ruta de la imagen de la carta.
   */
  private generateImagePath(): string {
    const suitChar = ['C', 'D', 'H', 'S'][this.suit];
    const rankStr = this.rankToInitialString();
    return `img/${rankStr}${suitChar}.png`;
  }

  /**
   * Convierte el valor numérico del rango a string (1 -> A, 11 -> J)
   * @returns {string} Representación en string del rango.
   */
  private rankToInitialString(): string {
    if (this.rank >= 2 && this.rank <= 10) {
      return this.rank.toString();
    }
    switch (this.rank) {
      case Rank.Ace:
        return 'A';
      case Rank.Jack:
        return 'J';
      case Rank.Queen:
        return 'Q';
      case Rank.King:
        return 'K';
      default:
        return '?';
    }
  }

  /**
   * Devuelve la representación en string del rango de la carta.
   * @returns {string} Representación en string del rango.
   */
  private rankToString(): string {
    switch (this.rank) {
      case Rank.Ace: 
        return 'Ace';
      case Rank.Jack: 
        return 'Jack';
      case Rank.Queen: 
        return 'Queen';
      case Rank.King: 
        return 'King';
      default: 
        return this.rank >= Rank.Two && this.rank <= Rank.Ten ? this.rank.toString() : '';
    }
  }
  
  /**
   * Devuelve una representación en string de la carta.
   * @returns {string} Representación en string de la carta.
   * @example "Ace of Spades"
   */
  public toString(): string {
    const suitNames = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    return `${this.rankToString()} of ${suitNames[this.suit]}`;
  }

  // Getters

  /**
   * Devuelve el palo de la carta.
   * @returns {number} Palo de la carta (0-3).
   */
  public getSuit(): number {
    return this.suit;
  }

  /**
   * Devuelve el rango de la carta.
   * @returns {number} Rango de la carta (1-13).
   */
  public getRank(): number {
    return this.rank;
  }

  /**
   * Devuelve la ruta de la imagen de la carta.
   * @returns {string} Ruta de la imagen de la carta.
   */
  public getImage(): string {
    return this.image;
  }
}