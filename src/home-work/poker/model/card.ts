/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module Card
 * Contiene la clase `Card` con sus atributos y métodos implementados.
 * 
 */

/**
 * Representa los palos de las cartas.
 */
export enum Suit {
  CLUBS = 'Clubs',
  DIAMONDS = 'Diamonds',
  HEARTS = 'Hearts',
  SPADES = 'Spades'
}

/**
 * Representa los valores de las cartas.
 */
export enum Rank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'Jack',
  QUEEN = 'Queen',
  KING = 'King',
  ACE = 'Ace'
}

/**
 * Clase que representa una carta de la baraja.
 */
export class Card {
  private suit: Suit;
  private rank: Rank;
  private image: string;

  /**
   * Crea una nueva carta.
   * @param suit - El palo de la carta.
   * @param rank - El valor de la carta.
   */
  constructor(suit: Suit = Suit.CLUBS, rank: Rank = Rank.TWO) {
    this.suit = suit;
    this.rank = rank;
    this.image = this.generateImagePath();
  }

  /**
   * Establece la imagen de la carta.
   * @param image - Ruta de la imagen.
   */
  public setImage(image: string): void {
    this.image = image;
  }

  /**
   * Obtiene el palo de la carta.
   * @returns El palo de la carta.
   */
  public getSuit(): Suit {
    return this.suit;
  }

  /**
   * Obtiene el valor de la carta.
   * @returns El valor de la carta.
   */
  public getRank(): Rank {
    return this.rank;
  }

  /**
   * Obtiene la ruta de la imagen de la carta.
   * @returns La ruta de la imagen.
   */
  public getImage(): string {
    return this.image;
  }

  /**
   * Genera la ruta de la imagen de la carta.
   * @returns La ruta generada.
   */
  private generateImagePath(): string {
    const suitMap: { [key in Suit]: string } = {
      [Suit.CLUBS]: 'C',
      [Suit.DIAMONDS]: 'D',
      [Suit.HEARTS]: 'H',
      [Suit.SPADES]: 'S'
    };
    const rankMap: { [key in Rank]: string } = {
      [Rank.ACE]: 'A',
      [Rank.TWO]: '2',
      [Rank.THREE]: '3',
      [Rank.FOUR]: '4',
      [Rank.FIVE]: '5',
      [Rank.SIX]: '6',
      [Rank.SEVEN]: '7',
      [Rank.EIGHT]: '8',
      [Rank.NINE]: '9',
      [Rank.TEN]: '10',
      [Rank.JACK]: 'J',
      [Rank.QUEEN]: 'Q',
      [Rank.KING]: 'K'
    };
    const rankCode: string = rankMap[this.rank];
    const suitCode: string = suitMap[this.suit];
    return '../../../img/' + rankCode + suitCode + '.png';
  }

  /**
   * Convierte la carta a una representación en texto.
   * @returns Una cadena con el valor y el palo de la carta.
   */
  public toString(): string {
    return this.rank + ' of ' + this.suit;
  }

  /**
   * Compara esta carta con otra.
   * @param other - La carta con la que se compara.
   * @returns Un número negativo, cero o positivo dependiendo del orden.
   */
  public compareTo(other: Card): number {
    const suitOrder: Suit[] = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
    const rankOrder: Rank[] = [
      Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE,
      Rank.SIX, Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN,
      Rank.JACK, Rank.QUEEN, Rank.KING, Rank.ACE
    ];
    const thisSuitIndex: number = suitOrder.indexOf(this.suit);
    const otherSuitIndex: number = suitOrder.indexOf(other.suit);
    if (thisSuitIndex !== otherSuitIndex) {
      return thisSuitIndex - otherSuitIndex;
    }
    const thisRankIndex: number = rankOrder.indexOf(this.rank);
    const otherRankIndex: number = rankOrder.indexOf(other.rank);
    return thisRankIndex - otherRankIndex;
  }
}
