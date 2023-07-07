import { User } from '../../domain/models'
import { IGenericService } from '../../utils/constants'

export interface IUserService extends IGenericService<User> {
  GetByUserName: (username: string) => Promise<User | null>
  GetByEmail: (email: string) => Promise<User | null>
}
