export class Hand {
    constructor(label = 'Hand') {
        this.cards = [];
        this.cards = [];
        this.label = label;
    }
    addCard(card) {
        this.cards.push(card);
    }
    popCard() {
        return this.cards.pop();
    }
    moveCardsToHand(destination, count) {
        for (let i = 0; i < count; i++) {
            const card = this.popCard();
            if (card)
                destination.addCard(card);
        }
    }
    getCards() {
        return this.cards;
    }
    setCards(cards) {
        this.cards = cards;
    }
    toString() {
        return this.cards.map(card => card.toString()).join(', ');
    }
}
