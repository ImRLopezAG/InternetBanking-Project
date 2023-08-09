import { UserModel } from '@/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  token: string | null
  user: UserModel | null
}
interface Action {
  setToken: (token: string) => void,
  setUser: (user: UserModel) => void,
  logout: () => void
}
export const useAuthStore = create(
  persist<State & Action>(
    (set, get) => ({
      token: null,
      setToken: (token: string) => {
        set({ token })
      },
      user: null,
      setUser: (user: UserModel) => {
        set({ user })
      },
      logout: () => {
        set({ token: null, user: null })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
