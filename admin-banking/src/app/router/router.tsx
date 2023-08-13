import { Home, Login, Payment, Product, User } from '@/app/pages'
import { SaveProduct } from '@pages/product/save'
import { SaveUser } from '@pages/user/save'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './'
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
        element: <ProtectedRoute element={<Home />} />
      },
      {
        path: 'user',
        element: <ProtectedRoute element={<User />} />,
      },
      {
        path: 'user/create',
        element: <ProtectedRoute element={<SaveUser isEdit/>} />
      },
      {
        path: 'user/sign-up',
        element: <SaveUser />
      },
      {
        path: 'payment',
        element: <ProtectedRoute element={<Payment />} />
      },
      {
        path: 'product',
        element: <ProtectedRoute element={<Product />} />,
      },
      {
        path: 'product/create',
        element: <ProtectedRoute element={<SaveProduct />} />
      }
    ]
  }
])
