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
import { Card, Suit, Rank, ColorsBack } from './card.js';
import { Hand } from './hand.js';
export class Deck {
    constructor(colorBack = ColorsBack.RED) {
        this.cards = [];
        this.cards = [];
        for (const suit of Object.values(Suit)) {
            for (const rank of Object.values(Rank)) {
                this.cards.push(new Card(suit, rank, colorBack));
            }
        }
    }
    printDeck() {
        this.cards.forEach(card => {
            console.log(card.toString());
        });
    }
    popCard() {
        return this.cards.pop();
    }
    addCard(card) {
        this.cards.push(card);
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    sort() {
        this.cards.sort((a, b) => {
            return a.isHigherThan(b) ? 1 : -1;
        });
    }
    dealHands(numHands, cardsPerHand) {
        const hands = [];
        for (let i = 0; i < numHands; i++) {
            const hand = new Hand(`Hand ${i + 1}`);
            for (let j = 0; j < cardsPerHand; j++) {
                const card = this.popCard();
                if (card)
                    hand.addCard(card);
            }
            hands.push(hand);
        }
        return hands;
    }
    getCards() {
        return this.cards;
    }
}
