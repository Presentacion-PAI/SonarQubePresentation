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
export var ColorsBack;
(function (ColorsBack) {
    ColorsBack["GRAY"] = "gray_back";
    ColorsBack["BLUE"] = "blue_back";
    ColorsBack["GREEN"] = "green_back";
    ColorsBack["YELLOW"] = "yellow_back";
    ColorsBack["RED"] = "red_back";
    ColorsBack["PRUPLE"] = "purple_back";
})(ColorsBack || (ColorsBack = {}));
export var Suit;
(function (Suit) {
    Suit["CLUBS"] = "Clubs";
    Suit["DIAMONDS"] = "Diamonds";
    Suit["HEARTS"] = "Hearts";
    Suit["SPADES"] = "Spades";
})(Suit || (Suit = {}));
export var Rank;
(function (Rank) {
    Rank["ACE"] = "A";
    Rank["TWO"] = "2";
    Rank["THREE"] = "3";
    Rank["FOUR"] = "4";
    Rank["FIVE"] = "5";
    Rank["SIX"] = "6";
    Rank["SEVEN"] = "7";
    Rank["EIGHT"] = "8";
    Rank["NINE"] = "9";
    Rank["TEN"] = "10";
    Rank["JACK"] = "J";
    Rank["QUEEN"] = "Q";
    Rank["KING"] = "K";
})(Rank || (Rank = {}));
const suitOrder = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
const rankOrder = [
    Rank.ACE, Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE, Rank.SIX,
    Rank.SEVEN, Rank.EIGHT, Rank.NINE, Rank.TEN,
    Rank.JACK, Rank.QUEEN, Rank.KING
];
export class Card {
    constructor(suit = Suit.CLUBS, rank = Rank.TWO, colorBack = ColorsBack.RED) {
        this.face_up = false;
        this.suit = suit;
        this.rank = rank;
        this.colorBack = colorBack;
        this.image_front = new Image();
        this.image_back = new Image();
        this.image_front.src = `./img/${this.getImageFileName()}`;
        this.image_back.src = `./img/${this.getImageBackFileName()}`;
    }
    getImageFileName() {
        const rankMap = {
            A: 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
            '7': '7', '8': '8', '9': '9', '10': '10',
            J: 'J', Q: 'Q', K: 'K'
        };
        const suitMap = {
            [Suit.CLUBS]: 'C',
            [Suit.DIAMONDS]: 'D',
            [Suit.HEARTS]: 'H',
            [Suit.SPADES]: 'S'
        };
        return `${rankMap[this.rank]}${suitMap[this.suit]}.png`;
    }
    getImageBackFileName() {
        const colorMap = {
            [ColorsBack.GRAY]: 'C',
            [ColorsBack.BLUE]: 'D',
            [ColorsBack.GREEN]: 'H',
            [ColorsBack.YELLOW]: 'S',
            [ColorsBack.RED]: 'S',
            [ColorsBack.PRUPLE]: 'S'
        };
        return `${colorMap[this.colorBack]}.png`;
    }
    toString() {
        return `${this.rankName()} of ${this.suit}`;
    }
    getRank() {
        return this.rank;
    }
    getSuit() {
        return this.suit;
    }
    getImageFront() {
        return this.image_front;
    }
    rankName() {
        switch (this.rank) {
            case Rank.ACE: return 'Ace';
            case Rank.JACK: return 'Jack';
            case Rank.QUEEN: return 'Queen';
            case Rank.KING: return 'King';
            default: return this.rank;
        }
    }
    isHigherThan(other) {
        const thisSuitIndex = suitOrder.indexOf(this.suit);
        const otherSuitIndex = suitOrder.indexOf(other.suit);
        if (thisSuitIndex > otherSuitIndex)
            return true;
        if (thisSuitIndex < otherSuitIndex)
            return false;
        return rankOrder.indexOf(this.rank) > rankOrder.indexOf(other.rank);
    }
}
