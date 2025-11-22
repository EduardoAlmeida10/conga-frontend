import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { LocalRecord } from "@/entities/LocalRecord";

export const columns: ColumnDef<LocalRecord>[] = [
  {
    accessorKey: "producaoLocal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Local (L)" />
    ),
  },
  {
    accessorKey: "consumoLocal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumo Local (L)" />
    ),
  },
  {
    accessorKey: "producaoTotal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Total tanque (L)" />
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
