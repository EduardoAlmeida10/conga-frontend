import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../api/users-costApi";
import {
  EllipsisIcon,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export const getUserColumns = (
  handleEdit: (user: User) => void,
  handleDelete: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "username",
    header: "Usuário",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
  {
    id: "actions",
    size: 80,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableResizing: false,
    enableMultiSort: false,
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleEdit(user)}>
                <Edit2Icon className="size-4 mr-2" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => handleDelete(user)}>
                <Trash2Icon className="size-4 mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
