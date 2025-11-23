import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { DailyRecipe } from "@/entities/DailyRecipe";
import type { ColumnDef } from "@tanstack/react-table";

export const dailyRecipeColumns: ColumnDef<DailyRecipe>[] = [
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total (R$)" />
    ),
    cell: ({ row }) => {
      const value = row.original.total;
      return (
        <div className="text font-bold">
          {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>
      );
    },
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
          {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>
      );
    },
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