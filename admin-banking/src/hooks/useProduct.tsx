import { ProductModel, UserModel } from '@/models'
import { ProductService } from '@/services'
import { AppContext } from '@app/context'
import { Delete, Edit, Eyes } from '@components/icons'
import * as next from '@nextui-org/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const [users, setUsers] = useState<UserModel[]>([])

  const service = ProductService.getInstance()
  const { data, isSuccess, ...query } = useQuery({
    queryKey: ['product-list'],
    queryFn: async () => await service.getAll({ token })
  })

  const queryClient = useQueryClient()

  const userData: UserModel[] | undefined = queryClient.getQueryData([
    'user-list'
  ])

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
      setUsers(userData!)
    }
  }, [query])

  const columns: Column[] = [
    { uid: 'pin', name: 'Pin' },
    { uid: 'user', name: 'Owner' },
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
        user: (
          <p className='text-bold text-sm capitalize'>
            {users.find((user) => user.id === product.user)?.firstName}
          </p>
        ),
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
    [users]
  )
  return { products, columns, renderCell }
}
