import { CONSTANTS } from '@/constants'
import { PaymentBuilder, PaymentModel } from '@/models'
const { BASEURL, ROUTES } = CONSTANTS

const URL = `${BASEURL + ROUTES.PAYMENT}/`

interface Default {
  token: string | null
}

interface entity{
  _id: string
}

export class PaymentService {
  static instance: PaymentService

  static getInstance (): PaymentService {
    if (this.instance) this.instance = new PaymentService()
    return this.instance
  }

  private constructor () {}

  async getAll ({ token }: Default): Promise<PaymentModel[]> {
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

    return response.map((payment: PaymentModel &  entity) => {
      const { _id, sender, receptor, receptorUser, owner, type } = payment
      return new PaymentBuilder()
        .setId(_id)
        .setSender(sender)
        .setReceptor(receptor)
        .setReceptorUser(receptorUser)
        .setOwner(owner)
        .setType(type)
        .build()
    })
  }
}
