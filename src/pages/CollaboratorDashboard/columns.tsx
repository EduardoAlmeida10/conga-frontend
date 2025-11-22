import type { ColumnDef } from "@tanstack/react-table";
import type { ProducerProduction } from "@/api/productions/productionProducer.ts";

export const getProducerProductionColumns = (): ColumnDef<ProducerProduction>[] => [
  {
    accessorKey: "producerName",
    header: "Produtor",
  },
  {
    accessorKey: "totalQuantity",
    header: "Vendável (Litros)",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ getValue }) => {
    const dateStr = getValue<string>();
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  },
  },
];
