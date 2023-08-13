import { ProductModel } from '@/models'
import { ProductService } from '@/services'
import { AppContext } from '@app/context'
import { Delete, Edit, Eyes } from '@components/icons'
import * as next from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'

interface Column {
  uid: string
  name: string
}

interface ReturnType {
  products: ProductModel[]
  columns: Column[]
  renderCell: (product: ProductModel, columnKey: React.Key) => JSX.Element
}

export function useProduct (): ReturnType {
  const { token } = useContext(AppContext)
  const [products, setProducts] = useState<ProductModel[]>([])
  const service = ProductService.getInstance()
  const { data, isSuccess, ...query } = useQuery({
    queryKey: ['product-list'],
    queryFn: async () => await service.getAll({ token })
  })


  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
    }
  }, [query])

  const columns: Column[] = [
    { uid: 'pin', name: 'Pin' },
    { uid: 'type', name: 'Type' },
    { uid: 'balance', name: 'Balance' },
    { uid: 'actions', name: 'Actions' }
  ]

  const productTypes: Record<number, string> = {
    1: 'Credit',
    2: 'Debit',
    3: 'Loan'
  }

  const renderCell = useCallback(
    (product: ProductModel, columnKey: React.Key) => {
      const elements: Record<string, JSX.Element> = {
        pin: <p className='text-bold text-sm capitalize'>{product.pin}</p>,
        type: (
          <p className='text-bold text-sm capitalize'>
            {productTypes[product.type]}
          </p>
        ),
        balance: (
          <p className='text-bold text-sm capitalize'>{product.balance}</p>
        ),
        actions: (
          <div className='relative flex items-center gap-4'>
            <next.Tooltip content='Details' color='success'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <Eyes />
              </span>
            </next.Tooltip>
            <next.Tooltip content='Edit user' color='primary'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <Edit />
              </span>
            </next.Tooltip>
            <next.Tooltip color='danger' content='Delete user'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <Delete />
              </span>
            </next.Tooltip>
          </div>
        )
      }
      return elements[columnKey]
    },
    []
  )
  return { products, columns, renderCell }
}
