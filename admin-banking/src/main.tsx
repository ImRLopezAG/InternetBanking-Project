import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toast } from '@/components'
import { router } from '@app/router'
import './index.css'
import { AppProvider } from './context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
          <AppProvider>
            <Toast />
            <RouterProvider router={router} />
          </AppProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
