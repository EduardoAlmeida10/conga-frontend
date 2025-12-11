import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LocalRecord } from "@/entities/LocalRecord";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";

export const getLocalRecordColumns = (
  handleEdit: (record: LocalRecord) => void,
  handleDelete: (record: LocalRecord) => void,
): ColumnDef<LocalRecord>[] => [
  {
    accessorKey: "grossQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Local (L)" />
    ),
    cell: ({ row }) => {
      const value = row.original.grossQuantity;
      return <div className="text">{value.toFixed(0)} L</div>;
    },
    meta: { nameInFilters: "Produção Local" },
  },

  {
    accessorKey: "consumedQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumo Local (L)" />
    ),
    cell: ({ row }) => {
      const value = row.original.consumedQuantity;
      return <div className="text">{value.toFixed(0)} L</div>;
    },
    meta: { nameInFilters: "Consumo Local" },
  },

  {
    accessorKey: "totalQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Produção Total Tanque (L)"
      />
    ),
    cell: ({ row }) => {
      const value = row.original.totalQuantity;
      return <div className="text">{value.toFixed(0)} L</div>;
    },
    meta: { nameInFilters: "Produção Total Tanque" },
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const d = row.original.date;
      return d.toLocaleDateString("pt-BR");
    },
    meta: { nameInFilters: "Data" },
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
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => handleEdit(record)}
              >
                <Edit2Icon className="size-4" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => handleDelete(record)}
              >
                <Trash2Icon className="size-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

