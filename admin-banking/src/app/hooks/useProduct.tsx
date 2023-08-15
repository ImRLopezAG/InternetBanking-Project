import { ProductModel } from '@/models'
import { ProductService } from '@/services'
import { AppContext } from '@app/context'
import * as next from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
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

interface Balance {
  pin: string
  balance: number
}

export function useProduct (): ReturnType {
  const { token } = useContext(AppContext)
  const [products, setProducts] = useState<ProductModel[]>([])
  const service = ProductService.getInstance()
  const { data, isSuccess } = useQuery({
    queryKey: ['product-list'],
    queryFn: async () => await service.getAll({ token })
  })

  const { mutateAsync } = useMutation({
    mutationKey: ['product-add-balance'],
    mutationFn: async (data: Balance) =>
      await service.addBalance({ token, ...data }),
    onSuccess: ({ pin, balance }) => {
      setProducts((prev) =>
        prev.map((prod) =>
          prod.pin === pin ? { ...prod, balance: balance } : prod
        ) as ProductModel[]
      )
    }
  })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
    }
  }, [mutateAsync, isSuccess])

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
      const product = products.find((p) => p.pin === pin.value)
      if (!product) return
      const data = {
        pin: product.pin,
        balance: Number(balance.value)
      }
      await mutateAsync(data)
    },
    [mutateAsync, products]
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
          <p className='text-bold text-sm capitalize'>
            {JSON.stringify(product.principal)}
          </p>
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
    [handleSubmit, productTypes, products]
  )

  return { products, columns, renderCell }
}
