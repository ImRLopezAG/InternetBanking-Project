import { Product, ProductModel } from '../../domain'
import { IProductService } from '../../interfaces'
import { GenericService } from '../core'
export class ProductService extends GenericService<Product> implements IProductService {
  constructor () {
    super(ProductModel)
  }
}
