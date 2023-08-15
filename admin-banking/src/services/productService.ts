import { CONSTANTS } from '@/constants'
import { ProductBuilder, ProductModel } from '@/models'
const { BASEURL, ROUTES } = CONSTANTS

const URL = `${BASEURL + ROUTES.PRODUCT}/`

interface Default {
  token: string | null
}
interface entity {
  _id: string
}
interface Balance {
  pin: string
  balance: number
}

interface ProductCreate {
  user: string
  balance: number
  type: number
  limit?: number
}

interface Response {
  message: string
  success?: boolean
  data: object
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
        if (!response.ok) {
          return []
        }
        return data
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

  async create ({ token, ...product }: ProductCreate & Default): Promise<Response> {
    return await fetch(`${URL}create`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          return {
            message: 'error creating product',
            success: false,
            data: {}
          }
        }
        console.log('setting data')
        return {
          message: 'success',
          success: true,
          data
        }
      })
      .catch((error) => {
        return error
      })
  }

  async addBalance ({ token,...balance }: Balance & Default): Promise<ProductModel> {
    return await fetch(`${URL}add-balance`, {
      method: 'POST',
      body: JSON.stringify(balance),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          console.log(data)
          return data
        }
      })
      .catch((error) => {
        return error
      })
  }

  async delete ({token,...product }: ProductModel & Default): Promise<void> {
    return await fetch(`${URL}delete/${product.id}`, {
      method: 'POST',
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
  }
}
