import { Generate, Product, User, UserModel } from '../../domain'
import { IUserService } from '../../interfaces'
import { GenericService } from '../core'

export class UserService extends GenericService<User> implements IUserService {
  constructor () {
    super(UserModel)
  }

  async GetByUserName (username: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ username }).exec()
      return user
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error while getting user by username')
    }
  }

  async GetByEmail (email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email }).exec()
      return user
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error while getting user by email')
    }
  }

  override async Create (user: User): Promise<User> {
    const entity = await super.Create(user)
    try {
      const { pin, cvv, expirationDate, cardNumber, cardHolder } = Generate.card()

      const product = new Product({
        pin,
        cvv,
        expirationDate,
        cardNumber,
        cardHolder,
        user: entity._id
      })
      await product.save()
    } catch (error) {
      return entity
    }
    return entity
  }
}
