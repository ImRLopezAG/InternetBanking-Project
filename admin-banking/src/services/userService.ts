import { CONSTANTS } from "@/constants"
import { UserBuilder, UserModel } from "@/models"
const { BASEURL, ROUTES } = CONSTANTS

const URL = `${BASEURL+ROUTES.USER}/`

interface Default{
  token: string | null
}

export class UserService{

  static instance: UserService

  static getInstance(): UserService {
    if (!this.instance) this.instance = new UserService()
    return this.instance
  }

  private constructor() {}

  async getAll({token}: Default): Promise<UserModel[]> {
    const response = await fetch(`${URL}list`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then( async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    }).catch((error) => {
      return error;
    });

    return response.map((user: any) => {
      const { _id, firstName, lastName, email, role, createdAt, username } = user
      return new UserBuilder()
        .setId(_id)
        .setFirstName(firstName)
        .setLastName(lastName)
        .setUsername(username)
        .setEmail(email)
        .setRole(role)
        .setCreatedAt(createdAt)
        .build()
    })
  }

  async getById({token, id}: Default & {id: string}): Promise<UserModel> {
    const response = await fetch(`${URL}get/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then( async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    }).catch((error) => {
      return error;
    });

    const { _id, firstName, lastName, email, role, createdAt } = response
    const user = new UserBuilder()
      .setId(_id)
      .setFirstName(firstName)
      .setLastName(lastName)
      .setEmail(email)
      .setRole(role)
      .setCreatedAt(createdAt)
      .build()
    return user
  }
}

