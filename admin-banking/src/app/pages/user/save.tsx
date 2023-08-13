import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from '@nextui-org/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Form {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role?: number
}

interface Props {
  isEdit?: boolean
}

export const SaveUser: React.FC<Props> = ({ isEdit }): JSX.Element => {
  const [form, setForm] = useState<Form>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 2
  })

  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () => location.pathname.includes('create') ? navigate('/user') : navigate(-1)
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <div className='flex justify-center w-full items-center'>
      <form className='flex flex-col gap-3 w-2/4  ' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <h1 className='text-4xl font-bold'>{isEdit ? 'Edit' : 'Create'} User</h1>
        </div>
        <label htmlFor='name'>Name</label>
        <Input
          name='name'
          id='name'
          placeholder='First Name'
          value={form.name}
          onChange={handleChange}
        />
        <label htmlFor='lastName'>Last Name</label>
        <Input
          name='lastName'
          id='lastName'
          placeholder='Last Name'
          value={form.lastName}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <Input
          name='email'
          id='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <Input
          name='password'
          id='password'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <Input
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm Password'
          type='password'
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {isEdit && (
          <>
            <label htmlFor='role'>Role</label>
            <Dropdown size='lg'>
              <DropdownTrigger>
                <Button variant='bordered'>Open Menu</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Dynamic Actions'>
                <DropdownItem
                  onClick={() => setForm({ ...form, role: 2 })}
                >
                  Client
                </DropdownItem>
                <DropdownItem
                  onClick={() => setForm({ ...form, role: 1 })}
                >
                  Admin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
        <ButtonGroup fullWidth>
          <Button color='danger' size='sm' type='button' onClick={handleBack}>
            Cancel
          </Button>
          <Button color='primary' size='sm' type='submit'>
            Save
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}
