import { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '@app/context'
import { UserModel } from '@/models'
import { UserService } from '@/services'
import * as next from "@nextui-org/react";
import { Eyes, Delete, Edit } from '@components/icons'

interface Column {
  uid: string
  name: string
}

interface ReturnType {
  users: UserModel[]
  columns: Column[]
  renderCell: (user: UserModel, columnKey: React.Key) => JSX.Element
}
export function useUser(): ReturnType {
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
  const renderCell = useCallback((user: UserModel, columnKey: React.Key) => {
    const cellValue = user[columnKey]
    switch (columnKey) {
      case "name":
        return (
          <next.User
            avatarProps={{radius: "lg", src: 'https://www.wintrustmortgage.com/content/dam/wintrust/headshots/missingheadshot.jpg'}}
            description={ user.firstName + " " + user.lastName}
            name={cellValue}
          >
            {user.firstName + " " + user.lastName}
          </next.User>
        );
      case "role":
        return (
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        );
      case "actions":
        return (
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
        );
      default:
        return cellValue;
    }
  }, [])

  return { users, columns, renderCell }
}