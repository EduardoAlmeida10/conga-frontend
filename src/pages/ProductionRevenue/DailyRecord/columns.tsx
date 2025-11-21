import type { ColumnDef } from "@tanstack/react-table";
import type { DailyRecord } from "@/entities/DailyRecord";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

export const columns: ColumnDef<DailyRecord>[] = [
  {
    accessorKey: "sellable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendável (Litros)" />
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
  {
    accessorKey: "producer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produtor" />
    ),
  },
];
