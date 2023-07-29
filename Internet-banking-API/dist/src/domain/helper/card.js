"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generate = void 0;
class Generate {
    static cardNumber() {
        const cards = this.generateCards();
        let cardNumber;
        let cardHolder;
        do {
            cardNumber = Array.from({ length: 16 }, () => this.next(0, 9).toString()).join('');
            cardHolder = this.cardHolder(cardNumber.replace(/\s/g, ''), cards);
        } while (cardHolder === 'Unknown');
        return this.formatCardNumber(cardNumber);
    }
    static pin() {
        return this.next(100000000, 999999999).toString();
    }
    static cvv() {
        return this.next(200, 999).toString();
    }
    static expirationDate() {
        const month = this.next(1, 13);
        const year = this.next(25, 40);
        return `${month.toString().padStart(2, '0')}/${year.toString()}`;
    }
    static generateCards() {
        return {
            Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            MasterCard: /^5[1-5][0-9]{14}$/,
            AmericanExpress: /^3[47][0-9]{13}$/
        };
    }
    static cardHolder(cardNumber, cards) {
        var _a;
        return (_a = Object.keys(cards).find((card) => cards[card].test(cardNumber.replace(/\s/g, '')))) !== null && _a !== void 0 ? _a : 'Unknown';
    }
    static formatCardNumber(cardNumber) {
        var _a, _b;
        return (_b = (_a = cardNumber.match(/.{1,4}/g)) === null || _a === void 0 ? void 0 : _a.join(' ')) !== null && _b !== void 0 ? _b : '';
    }
    static next(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static card() {
        return {
            cardNumber: this.cardNumber(),
            pin: this.pin(),
            cvv: this.cvv(),
            expirationDate: this.expirationDate(),
            cardHolder: this.cardHolder(this.cardNumber(), this.generateCards())
        };
    }
}
exports.Generate = Generate;
