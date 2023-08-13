import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '@/app/context'

interface ProtectedRouteProps {
  element: React.ReactNode
}

export function ProtectedRoute ({ element }: ProtectedRouteProps): JSX.Element {
  const { user } = useContext(AppContext)
  if (!user) {
    return <Navigate to="/" />
  }

  return <>{element}</>
}