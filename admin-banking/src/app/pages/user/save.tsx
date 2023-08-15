import * as next from '@nextui-org/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Form {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
  balance: number
  role?: number
}

interface Props {
  isEdit?: boolean
}

export const SaveUser: React.FC<Props> = ({ isEdit }): JSX.Element => {
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    role: 2,
    balance: 0
  })

  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () =>
    location.pathname.includes('create') ? navigate('/user') : navigate(-1)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { balance, ...data} = form
    console.log(data, Number(balance))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <div className='flex justify-center w-full items-center'>
      <form className='flex flex-col gap-3 w-2/4  ' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <h1 className='text-4xl font-bold'>
            {isEdit ? 'Create ' : 'Create'} User
          </h1>
        </div>
        <label htmlFor='name'>Name</label>
        <next.Input
          name='firstName'
          id='firstName'
          placeholder='First Name'
          value={form.firstName}
          onChange={handleChange}
        />
        <label htmlFor='lastName'>Last Name</label>
        <next.Input
          name='lastName'
          id='lastName'
          placeholder='Last Name'
          value={form.lastName}
          onChange={handleChange}
        />
        <label htmlFor='username'>Username</label>
        <next.Input
          name='username'
          id='username'
          placeholder='Username'
          value={form.username}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <next.Input
          name='email'
          id='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <next.Input
          name='password'
          id='password'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <next.Input
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm Password'
          type='password'
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {isEdit && (
          <>
            <label htmlFor='balance'>Balance</label>
            <next.Input
              name='balance'
              id='balance'
              placeholder='Balance'
              type='number'
              value={form.balance.toString()}
              onChange={handleChange}
            />
            <label htmlFor='role'>Role</label>
            <next.Dropdown size='lg'>
              <next.DropdownTrigger>
                <next.Button variant='bordered'>
                  { form.role === 2 ? 'Client' : 'Admin'}
                </next.Button>
              </next.DropdownTrigger>
              <next.DropdownMenu aria-label='Dynamic Actions'>
                <next.DropdownItem
                  onClick={() => setForm({ ...form, role: 2 })}
                >
                  Client
                </next.DropdownItem>
                <next.DropdownItem
                  onClick={() => setForm({ ...form, role: 1 })}
                >
                  Admin
                </next.DropdownItem>
              </next.DropdownMenu>
            </next.Dropdown>
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
