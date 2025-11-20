import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BaseExpense } from "@/hooks/useExpenseData";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
export const utilitarioColumns = (
  onEdit: (expense: BaseExpense) => void,
  onDelete: (expense: BaseExpense) => void,
): ColumnDef<BaseExpense>[] => [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    meta: { nameInFilters: "Tipo" },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<string>();
      if (!date || date === "0000-00-00") return "-";

      const [year, month, day] = date.split("-").map(Number);
      return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
    },
    meta: { nameInFilters: "Data" },
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor (R$)" />
    ),
    cell: ({ getValue }) => {
      const value = parseFloat(getValue<string>() || "0");
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    },
    meta: { nameInFilters: "Valor" },
  },
  {
    accessorKey: "observations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observações" />
    ),
    meta: { nameInFilters: "Observações" },
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
      const expense = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onSelect={() => onEdit(expense)}>
                <Edit2Icon className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={() => onDelete(expense)}>
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
