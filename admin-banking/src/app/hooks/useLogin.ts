import { AuthService } from '@/services'
import { AppContext } from '@app/context'
import { useCallback, useContext, useState } from 'react'

interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  loading: boolean
  success: boolean
  error: {
    message: string
    state: boolean
  }
}

interface useLoginProps {
  onSuccess: () => void
}

interface ReturnTypes {
  form: LoginForm
  login: LoginResponse
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export function useLogin  ({ onSuccess }: useLoginProps): ReturnTypes {
  const service = AuthService.getInstance()
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: ''
  })
  const [login, setLogin] = useState<LoginResponse>({
    loading: false,
    success: false,
    error: {
      message: '',
      state: false
    }
  })

  const { setUser, setToken } = useContext(AppContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }))
  }


  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      setLogin((prevLogin) => ({
        ...prevLogin,
        loading: true,
        success: false,
        error: {
          message: '',
          state: false
        }
      }))
      try {
        const { success, data, message } = await service.login({ ...form })
        if (success) {
          const { token, user } = data
          setUser(user)
          setToken(token)
          onSuccess()
          setLogin({
            loading: false,
            success: true,
            error: {
              message: '',
              state: false
            }
          })
        } else {
          setLogin((prevLogin) => ({
            ...prevLogin,
            loading: false,
            success: false,
            error: {
              message,
              state: true
            }
          }))
        }
      } catch (error: any) {
        setLogin((prevLogin) => ({
          ...prevLogin,
          loading: false,
          success: false,
          error: {
            message: error.message,
            state: true
          }
        }))
      }
      setTimeout(() => {
        setLogin((prevLogin) => ({
          ...prevLogin,
          error: {
            message: '',
            state: false
          }
        }))
      }, 3000)
    },
    [form, onSuccess, service, setUser, setToken]
  )

  return {
    form,
    handleChange,
    handleLogin,
    login
  }
}
