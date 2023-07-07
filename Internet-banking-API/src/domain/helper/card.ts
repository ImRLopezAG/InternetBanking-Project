export class Generate {
  static cardNumber (): string {
    let cardNumber = Array.from({ length: 16 }, () =>
      this.next(0, 10).toString()
    )

    while (this.cardHolder(cardNumber.join('')) === 'Unknown') {
      cardNumber = Array.from({ length: 16 }, () => this.next(0, 10).toString())
    }

    return this.formatCardNumber(cardNumber.join(''))
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

  static cardHolder (cardNumber: string): string {
    if (
      cardNumber.substring(0, 2) === '34' ||
      cardNumber.substring(0, 2) === '37'
    ) {
      return 'American Express'
    }

    switch (cardNumber[0]) {
      case '4':
        return 'Visa'
      case '5':
        return 'MasterCard'
      default:
        return 'Unknown'
    }
  }

  private static formatCardNumber (cardNumber: string): string {
    return cardNumber.match(/.{1,4}/g)?.join(' ') ?? ''
  }

  private static next (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
