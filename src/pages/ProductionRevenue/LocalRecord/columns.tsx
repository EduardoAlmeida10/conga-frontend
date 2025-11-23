import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { LocalRecord } from "@/entities/LocalRecord";
import type { ColumnDef } from "@tanstack/react-table";

export const localRecordColumns: ColumnDef<LocalRecord>[] = [
  {
    accessorKey: "grossQuantity", 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Local (L)" />
    ),
    cell: ({ row }) => {
      const value = row.original.grossQuantity;
      return <div className="text">{value.toFixed(0)} L</div>;
    },
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
  },
  {
    accessorKey: "totalQuantity", 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produção Total Tanque (L)" />
    ),
    cell: ({ row }) => {
      const value = row.original.totalQuantity;
      return <div className="text">{value.toFixed(0)} L</div>;
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