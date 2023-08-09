import { useLogin } from '@/hooks'
import { Eyes, EyesSlash } from '@components/icons'
import * as next from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = (): JSX.Element => {
  const {
    form,
    handleChange,
    toggleVisibility,
    handleLogin,
    isVisible,
    login
  } = useLogin()

  const navigate = useNavigate()

  if (login.success) {
    navigate('/home')
  }

  return (
    <section className='flex flex-col justify-center items-center h-screen gap-4'>
      <h1 className='text-blue-500 text-4xl'>
        Welcome to <br/><span className='text-default-900 text-3xl'>Cash Bank</span>
      </h1>
      <next.Card className='max-w-[600px]'>
        <next.CardHeader className='flex gap-3'>
          <h1>Login</h1>
        </next.CardHeader>
        <next.CardBody>
          <form className='flex flex-col gap-3' onSubmit={handleLogin}>
            <label htmlFor='username'>Username</label>
            <next.Input
              placeholder='Username'
              name='username'
              onChange={handleChange}
              value={form.username}
            />
            <label htmlFor='password'>Password</label>
            <next.Input
              placeholder='Enter your password'
              name='password'
              onChange={handleChange}
              value={form.password}
              endContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Eyes props='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <EyesSlash props='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              className='max-w-xs'
            />
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
            <Link to='/' className='text-blue-500 text-sm'>
              Sign up
            </Link>
          </p>
        </next.CardFooter>
      </next.Card>
    </section>
  )
}
