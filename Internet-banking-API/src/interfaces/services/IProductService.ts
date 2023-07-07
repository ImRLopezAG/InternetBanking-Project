import { Product } from '../../domain/models'
import { IGenericService } from '../../utils/constants'

export interface IProductService extends IGenericService<Product> {
  // Add your custom methods here
}
