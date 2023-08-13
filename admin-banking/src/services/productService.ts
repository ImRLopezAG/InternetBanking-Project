import { CONSTANTS } from '@/constants'
import { ProductBuilder, ProductModel } from '@/models'
const { BASEURL, ROUTES } = CONSTANTS

const URL = `${BASEURL + ROUTES.PRODUCT}/`

interface Default {
  token: string | null
}
interface entity{
  _id: string
}
export class ProductService {
  static instance: ProductService

  static getInstance (): ProductService {
    if (!this.instance) this.instance = new ProductService()
    return this.instance
  }

  private constructor () {}

  async getAll ({ token }: Default): Promise<ProductModel[]> {
    const response = await fetch(`${URL}list`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          return data
        }
      })
      .catch((error) => {
        return error
      })

    return response.map((product: ProductModel & entity ) => {
      const { _id, pin, cvv, expirationDate, cardNumber, cardHolder, balance, principal, limit, active, type, user } = product
      return new ProductBuilder()
        .setId(_id)
        .setPin(pin)
        .setCvv(cvv)
        .setExpirationDate(expirationDate)
        .setCardNumber(cardNumber)
        .setCardHolder(cardHolder)
        .setBalance(balance)
        .setPrincipal(principal)
        .setLimit(limit)
        .setActive(active)
        .setType(type)
        .setUser(user)
        .build()
    })
  }
}
