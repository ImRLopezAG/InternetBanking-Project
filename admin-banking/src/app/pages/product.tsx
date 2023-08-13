import { useProduct } from '@/hooks'
import { ProductModel } from '@/models'
import { Table } from '@app/components'

export const Product = (): JSX.Element => {
  const { columns, products, renderCell } = useProduct()

  return (
    <Table<ProductModel>
      label='product'
      columns={columns}
      entities={products}
      renderCell={renderCell}
    />
  )
}
