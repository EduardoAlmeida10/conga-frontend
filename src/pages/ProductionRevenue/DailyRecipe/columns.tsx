import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DailyRecipe } from "@/entities/DailyRecipe";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon } from "lucide-react";

export const dailyRecipeColumns = (
  handleEdit: (record: DailyRecipe) => void,
): ColumnDef<DailyRecipe>[] => [
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total (R$)" />
    ),
    cell: ({ row }) => {
      const value = row.original.total;
      return (
        <div className="text font-bold">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
    meta: { nameInFilters: "Total" },
  },
  {
    accessorKey: "tanque",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanque (L)" />
    ),
    cell: ({ row }) => {
      const value = row.original.tanque;
      return <div className="text">{value.toFixed(0)} L</div>;
    },
    meta: { nameInFilters: "Tanque" },
  },
  {
    accessorKey: "precoLeite",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço Leite (R$)" />
    ),
    cell: ({ row }) => {
      const value = row.original.precoLeite;
      return (
        <div className="text">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
    meta: { nameInFilters: "Preço Leite" },
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
