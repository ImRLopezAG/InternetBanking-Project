import { ProductModel } from '@/models'
import { ProductService } from '@/services'
import { AppContext } from '@app/context'
import * as next from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ProductModal } from '../components/modals'

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
    { uid: 'principal', name: 'Principal' },
    { uid: 'add', name: 'Add Balance' },
    { uid: 'actions', name: 'Actions' }
  ]

  const productTypes: Record<number, string> = {
    1: 'Credit',
    2: 'Debit',
    3: 'Loan'
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const { pin, balance } = e.currentTarget
      const data = {
        pin: pin.value,
        balance: Number(balance.value)
      }
      await service.addBalance({ token, ...data })
    },
    []
  )

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
        principal: (
          <p className='text-bold text-sm capitalize'>{JSON.stringify(product.principal)}</p>
        ),
        add: (
          <form className='flex items-center gap-4' onSubmit={handleSubmit}>  
            <input type='hidden' name='pin' value={product.pin} />
            <div>
              <next.Input
                name='balance'
                placeholder='Amount'
                type='number'
                width={75}
              />
            </div>
            <next.Button color='success' type='submit'>
              Add
            </next.Button>
          </form>
        ),
        actions: (
          <div className='relative flex items-center gap-4'>
            <ProductModal product={product} />
          </div>
        )
      }
      return elements[columnKey]
    },
    []
  )
  return { products, columns, renderCell }
}
