import { Product, ProductModel } from '../../domain'
import { IProductService } from '../../interfaces'
import { GenericService } from '../core'

export class ProductService extends GenericService<Product> implements IProductService {
  constructor () {
    super(ProductModel)
  }

  async GetByPin (pin: string): Promise<Product | null> {
    return await ProductModel.findOne({ pin })
  }

  async AddBalance (pin: string, balance: number): Promise<Product> {
    const product = await ProductModel.findOne({ pin })
    if (!product) {
      throw new Error('Product not found')
    }
    product.balance += balance
    return await super.Update(product._id, product)
  }

  async GetByOwner (owner: string): Promise<Product[]> {
    return await ProductModel.find({ user: owner })
  }
}
