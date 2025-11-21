import type { ColumnDef } from "@tanstack/react-table";
import type { TotalRecord } from "@/entities/TotalRecord";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

export const columns: ColumnDef<TotalRecord>[] = [
  {
    accessorKey: "localProduction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local Production (L)" />
    ),
  },
  {
    accessorKey: "consumption",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumption (L)" />
    ),
  },
  {
    accessorKey: "totalProduction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Production (L)" />
    ),
  },
  {
    accessorKey: "otherProducers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Other Producers (L)" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const d = row.original.date;
      return d.toLocaleDateString("pt-BR");
    },
  },
];
