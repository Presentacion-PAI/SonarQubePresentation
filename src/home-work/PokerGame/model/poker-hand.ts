/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * 
 * @author Guillermo González Pineda
 * @date 22/04/2025
 * @description Clase que representa una mano de poker.
 */

import { Hand } from './hand';
import { Card } from './card';

/**
 * Clase que representa una mano de poker.
 * Hereda de la clase Hand.
 * @class
 */
export class PokerHand extends Hand {
  private handRank: string = 'Unclassified';
  private static readonly HAND_RANKING: Map<string, number> = new Map([
    ['High Card', 1],
    ['Pair', 2],
    ['Two Pair', 3],
    ['Three of a Kind', 4],
    ['Straight', 5],
    ['Flush', 6],
    ['Full House', 7],
    ['Four of a Kind', 8],
    ['Straight Flush', 9],
    ['Royal Flush', 10]
  ]);

  /**
   * Clasidica la mano asignando el tipo de jugada más alta posible.
   */
  public classify(): void {
    if (this.hasRoyalFlush()) {
      this.handRank = 'Royal Flush';
    } else if (this.hasStraightFlush()) {
      this.handRank = 'Straight Flush';
    } else if (this.hasFourOfAKind()) {
      this.handRank = 'Four of a Kind';
    } else if (this.hasFullHouse()) {
      this.handRank = 'Full House';
    } else if (this.hasFlush()) {
      this.handRank = 'Flush';
    } else if (this.hasStraight()) {
      this.handRank = 'Straight';
    } else if (this.hasThreeOfAKind()) {
      this.handRank = 'Three of a Kind';
    } else if (this.hasTwoPair()) {
      this.handRank = 'Two Pair';
    } else if (this.hasPair()) {
      this.handRank = 'Pair';
    } else {
      this.handRank = 'High Card';
    }
  }
  
  
  /**
   * Devuelve la jugada clasificada en la mano.
   * @returns {string} La jugada clasificada.
   */
  public getHandRank(): string {
    return this.handRank;
  }

  /**
   * Compara esta mano con otra y determina cuál gana.
   * @param other Otra mano de Poker a comparar.
   * @returns 1 si esta gana, -1 si pierde, 0 si empate.
   */
  public compareWith(other: PokerHand): number {
    this.classify();
    other.classify();
    const thisRank = PokerHand.HAND_RANKING.get(this.handRank) || 0;
    const otherRank = PokerHand.HAND_RANKING.get(other.handRank) || 0;
    if (thisRank > otherRank) return 1;
    if (thisRank < otherRank) return -1;
    const thisSorted = [...this.cards].sort((a, b) => b.getRank() - a.getRank());
    const otherSorted = [...other.cards].sort((a, b) => b.getRank() - a.getRank());
    for (let i = 0; i < Math.min(thisSorted.length, otherSorted.length); i++) {
      const firstHandRank = thisSorted[i].getRank();
      const secondHandRank = otherSorted[i].getRank();
      if (firstHandRank > secondHandRank) return 1;
      if (firstHandRank < secondHandRank) return -1;
    }
    const thisBest = thisSorted[0];
    const otherBest = otherSorted[0];
    if (thisBest.getSuit() > otherBest.getSuit()) return 1;
    if (thisBest.getSuit() < otherBest.getSuit()) return -1;
    return 0;
  }


