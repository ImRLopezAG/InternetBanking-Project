import { AppContext } from '@/app/context'
import { ProductBuilder, UserModel } from '@/models'
import { ProductService, UserService } from '@/services'
import * as next from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Form {
  user: string
  type: number
  balance: number
  limit?: number
}

interface Props {
  isEdit: boolean
}

export const SaveProduct: React.FC<Props> = ({ isEdit }) => {
  const [form, setForm] = useState<Form>({
    user: '',
    type: 2,
    balance: 0,
    limit: 0
  })
  const { token } = useContext(AppContext)
  const userServices = UserService.getInstance()
  const service = ProductService.getInstance()
  const [users, setUsers] = useState<UserModel[]>([])

  const { data, isSuccess, ...query } = useQuery({
    queryKey: ['user-list'],
    queryFn: async () => await userServices.getAll({ token })
  })
  const product = new ProductBuilder()
    .setBalance(form.balance)
    .setType(form.type)
    .setUser(form.user)
    .build()
  const mutate = useMutation({
    mutationFn: async () => await service.create({ token, ...product }),
    onSuccess: () => {
      setForm({
        user: '',
        type: 2,
        balance: 0
      })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      setUsers(data.filter((user) => user.role === 2))
    }
  }, [query])

  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () =>
    location.pathname.includes('create') ? navigate('/user') : navigate(-1)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    await mutate.mutateAsync()
  }

  const types: Record<number, string> = {
    1: 'Credit',
    2: 'Debit',
    3: 'Loan'
  }

  return (
    <div className='flex justify-center w-full items-center'>
      <form className='flex flex-col gap-3 w-2/4  ' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <h1 className='text-4xl font-bold'>
            {isEdit ? 'Edit' : 'Create'} Product
          </h1>
        </div>
        <label htmlFor='user'>User</label>
        <next.Dropdown size='lg'>
          <next.DropdownTrigger>
            <next.Button variant='bordered'>
              {users.find((user) => user.id === form.user)?.username ||
                'Select User'}
            </next.Button>
          </next.DropdownTrigger>
          {isSuccess && (
            <next.DropdownMenu aria-label='Users'>
              {users.map((user) => (
                <next.DropdownItem
                  onClick={() => setForm({ ...form, user: user.id })}
                  key={user.id}
                >
                  {user.username}
                </next.DropdownItem>
              ))}
            </next.DropdownMenu>
          )}
        </next.Dropdown>
        <label htmlFor='type'> Type</label>
        <next.Dropdown size='lg'>
          <next.DropdownTrigger>
            <next.Button variant='bordered'>{types[form.type]}</next.Button>
          </next.DropdownTrigger>
          <next.DropdownMenu aria-label='Dynamic Actions'>
            {Object.entries(types).map(([key, value]) => (
              <next.DropdownItem
                onClick={() => setForm({ ...form, type: Number(key) })}
                key={key}
              >
                {value}
              </next.DropdownItem>
            ))}
          </next.DropdownMenu>
        </next.Dropdown>
        {form.type !== 2 ? (
          <>
            <label htmlFor='limit'>Limit</label>
            <next.Input
              size='lg'
              type='number'
              placeholder='Limit'
              value={form.limit?.toString()}
              onChange={(e) =>
                setForm({ ...form, limit: Number(e.target.value) })
              }
            />
          </>
        ) : (
          <>
            <label htmlFor='balance'>Balance</label>
            <next.Input
              size='lg'
              type='number'
              placeholder='Balance'
              value={form.balance.toString()}
              onChange={(e) =>
                setForm({ ...form, balance: Number(e.target.value) })
              }
            />
          </>
        )}
        <next.ButtonGroup fullWidth>
          <next.Button
            color='danger'
            size='sm'
            type='button'
            onClick={handleBack}
          >
            Cancel
          </next.Button>
          <next.Button color='primary' size='sm' type='submit'>
            Save
          </next.Button>
        </next.ButtonGroup>
      </form>
    </div>
  )
}
