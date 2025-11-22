import type { ColumnDef } from "@tanstack/react-table";
import type { ProducerProduction } from "@/api/productions/productionProducer.ts";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getProducerProductionColumns =
  (): ColumnDef<ProducerProduction>[] => [
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

export const getProducerProductionRequestColumns = (
  handleEdit: (request: ProducerProductionRequest) => void,
  handleDelete: (request: ProducerProductionRequest) => void,
): ColumnDef<ProducerProductionRequest>[] => [
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
      if (!dateStr) return "";
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();
      let label = status;
      let colorClass = "text-gray-700";

      switch (status) {
        case "PENDING":
          label = "Pendente";
          colorClass = "text-blue-500";
          break;
        case "APPROVED":
          label = "Aprovado";
          colorClass = "text-green-500";
          break;
        case "REJECTED":
          label = "Rejeitado";
          colorClass = "text-red-500";
          break;
      }

      return <span className={colorClass}>{label}</span>;
    },
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
      const request = row.original;

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
                onSelect={() => handleEdit(request)}
              >
                <Edit2Icon className="size-4 mr-2" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => handleDelete(request)}
              >
                <Trash2Icon className="size-4 mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
