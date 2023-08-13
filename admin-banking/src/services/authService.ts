import { CONSTANTS } from '@/constants'
import { UserBuilder, UserModel } from '@/models'
import { decodeJwt } from 'jose'
interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  success?: boolean
  data: {
    token: string
    success: boolean
    user: UserModel
  }
}

interface Response{
  message: string
  success?: boolean
  data: object
}

const { BASEURL, ROUTES } = CONSTANTS

export class AuthService {
  static instance: AuthService

  static getInstance (): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService()
    return AuthService.instance
  }
  private constructor () {}

  async login ({ ...form }: LoginForm): Promise<LoginResponse> {
    const token = await fetch(`${BASEURL + ROUTES.AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('invalid username or password')
      }
      const data = await res.json()
      const { token } = data
      return token
    })

    const payload = decodeJwt(token)
    if (payload.role !== 1) {
      return {
        message: 'You are not an admin',
        success: false,
        data: {
          token,
          success: false,
          user: {} as UserModel
        }
      }
    }

    const user = await fetch(
      `${BASEURL + ROUTES.USER}/username/${payload.sub}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ).then(async (res) => {
      if (!res.ok) {
        throw new Error('error getting user')
      }
      const data = await res.json()
      const {
        firstName,
        lastName,
        username,
        email,
        createdAt,
        role
      }: UserModel = data
      const { _id } = data
      return new UserBuilder()
        .setId(_id)
        .setFirstName(firstName)
        .setLastName(lastName)
        .setUsername(username)
        .setEmail(email)
        .setCreatedAt(createdAt)
        .setRole(role)
        .build()
    })

    return {
      message: 'success',
      success: true,
      data: {
        token,
        success: true,
        user
      }
    }
  }

  async register ({ ...form }: UserModel): Promise<Response> {
    return await fetch(`${BASEURL + ROUTES.AUTH}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(async (response) => {
      const data = await response.json()
      if (!response.ok) {
        return {
          message: response.statusText,
          success: false,
          data: {}
        }
      }
      return {
        message: 'success',
        success: true,
        data
      }
    })
  }

  async update ({ token, ...user }: UserModel & { token: string }): Promise<Response> {
    return await fetch(`${BASEURL + ROUTES.USER}/${user.id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(async (response) => {
      const data = await response.json()
      if (!response.ok) {
        return {
          message: response.statusText,
          success: false,
          data: {}
        }
      }
      
      const { firstName, lastName, username, email, createdAt, role }: UserModel = data
      const { _id } = data
      return {
        message: 'success',
        success: true,
        data: new UserBuilder()
          .setId(_id)
          .setFirstName(firstName)
          .setLastName(lastName)
          .setUsername(username)
          .setEmail(email)
          .setCreatedAt(createdAt)
          .setRole(role)
          .build()
      }
    })
  }
}

