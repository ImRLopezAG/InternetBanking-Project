interface Card {
  cardNumber: string
  pin: string
  cvv: string
  expirationDate: string
  cardHolder: string
}

interface Cards {
  [key: string]: RegExp
}
export class Generate {
  static cardNumber (): string {
    const cards: Cards = this.generateCards()
    let cardNumber: string
    let cardHolder: string

    do {
      cardNumber = Array.from({ length: 16 }, () => this.next(0, 9).toString()).join('')
      cardHolder = this.cardHolder(cardNumber.replace(/\s/g, ''), cards)
    } while (cardHolder === 'Unknown')

    return this.formatCardNumber(cardNumber)
  }

  static pin (): string {
    return this.next(100000000, 999999999).toString()
  }

  static cvv (): string {
    return this.next(200, 999).toString()
  }

  static expirationDate (): string {
    const month = this.next(1, 13)
    const year = this.next(25, 40)

    return `${month.toString().padStart(2, '0')}/${year.toString()}`
  }

  static generateCards (): Cards {
    return {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MasterCard: /^5[1-5][0-9]{14}$/,
      AmericanExpress: /^3[47][0-9]{13}$/
    }
  }

  static cardHolder (cardNumber: string, cards: Cards): string {
    return Object.keys(cards).find((card) => cards[card].test(cardNumber.replace(/\s/g, ''))) ?? 'Unknown'
  }

  private static formatCardNumber (cardNumber: string): string {
    return cardNumber.match(/.{1,4}/g)?.join(' ') ?? ''
  }

  private static next (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  static card (): Card {
    return {
      cardNumber: this.cardNumber(),
      pin: this.pin(),
      cvv: this.cvv(),
      expirationDate: this.expirationDate(),
      cardHolder: this.cardHolder(this.cardNumber(), this.generateCards())
    }
  }
}