  /**
   * Comprueba si alguna carta se repite exactamente n veces.
   * @param {number} n - Número de repeticiones a buscar.
   * @returns {boolean} true si existe al menos un valor con n repeticiones.
   */
  private hasNOfAKind(n: number): boolean {
    const counts: Map<number, number> = new Map();
    for (const card of this.cards) {
      const rank = card.getRank();
      counts.set(rank, (counts.get(rank) || 0) + 1);
    }
    for (const count of counts.values()) {
      if (count === n) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determina si hay una pareja en la mano.
   * @returns {boolean} true si hay una pareja, false en caso contrario.
   */
  public hasPair(): boolean {
    return this.hasNOfAKind(2);
  }

  /**
   * Determina si la mano contiene dos pares distintos.
   * @returns {boolean} true si hay doble pareja, false en caso contrario.
   */
  public hasTwoPair(): boolean {
    const counts: Map<number, number> = new Map();
    let pairCount = 0;
    for (const card of this.cards) {
      const rank = card.getRank();
      counts.set(rank, (counts.get(rank) || 0) + 1);
    }
    for (const count of counts.values()) {
      if (count === 2) {
        pairCount++;
      }
    }
    return pairCount === 2;
  }

  /**
   * Determina si la mano contiene un trío (tres cartas del mismo valor).
   * @returns {boolean} true si hay un trío, false en caso contrario.
   */
  public hasThreeOfAKind(): boolean {
    return this.hasNOfAKind(3);
  }

  /**
   * Determina si la mano contiene una escalera (valores consecutivos).
   * @returns {boolean} true si hay una escalera.
   */
  public hasStraight(): boolean {
    const ranks = this.cards.map(card => card.getRank());
    const uniqueRanks = [...new Set(ranks)].sort((a, b) => a - b);
    if (uniqueRanks.length < 5) { 
      return false;
    }
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      let isSequence = true;
      for (let j = 0; j < 4; j++) {
        if (uniqueRanks[i + j + 1] !== uniqueRanks[i + j] + 1) {
          isSequence = false;
          break;
        }
      }
      if (isSequence) {
        return true;
      }
    }
    const highStraight = [10, 11, 12, 13, 1];
    const hasHighStraight = highStraight.every(r => uniqueRanks.includes(r));
    if (hasHighStraight){
      return true;
    }
    return false;
  }

  /**
   * Determina si la mano contiene un flush (cinco cartas del mismo palo).
   * @returns {boolean} true si hay un flush, false si no.
   */
  public hasFlush(): boolean {
    const suitCounts: Map<number, number> = new Map();
    for (const card of this.cards) {
      const suit = card.getSuit();
      suitCounts.set(suit, (suitCounts.get(suit) || 0) + 1);
    }
    for (const count of suitCounts.values()) {
      if (count >= 5) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determina si la mano contiene un full house (trío + pareja).
   * @returns {boolean} true si hay un full house, false si no.
   */
  public hasFullHouse(): boolean {
    const counts: Map<number, number> = new Map();
    for (const card of this.cards) {
      const rank = card.getRank();
      counts.set(rank, (counts.get(rank) || 0) + 1);
    }
    let hasThree = false;
    let hasPair = false;
    for (const count of counts.values()) {
      if (count >= 3 && !hasThree) {
        hasThree = true;
      } else if (count >= 2) {
        hasPair = true;
      }
    }
    return hasThree && hasPair;
  }

  /**
   * Determina si la mano contiene un póker (cuatro cartas del mismo valor).
   * @returns {boolean} true si hay un póker, false en caso contrario.
   */
  public hasFourOfAKind(): boolean {
    return this.hasNOfAKind(4);
  }

  /**
   * Determina si la mano contiene un straight flush (escalera del mismo palo).
   * @returns {boolean} true si hay un straight flush.
   */
  public hasStraightFlush(): boolean {
    const suitsMap: Map<number, Card[]> = new Map();
    for (const card of this.cards) {
      const suit = card.getSuit();
      if (!suitsMap.has(suit)) {
        suitsMap.set(suit, []);
      }
      suitsMap.get(suit)!.push(card);
    }
    for (const cards of suitsMap.values()) {
      if (cards.length < 5) continue;
      const ranks = cards.map(c => c.getRank());
      const uniqueRanks = [...new Set(ranks)].sort((a, b) => a - b);
      if (uniqueRanks.length < 5) continue;

      for (let i = 0; i <= uniqueRanks.length - 5; i++) {
        let isSequence = true;
        for (let j = 0; j < 4; j++) {
          if (uniqueRanks[i + j + 1] !== uniqueRanks[i + j] + 1) {
            isSequence = false;
            break;
          }
        }
        if (isSequence) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Determina si la mano contiene un Royal Flush (10-J-Q-K-A del mismo palo).
   * @returns {boolean} true si hay un Royal Flush.
   */
  public hasRoyalFlush(): boolean {
    const suitsMap: Map<number, Card[]> = new Map();
    for (const card of this.cards) {
      const suit = card.getSuit();
      if (!suitsMap.has(suit)) {
        suitsMap.set(suit, []);
      }
      suitsMap.get(suit)!.push(card);
    }
    const royalRanks = [10, 11, 12, 13, 1]; // Ten, Jack, Queen, King, Ace
    for (const cards of suitsMap.values()) {
      const ranks = cards.map(c => c.getRank());
      if (royalRanks.every(r => ranks.includes(r))) {
        return true;
      }
    }
    return false;
  }

  
}