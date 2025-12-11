import type { DailyProduction } from "@/api/productions/dailyProduction";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";

export const dailyProductionColumns: ColumnDef<DailyProduction>[] = [
  {
    accessorKey: "grossQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Local (L)" />
    ),
    cell: ({ row }) => {
      const value = Number(row.getValue("grossQuantity"));
      return <span>{value.toFixed(2)} L</span>;
    },
    meta: { nameInFilters: "Produção Local" },
  },
  {
    accessorKey: "consumedQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumido (L)" />
    ),
    cell: ({ row }) => {
      const value = Number(row.getValue("consumedQuantity"));
      return <span>{value.toFixed(2)} L</span>;
    },
    meta: { nameInFilters: "Consumido" },
  },
  {
    accessorKey: "totalQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Total (L)" />
    ),
    cell: ({ row }) => {
      const value = Number(row.getValue("totalQuantity"));
      return <span>{value.toFixed(2)} L</span>;
    },
    meta: { nameInFilters: "Produção Total" },
  },
  {
    accessorKey: "totalProducers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outros Produtores (L)" />
    ),
    cell: ({ row }) => {
      const value = Number(row.getValue("totalProducers"));
      return <span>{value} L</span>;
    },
    meta: { nameInFilters: "Outros Produtores" },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      const iso = row.getValue<string>("date");
      const formatted = new Date(iso).toLocaleDateString("pt-BR");
      return <span>{formatted}</span>;
    },
    meta: { nameInFilters: "Data" },
  },
];
