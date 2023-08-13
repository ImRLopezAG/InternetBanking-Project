import { BaseModel } from "@/models/base";
import * as next from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


interface tableProps<T extends BaseModel> {
  label: string
  entities: T[]
  columns: Column[]
  renderCell: (entity: T, columnKey: React.Key) => JSX.Element
}

interface Column {
  uid: string
  name: string
}

export const Table = <T extends BaseModel>({entities, columns,renderCell, label }: tableProps<T>): JSX.Element => {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => navigate(path)
  return (
    <section className=" flex flex-col justify-center align-center px-32">
      <div className="mb-3">
        <next.Button radius='lg' color='primary' onClick={() => handleNavigation(`/${label}/create`)}>Create {label}</next.Button>
      </div>
      <next.Table className=' mx-auto' aria-label={`list-of-${label}`}>
        <next.TableHeader columns={columns}>
          {(column) => (
            <next.TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </next.TableColumn>
          )}
        </next.TableHeader>
        <next.TableBody items={entities}>
          {(item) => (
            <next.TableRow key={item.id}>
              {(columnKey) => <next.TableCell>{renderCell(item, columnKey)}</next.TableCell>}
            </next.TableRow>
          )}
        </next.TableBody>
      </next.Table>
    </section>
  )
}
