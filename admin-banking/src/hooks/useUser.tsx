import { UserModel } from '@/models'
import { UserService } from '@/services'
import { AppContext } from '@app/context'
import { Delete, Edit, Eyes } from '@components/icons'
import * as next from "@nextui-org/react"
import { useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'

interface Column {
  uid: string
  name: string
}

interface ReturnType {
  users: UserModel[]
  columns: Column[]
  renderCell: (user: UserModel, columnKey: React.Key) => JSX.Element
}

export function useUser (): ReturnType {
  const { token } = useContext(AppContext)
  const [users, setUsers] = useState<UserModel[]>([])

  const service = UserService.getInstance()
  const { data, isSuccess, ...query } = useQuery({
    queryKey: ['user-list'],
    queryFn: async () => await service.getAll({ token })
  })

  useEffect(() => {
    if (isSuccess) {
      setUsers(data)
    }
  }, [query])

  const columns: Column[] = [
    { uid: "name", name: "Name" },
    { uid: "email", name: "Email" },
    { uid: "role", name: "Role" },
    { uid: "actions", name: "Actions" }
  ]

  const roles: Record<number, string> = {
    1: "Admin",
    2: "Client"
  }
  
  const renderCell = useCallback((user: UserModel, columnKey: React.Key) => {
    const elements: Record<string, JSX.Element> = {
      name: (
        <next.User
          avatarProps={{radius: "lg", src: 'https://www.wintrustmortgage.com/content/dam/wintrust/headshots/missingheadshot.jpg'}}
          description={ user.firstName + " " + user.lastName}
          name={user.firstName + " " + user.lastName}
        >
          {user.firstName + " " + user.lastName}
        </next.User>
      ),
      email: (
        <p className="text-bold text-sm capitalize">{user.email}</p>
      ),
      role: (
        <p className="text-bold text-sm capitalize">{roles[user.role]}</p>
      ),
      actions: (
        <div className="relative flex items-center gap-2">
          <next.Tooltip content="Details" color='success'>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Eyes />
            </span>
          </next.Tooltip>
          <next.Tooltip content="Edit user" color='primary'>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Edit />
            </span>
          </next.Tooltip>
          <next.Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Delete />
            </span>
          </next.Tooltip>
        </div>
      )
    }
    return elements[columnKey]
  }, [])

  return { users, columns, renderCell }
}