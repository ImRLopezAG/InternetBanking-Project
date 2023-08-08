import { Home, Login, Payment, Product, User } from '@/app/pages'
import { AppContext } from '@/context'
import { useContext } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { App } from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: 'home',
        element: <ProtectedRoute  element={<Home />} />
      },
      {
        path: 'user',
        element: <ProtectedRoute  element={<User />} />
      },
      {
        path: 'payment',
        element: <ProtectedRoute  element={<Payment />} />
      },
      {
        path: 'product',
        element: <ProtectedRoute element={<Product />} />
      }
    ]
  }
])


interface ProtectedRouteProps {
  element: React.ReactNode
}

export function ProtectedRoute({element}: ProtectedRouteProps): JSX.Element {
  const {user} = useContext(AppContext)
  console.log(user)
  if (!user) {
    return <Navigate to='/login' />
  }

  return  <>{element}</>
}
