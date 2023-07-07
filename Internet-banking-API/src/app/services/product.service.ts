import { Product, ProductModel } from '../../domain'
import { IProductService } from '../../interfaces/services'
import { GenericService } from '../core'
export class ProductService extends GenericService<Product> implements IProductService {
  constructor () {
    super(ProductModel)
  }
}
