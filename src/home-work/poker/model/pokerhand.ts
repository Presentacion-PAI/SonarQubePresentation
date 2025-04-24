/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @autor Daniel Carbonell González de Chaves
 * @since Apr 16 2025
 * @module PokerHand
 * Contiene la clase `PokerHand` con sus atributos y métodos implementados.
 * 
 */

import { Hand } from './hand.js';
import { Card, Suit, Rank } from './card.js';

/**
 * Clase que representa una mano de póker.
 * 
 * Extiende la funcionalidad de la clase `Hand` para incluir lógica específica
 * del juego de póker, como la clasificación de manos y el desempate.
 */
export class PokerHand extends Hand {
  private value: string = '';

  /**
   * Crea una mano de cartas con el dorso visible.
   * 
   * @param label - El nombre de la mano.
   * @param numCards - El número de cartas en la mano.
   * @returns Una instancia de `PokerHand` con cartas de dorso.
   */
  public static createBackHand(label: string, numCards: number): PokerHand {
    const backHand: PokerHand = new PokerHand(label);
    for (let i = 0; i < numCards; i++) {
      backHand.addCard(new Card(Suit.CLUBS, Rank.ACE));
      backHand.cards[i].setImage('../../../img/red_back.png');
    }
    return backHand;
  }

  /**
   * Obtiene un mapa con la cantidad de cartas por cada valor (rank).
   * 
   * @returns Un objeto donde las claves son los valores de las cartas y los valores son sus frecuencias.
   */
  private getRankCounts(): { [key: string]: number } {
    const count: { [key: string]: number } = {};
    for (let card of this.cards) {
      const rank = card.getRank();
      if (count[rank]) {
        count[rank]++;
      } else {
        count[rank] = 1;
      }
    }
    return count;
  }

