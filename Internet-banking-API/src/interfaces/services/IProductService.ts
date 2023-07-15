import { Product } from '../../domain/models'
import { IGenericService } from '../../utils/constants'

export interface IProductService extends IGenericService<Product> {
  GetByPin: (pin: string) => Promise<Product | null>
  AddBalance: (id: string, balance: number) => Promise<Product>
  GetByOwner: (owner: string) => Promise<Product[]>
}
