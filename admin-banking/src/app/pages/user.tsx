import { useUser } from '@/app/hooks'
import { UserModel } from '@/models'
import { Table } from '@app/components'

export const User = (): JSX.Element => {
  const { columns, users, renderCell } = useUser()

  return (
    <Table<UserModel>
      label='user'
      columns={columns}
      entities={users}
      renderCell={renderCell}
    />
  )
}