  /**
   * Determina si la mano contiene una pareja.
   * 
   * @returns `true` si la mano tiene una pareja, `false` en caso contrario.
   */
  public hasPair(): boolean {
    const rankCounts: { [key: string]: number } = this.getRankCounts();
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determina si la mano contiene dos parejas.
   * 
   * @returns `true` si la mano tiene dos parejas, `false` en caso contrario.
   */
  public hasTwoPair(): boolean {
    const rankCounts: { [key: string]: number } = this.getRankCounts();
    let pairCount: number = 0;
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 2) {
        pairCount++;
      }
    }
    return pairCount === 2;
  }

  /**
   * Determina si la mano contiene un trío.
   * 
   * @returns `true` si la mano tiene un trío, `false` en caso contrario.
   */
  public hasThreeOfaKind(): boolean {
    const rankCounts: { [key: string]: number } = this.getRankCounts();
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determina si la mano contiene un póker (cuatro cartas del mismo valor).
   * 
   * @returns `true` si la mano tiene un póker, `false` en caso contrario.
   */
  public hasFourOfaKind(): boolean {
    const rankCounts: { [key: string]: number } = this.getRankCounts();
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 4) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determina si la mano contiene un full house (un trío y una pareja).
   * 
   * @returns `true` si la mano tiene un full house, `false` en caso contrario.
   */
  public hasFullHouse(): boolean {
    const rankCounts: { [key: string]: number } = this.getRankCounts();
    let hasThree: boolean = false;
    let hasTwo: boolean = false;
    for (let rank in rankCounts) {
      if (rankCounts[rank] === 3) {
        hasThree = true;
      }
      if (rankCounts[rank] === 2) {
        hasTwo = true;
      }
    }
    return hasThree && hasTwo;
  }

  /**
   * Determina si la mano contiene un color (todas las cartas del mismo palo).
   * 
   * @returns `true` si la mano tiene un color, `false` en caso contrario.
   */
  public hasFlush(): boolean {
    if (this.cards.length < 5) { return false; }
    const firstSuit = this.cards[0].getSuit();
    for (let card of this.cards) {
      if (card.getSuit() !== firstSuit) {
        return false;
      }
    }
    return true;
  }

  /**
   * Determina si la mano contiene una escalera (cinco cartas consecutivas).
   * 
   * @returns `true` si la mano tiene una escalera, `false` en caso contrario.
   */
  public hasStraight(): boolean {
    const rankOrder: Rank[] = Object.values(Rank);
    const rankIndices: number[] = [];
    for (let card of this.cards) {
      rankIndices.push(rankOrder.indexOf(card.getRank()));
    }
    rankIndices.sort((a, b) => a - b);
    for (let i = 0; i < rankIndices.length - 1; i++) {
      if (rankIndices[i + 1] !== rankIndices[i] + 1) {
        const isLowAceStraight = rankIndices.includes(0) && rankIndices.includes(1) && rankIndices.includes(2) && rankIndices.includes(3) && rankIndices.includes(12);
        return isLowAceStraight;
      }
    }
    return true;
  }

  /**
   * Determina si la mano contiene una escalera de color.
   * 
   * @returns `true` si la mano tiene una escalera de color, `false` en caso contrario.
   */
  public hasStraightFlush(): boolean {
    return this.hasStraight() && this.hasFlush();
  }

  /**
   * Clasifica la mano de póker según su valor.
   * 
   * @returns Una cadena que representa la clasificación de la mano.
   */
  public classify(): string {
    if (this.hasStraightFlush()) this.value = 'Straight Flush';
    else if (this.hasFourOfaKind()) this.value = 'Four of a Kind';
    else if (this.hasFullHouse()) this.value = 'Full House';
    else if (this.hasFlush()) this.value = 'Flush';
    else if (this.hasStraight()) this.value = 'Straight';
    else if (this.hasThreeOfaKind()) this.value = 'Three of a Kind';
    else if (this.hasTwoPair()) this.value = 'Two Pair';
    else if (this.hasPair()) this.value = 'Pair';
    else this.value = 'High Card';
    return this.value;
  }

  /**
   * Compara esta mano con otra para determinar cuál es la ganadora.
   * 
   * @param otherHand - La otra mano a comparar.
   * @returns Una cadena que indica cuál mano gana o si hay un empate.
   */
  public compareHands(otherHand: PokerHand): string {
    const rankOrder: string[] = [
      'High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight',
      'Flush', 'Full House', 'Four of a Kind', 'Straight Flush'
    ];
    const thisValue: string = this.classify();
    const otherValue: string = otherHand.classify();
    const thisScore: number = rankOrder.indexOf(thisValue);
    const otherScore: number = rankOrder.indexOf(otherValue);
    if (thisScore > otherScore) {
      return this.label + ' (' + thisValue + ') wins against ' + otherHand.label + ' (' + otherValue + ')';
    } 
    else if (thisScore < otherScore) {
      return otherHand.label + ' (' + otherValue + ') wins against ' + this.label + ' (' + thisValue + ')';
    } 
    else {
      return this.breakTie(otherHand);
    }
  }

  /**
   * Ordena las cartas de la mano por valor y, en caso de empate, por palo.
   * 
   * @param cards - Las cartas a ordenar.
   * @returns Un arreglo de cartas ordenadas.
   */
  private sortCards(cards: Card[]): Card[] {
    const rankOrder: Rank[] = Object.values(Rank);
    const suitOrder: Suit[] = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = 0; j < cards.length - i - 1; j++) {
        const rankA: number = rankOrder.indexOf(cards[j].getRank());
        const rankB: number = rankOrder.indexOf(cards[j + 1].getRank());
        if (rankA < rankB || (rankA === rankB && suitOrder.indexOf(cards[j].getSuit()) < suitOrder.indexOf(cards[j + 1].getSuit()))) {
          const temp = cards[j];
          cards[j] = cards[j + 1];
          cards[j + 1] = temp;
        }
      }
    }
    return cards;
  }

  /**
   * Desempata entre dos manos con la misma clasificación.
   * 
   * @param otherHand - La otra mano a comparar.
   * @returns Una cadena que indica cuál mano gana o si hay un empate.
   */
  private breakTie(otherHand: PokerHand): string {
    const thisSorted: Card[] = this.sortCards(this.cards.slice());
    const otherSorted: Card[] = otherHand.sortCards(otherHand.cards.slice());
    const rankOrder: Rank[] = Object.values(Rank);
    const thisCombination: [Rank, number][] = this.getSortedCombinations(this.getRankCounts(), rankOrder);
    const otherCombination: [Rank, number][] = this.getSortedCombinations(otherHand.getRankCounts(), rankOrder);
    const combinationResult: string | null = this.compareCombinations(thisCombination, otherCombination, rankOrder, otherHand);
    if (combinationResult) { return combinationResult; }
    return this.compareHighCards(thisSorted, otherSorted, rankOrder, otherHand);
  }

  /**
   * Obtiene las combinaciones de cartas ordenadas por frecuencia y valor.
   * 
   * @param rankCounts - Un mapa con las frecuencias de los valores de las cartas.
   * @param rankOrder - El orden de los valores de las cartas.
   * @returns Un arreglo de combinaciones ordenadas.
   */
  private getSortedCombinations(rankCounts: { [key: string]: number }, rankOrder: Rank[]): [Rank, number][] {
    const combinations: [Rank, number][] = [];
    for (let rank of rankOrder) {
      if (rankCounts[rank]) {
        combinations.push([rank, rankCounts[rank]]);
      }
    }
    for (let i = 0; i < combinations.length - 1; i++) {
      for (let j = 0; j < combinations.length - i - 1; j++) {
        const [rankA, countA] = combinations[j];
        const [rankB, countB] = combinations[j + 1];
        if (countB > countA || (countB === countA && rankOrder.indexOf(rankB as Rank) > rankOrder.indexOf(rankA as Rank))) {
          const temp: [Rank, number] = combinations[j];
          combinations[j] = combinations[j + 1];
          combinations[j + 1] = temp;
        }
      }
    }
    return combinations;
  }

  /**
   * Compara las combinaciones de dos manos.
   * 
   * @param thisCombination - Las combinaciones de esta mano.
   * @param otherCombination - Las combinaciones de la otra mano.
   * @param rankOrder - El orden de los valores de las cartas.
   * @param otherHand - La otra mano a comparar.
   * @returns Una cadena que indica cuál mano gana o `null` si no hay desempate.
   */
  private compareCombinations(thisCombination: [Rank, number][], otherCombination: [Rank, number][], rankOrder: Rank[], otherHand: PokerHand): string | null {
    for (let i = 0; i < thisCombination.length; i++) {
      const [thisRank, thisCount] = thisCombination[i];
      const [otherRank, otherCount] = otherCombination[i];
      if (thisCount > otherCount) {
        return this.label + ' wins with ' + thisCount + ' of ' + thisRank;
      } 
      else if (thisCount < otherCount) {
        return otherHand.label + ' wins with ' + otherCount + ' of ' + otherRank;
      }
      const thisRankIndex: number = rankOrder.indexOf(thisRank as Rank);
      const otherRankIndex: number = rankOrder.indexOf(otherRank as Rank);
      if (thisRankIndex > otherRankIndex) {
        return this.label + ' wins with ' + thisRank;
      } 
      else if (thisRankIndex < otherRankIndex) {
        return otherHand.label + ' wins with ' + otherRank;
      }
    }
    return null;
  }

  /**
   * Compara las cartas más altas de dos manos.
   * 
   * @param thisSorted - Las cartas de esta mano, ordenadas.
   * @param otherSorted - Las cartas de la otra mano, ordenadas.
   * @param rankOrder - El orden de los valores de las cartas.
   * @param otherHand - La otra mano a comparar.
   * @returns Una cadena que indica cuál mano gana o si hay un empate.
   */
  private compareHighCards(thisSorted: Card[], otherSorted: Card[], rankOrder: Rank[], otherHand: PokerHand): string {
    const suitOrder: Suit[] = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
    for (let i = 0; i < thisSorted.length; i++) {
      const thisCard: Card = thisSorted[i];
      const otherCard: Card = otherSorted[i];
      const thisRankIndex: number = rankOrder.indexOf(thisCard.getRank());
      const otherRankIndex: number = rankOrder.indexOf(otherCard.getRank());
      if (thisRankIndex > otherRankIndex) {
        return this.label + ' wins with ' + thisCard.getRank() + ' of ' + thisCard.getSuit();
      } 
      else if (thisRankIndex < otherRankIndex) {
        return otherHand.label + ' wins with ' + otherCard.getRank() + ' of ' + otherCard.getSuit();
      }
      const thisSuitIndex: number = suitOrder.indexOf(thisCard.getSuit());
      const otherSuitIndex: number = suitOrder.indexOf(otherCard.getSuit());
      if (thisSuitIndex > otherSuitIndex) {
        return this.label + ' wins with ' + thisCard.getRank() + ' of ' + thisCard.getSuit();
      }
      else if (thisSuitIndex < otherSuitIndex) {
        return otherHand.label + ' wins with ' + otherCard.getRank() + ' of ' + otherCard.getSuit();
      }
    }
    return 'It\'s a complete tie between ' + this.label + ' and ' + otherHand.label;
  }
}
