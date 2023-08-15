import { AppContext } from '@/app/context'
import { Moon, Sun } from '@components/icons'
import * as next from '@nextui-org/react'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const { logout, user } = useContext(AppContext)
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
  const menuItems = ['Home', 'User', 'Payment', 'Product', 'LogOut']

  return (
    <next.Navbar disableAnimation isBordered>
      <next.NavbarContent className='sm:hidden' justify='start'>
        <next.NavbarMenuToggle />
      </next.NavbarContent>

      <next.NavbarContent className='sm:hidden pr-3' justify='center'>
        <next.NavbarBrand>
          <p className='font-bold text-inherit'>Cash Bank</p>
        </next.NavbarBrand>
      </next.NavbarContent>

      <next.NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <next.NavbarBrand>
          <p className='font-bold text-inherit'>Cash Bank</p>
        </next.NavbarBrand>
        {user && (
          <>
            <next.NavbarItem>
              <Link color='foreground' to='/home'>
                Home
              </Link>
            </next.NavbarItem>
            <next.NavbarItem>
              <Link color='foreground' to='/user'>
                User
              </Link>
            </next.NavbarItem>
            <next.NavbarItem>
              <Link color='foreground' to='/payment'>
                Payment
              </Link>
            </next.NavbarItem>
            <next.NavbarItem>
              <Link color='foreground' to='/product'>
                Product
              </Link>
            </next.NavbarItem>
          </>
        )}
      </next.NavbarContent>

      {user && (
        <next.NavbarContent justify='end'>
          <next.NavbarItem>
            <next.Dropdown>
              <next.DropdownTrigger>
                <next.Avatar
                  size='md'
                  src='https://www.wintrustmortgage.com/content/dam/wintrust/headshots/missingheadshot.jpg'
                />
              </next.DropdownTrigger>
              <next.DropdownMenu>
                <next.DropdownItem onClick={handleTheme}>
                  {isDark ? <Sun /> : <Moon />}
                </next.DropdownItem>
                <next.DropdownItem onClick={handleLogout}>
                  Log Out
                </next.DropdownItem>
              </next.DropdownMenu>
            </next.Dropdown>
          </next.NavbarItem>
        </next.NavbarContent>
      )}

      <next.NavbarMenu>
        {user !== null ? (
          menuItems.map((item, index) => (
            <next.NavbarMenuItem key={`${item}-${index}`}>
              {item === 'LogOut' ? (
                <next.NavbarMenuItem onClick={handleLogout}>
                Log out
                </next.NavbarMenuItem>
              ) : (
                <Link
                  className='w-full'
                  color={
                    index === 2
                      ? 'warning'
                      : index === menuItems.length - 1
                        ? 'danger'
                        : 'foreground'
                  }
                  to={item.toLowerCase()}
                >
                  {item}
                </Link>
              )}
            </next.NavbarMenuItem>
          ))
        ) : (
          <>
            <next.NavbarMenuItem>
              <Link color='foreground' to='/'>
              Login
              </Link>
            </next.NavbarMenuItem>
            <next.NavbarMenuItem>
              <Link color='foreground' to='/user/sign-up'>
              Sign Up
              </Link>
            </next.NavbarMenuItem>
          </>
        )}
      </next.NavbarMenu>
    </next.Navbar>
  )
}
