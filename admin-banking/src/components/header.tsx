import { AppContext } from '@/context'
import { Button } from '@nextui-org/button'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun } from '@components/icons'

export const Header = (): JSX.Element => {
  const {logout} = useContext(AppContext)
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleTheme = () => {
    const html = document.querySelector('html')
    html?.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <header>
      <nav className='flex gap-2 [&>a]:text-blue-500'>
        <Link to='/home'>Home</Link>
        <Link to='/user'>User</Link>
        <Link to='/payment'>Payment</Link>
        <Link to='/product'>Products</Link>
        <Button size='sm' variant='light' radius='full' color='primary' onClick={handleLogout}>
          Logout
        </Button>
        <Button size='sm' variant='light' radius='full' color='primary' onClick={handleTheme}>
          {isDark ? <Sun props='text-yellow-500 text-2xl' /> : <Moon props='text-gray-900 text-2xl' />}
        </Button>
      </nav>
    </header>
  )
}
