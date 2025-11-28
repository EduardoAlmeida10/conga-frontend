import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";

export type Relatorio = {
  categoria: string;
  tipo: "receita" | "despesa";
  valor: number;
};

export const relatorioColumns: ColumnDef<Relatorio>[] = [
  {
    accessorKey: "categoria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const value = row.original.categoria;
      return <div className="text font-semibold">{value}</div>;
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const value = row.original.tipo;
      return (
        <div className={`${value === "receita"}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "valor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor (R$)" />
    ),
    cell: ({ row }) => {
      const value = row.original.valor;
      return (
        <div>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
];
