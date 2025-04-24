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
export enum ColorsBack {
  GRAY = 'gray_back',
  BLUE = 'blue_back',
  GREEN = 'green_back',
  YELLOW = 'yellow_back',
  RED = 'red_back',
  PRUPLE = 'purple_back'
}

export enum Suit {
  CLUBS = 'Clubs',
  DIAMONDS = 'Diamonds',
  HEARTS = 'Hearts',
  SPADES = 'Spades'
}

export enum Rank {
  ACE = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K'
}

const suitOrder = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
const rankOrder = [
  Rank.ACE, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX,
  Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN,
  Rank.JACK, Rank.QUEEN, Rank.KING
];

export class Card {
  private suit: Suit;
  private rank: Rank;
  private colorBack: ColorsBack;
  private image_front: HTMLImageElement;
  private image_back: HTMLImageElement;
  private face_up: boolean = false;

  constructor(suit: Suit = Suit.CLUBS, rank: Rank = Rank.TWO, colorBack: ColorsBack = ColorsBack.RED) {
    this.suit = suit;
    this.rank = rank;
    this.colorBack = colorBack;
    this.image_front = new Image();
    this.image_back = new Image();
    this.image_front.src = `./img/${this.getImageFileName()}`;
    this.image_back.src = `./img/${this.getImageBackFileName()}`;
  }

  private getImageFileName(): string {
    const rankMap: { [key in Rank]: string } = {
      A: 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
      '7': '7', '8': '8', '9': '9', '10': '10',
      J: 'J', Q: 'Q', K: 'K'
    };

    const suitMap: { [key in Suit]: string } = {
      [Suit.CLUBS]: 'C',
      [Suit.DIAMONDS]: 'D',
      [Suit.HEARTS]: 'H',
      [Suit.SPADES]: 'S'
    };

    return `${rankMap[this.rank]}${suitMap[this.suit]}.png`;
  }
  private getImageBackFileName(): string {
    const colorMap: { [key in ColorsBack]: string } = {
      [ColorsBack.GRAY]: 'C',
      [ColorsBack.BLUE]: 'D',
      [ColorsBack.GREEN]: 'H',
      [ColorsBack.YELLOW]: 'S',
      [ColorsBack.RED]: 'S',
      [ColorsBack.PRUPLE]: 'S'
    };
    return `${colorMap[this.colorBack]}.png`;
  }

  public toString(): string {
    return `${this.rankName()} of ${this.suit}`;
  }
  
  public getRank(): Rank {
    return this.rank;
  }
  public getSuit(): Suit {
    return this.suit;
  }
  public getImageFront(): HTMLImageElement {
    return this.image_front;
  }

  private rankName(): string {
    switch (this.rank) {
      case Rank.ACE: return 'Ace';
      case Rank.JACK: return 'Jack';
      case Rank.QUEEN: return 'Queen';
      case Rank.KING: return 'King';
      default: return this.rank;
    }
  }

  public isHigherThan(other: Card): boolean {
    const thisSuitIndex = suitOrder.indexOf(this.suit);
    const otherSuitIndex = suitOrder.indexOf(other.suit);
    if (thisSuitIndex > otherSuitIndex) return true;
    if (thisSuitIndex < otherSuitIndex) return false;
    return rankOrder.indexOf(this.rank) > rankOrder.indexOf(other.rank);
  }
}
