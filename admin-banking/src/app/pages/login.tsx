import { useLogin } from '@/hooks'
import * as next from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = (): JSX.Element => {
  const navigate = useNavigate()

  const { form, handleChange, handleLogin, login } = useLogin({
    onSuccess: () => {
      navigate('/home')
    }
  })

  const { state, message } = login.error

  return (
    <section className='flex flex-col justify-center items-center mt-16 gap-4'>
      <h1 className='text-blue-500 text-4xl'>
        Welcome to <br />
        <span className='text-default-900 text-3xl'>Cash Bank</span>
      </h1>
      <next.Card className='w-1/4 max-[32rem]:'>
        <next.CardHeader className='flex gap-3'>
          <h1 className='text-4xl'>Login</h1>
        </next.CardHeader>
        <next.CardBody>
          <form className='flex flex-col gap-3' onSubmit={handleLogin}>
            <div className='flex flex-col min-w-xs'>
              <label htmlFor='username'>Username</label>
              <next.Input
                placeholder='Username'
                name='username'
                onChange={handleChange}
                value={form.username}
                className={`border-1 border-transparent ${state ? 'border-red-500  rounded-lg' : ''}`}
              />
              <span className='text-red-500 text-xs h-2'>{message}</span>
            </div>
            <div className='flex flex-col min-w-xs'>
              <label htmlFor='password'>Password</label>
              <next.Input
                placeholder='Enter your password'
                name='password'
                onChange={handleChange}
                value={form.password}
                type='password'
                className={`border-1 border-transparent ${state ? 'border-red-500  rounded-lg' : ''}`}
              />
              <span className='text-red-500 text-xs h-2'>{message}</span>
            </div>
            <next.Button
              color='primary'
              radius='full'
              type='submit'
              isLoading={login.loading}
            >
              Login
            </next.Button>
          </form>
        </next.CardBody>
        <next.CardFooter>
          <p className='text-center text-xs'>
            Don't have an account?{' '}
            <Link to='user/sign-up' className='text-blue-500 text-sm'>
              Sign up
            </Link>
          </p>
        </next.CardFooter>
      </next.Card>
    </section>
  )
}
