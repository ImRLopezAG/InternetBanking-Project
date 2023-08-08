import { UserModel } from '@/models'
import { createContext, useState } from 'react'
import { useAuthStore } from './authStore'

interface AppContextProps {
  user?: UserModel | null
  token: string | null
  setUser: (user: UserModel) => void
  setToken: (token: string) => void
  logout: () => void
}
export const AppContext = createContext<AppContextProps>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  logout: () => {}
})

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider ({ children }: AppProviderProps): JSX.Element {
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)
  const setUser = useAuthStore(state => state.setUser)
  const setToken = useAuthStore(state => state.setToken)
  const logout = useAuthStore(state => state.logout)

  return <AppContext.Provider value={{user, token,setToken, setUser, logout }}>{children}</AppContext.Provider>
}
