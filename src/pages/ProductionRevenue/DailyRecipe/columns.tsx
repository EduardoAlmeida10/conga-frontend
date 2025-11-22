import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { DailyRecipe } from "@/entities/DailyRecipe";

export const columns: ColumnDef<DailyRecipe>[] = [
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total (R$)" />
    ),
  },
  {
    accessorKey: "tanque",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanque (L)" />
    ),
  },
  {
    accessorKey: "precoLeite",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço Leite (R$)" />
    ),
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
  },
];
