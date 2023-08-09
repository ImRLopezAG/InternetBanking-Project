import { useUser } from "@/hooks";
import * as next from "@nextui-org/react";
import { Link } from "react-router-dom";

export const User = (): JSX.Element => {
  const {columns, users, renderCell} = useUser()

  return (
    <div className="flex-col justify-center align-center">
      <Link to='/user/create' className='ml-24'>
        <next.Button radius='lg' color='primary'>Create</next.Button>
      </Link>
      <section className='flex flex-col justify-center mt-4'>
        <next.Table className='w-4/5 mx-auto' aria-label='list-of-user'>
          <next.TableHeader columns={columns}>
            {(column) => (
              <next.TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </next.TableColumn>
            )}
          </next.TableHeader>
          <next.TableBody items={users}>
            {(item) => (
              <next.TableRow key={item.id}>
                {(columnKey) => <next.TableCell>{renderCell(item, columnKey)}</next.TableCell>}
              </next.TableRow>
            )}
          </next.TableBody>
        </next.Table>
      </section>
    </div>
  )
}
