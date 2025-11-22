import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
import type { ProducerProduction } from "@/api/productions/productionProducer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getProducerProductionColumns = (
  handleEdit: (record: ProducerProduction) => void,
  handleDelete: (record: ProducerProduction) => void
): ColumnDef<ProducerProduction>[] => [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  {
    accessorKey: "producerName",
    header: "Produtor",
  },
  {
    accessorKey: "totalQuantity",
    header: "Vendável (Litros)",
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
      const record = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onSelect={() => handleEdit(record)}>
                <Edit2Icon className="size-4 mr-2" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer" onSelect={() => handleDelete(record)}>
                <Trash2Icon className="size-4 mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
