/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author kyliam Chinea Salcedo
 * @since Mar 24, 2025
 * @description Program that reads JSON data from URL
 *
 *  If you use fetch It produces an error
 *  But when I load the page I Obtain this error:
 *    Access to fetch at  from origin  has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 *    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 *
 * This 0error occurs because of the CORS (Cross-Origin Resource Sharing) policy which is implemented by the server hosting
 * the resource you are trying to access. This policy restricts cross-origin requests made by web browsers, for security reasons.
 *
 * @see {@link
* https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe}
*/
import { Hand } from './hand.js';
import { Card, Rank, Suit } from './card.js';

export class PokerHand extends Hand {
  private classification: string = '';

  public hasPair(): boolean {
    return this.hasNOfAKind(2) >= 1;
  }

  public hasTwoPair(): boolean {
    return this.hasNOfAKind(2) >= 2;
  }

  public hasThreeOfAKind(): boolean {
    return this.hasNOfAKind(3) >= 1;
  }

  public hasFourOfAKind(): boolean {
    return this.hasNOfAKind(4) >= 1;
  }

  public hasFullHouse(): boolean {
    return this.hasNOfAKind(3) >= 1 && this.hasNOfAKind(2) >= 1;
  }

  public hasFlush(): boolean {
    const suits = this.cards.map(card => card['suit']);
    return suits.every(suit => suit === suits[0]);
  }

  public hasStraight(): boolean {
    const rankValues = this.cards.map(c => this.rankValue(c.getRank())).sort((a, b) => a - b);
    const isConsecutive = rankValues.every((v, i, arr) => i === 0 || v === arr[i - 1] + 1);
    const isLowAce = rankValues.join(',') === '1,2,3,4,5';
    return isConsecutive || isLowAce;
  }

  public hasStraightFlush(): boolean {
    return this.hasFlush() && this.hasStraight();
  }

  private hasNOfAKind(n: number): number {
    const counts: Record<string, number> = {};
    this.cards.forEach(card => {
      const rank = card['rank'];
      counts[rank] = (counts[rank] || 0) + 1;
    });

    return Object.values(counts).filter(count => count === n).length;
  }

  private rankValue(rank: Rank): number {
    const map: Record<Rank, number> = {
      [Rank.ACE]: 1,
      [Rank.TWO]: 2,
      [Rank.THREE]: 3,
      [Rank.FOUR]: 4,
      [Rank.FIVE]: 5,
      [Rank.SIX]: 6,
      [Rank.SEVEN]: 7,
      [Rank.EIGHT]: 8,
      [Rank.NINE]: 9,
      [Rank.TEN]: 10,
      [Rank.JACK]: 11,
      [Rank.QUEEN]: 12,
      [Rank.KING]: 13
    };
    return map[rank];
  }

  public classify(): string {
    if (this.hasStraightFlush()) this.classification = 'Straight Flush';
    else if (this.hasFourOfAKind()) this.classification = 'Four of a Kind';
    else if (this.hasFullHouse()) this.classification = 'Full House';
    else if (this.hasFlush()) this.classification = 'Flush';
    else if (this.hasStraight()) this.classification = 'Straight';
    else if (this.hasThreeOfAKind()) this.classification = 'Three of a Kind';
    else if (this.hasTwoPair()) this.classification = 'Two Pair';
    else if (this.hasPair()) this.classification = 'Pair';
    else this.classification = 'High Card';

    return this.classification;
  }

  public compareWith(other: PokerHand): number {
    const order = [
      'High Card', 'Pair', 'Two Pair', 'Three of a Kind',
      'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush'
    ];

    const thisRank = order.indexOf(this.classify());
    const otherRank = order.indexOf(other.classify());

    if (thisRank > otherRank) return 1;
    if (thisRank < otherRank) return -1;

    const thisSorted = this.cards.slice().sort((a, b) => b.isHigherThan(a) ? 1 : -1);
    const otherSorted = other.cards.slice().sort((a, b) => b.isHigherThan(a) ? 1 : -1);

    for (let i = 0; i < thisSorted.length; i++) {
      if (thisSorted[i].isHigherThan(otherSorted[i])) return 1;
      if (otherSorted[i].isHigherThan(thisSorted[i])) return -1;
    }

    return 0;
  }
}
