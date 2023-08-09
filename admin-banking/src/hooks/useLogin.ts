import { AppContext, useAuthStore } from '@/app/context'
import { CONSTANTS } from '@/constants'
import { UserBuilder, UserModel } from '@/models'
import { decodeJwt } from 'jose'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  loading: boolean
  success?: boolean
  data: {
    token: string
    success: boolean
  }
}

interface ReturnTypes {
  form: LoginForm
  login: LoginResponse
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  toggleVisibility: () => void
  isVisible: boolean
}

export function useLogin(): ReturnTypes {
  const { BASEURL, ROUTES } = CONSTANTS
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: ''
  })
  const [isVisible, setIsVisible] = useState(false)

  const [login, setLogin] = useState<LoginResponse>({
    message: '',
    loading: false,
    data: {
      success: false,
      token: ''
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const toggleVisibility = (): void => setIsVisible(!isVisible)

  const { setUser, setToken } = useContext(AppContext)

  const Login = async (): Promise<void> => {
    setLogin({ ...login, loading: true })
    await fetch(`${BASEURL + ROUTES.AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(async (res) => {
      if (!res.ok) {
        setLogin({
          ...login,
          loading: false
        })
        throw new Error('invalid username or password')
      }
      const data = await res.json()
      const { token } = data
      const payload = decodeJwt(token)
      if(payload.role !== 1){
        setLogin({
          ...login,
          loading: false
        })
        throw new Error('You must be an admin to access this page')
      }
      setToken(token)
      await fetch(`${BASEURL + ROUTES.USER}/username/${payload.sub}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
          if (!res.ok) {
            setLogin({
              ...login,
              loading: false
            })
            throw new Error('error getting user')
          }
          const data = await res.json()
          const {firstName, lastName, username, email, createdAt, role}:UserModel = data
          const {_id} = data
          const user = new UserBuilder()
                    .setId(_id)
                    .setFirstName(firstName)
                    .setLastName(lastName)
                    .setUsername(username)
                    .setEmail(email)
                    .setCreatedAt(createdAt)
                    .setRole(role)
                    .build()
          setUser(user)
      })
      setLogin({
        ...login,
        loading: false,
        success: true,
        data
      })
    })
  }

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    await toast.promise(Login(), {
      loading: 'Loading...',
      success: 'Login success!',
      error: (err) => err.message
    })
  }

  return { form, login, handleChange, handleLogin, toggleVisibility, isVisible }
}
