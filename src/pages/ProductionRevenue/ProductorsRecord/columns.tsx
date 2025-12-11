import type { ProducerProduction } from "@/api/productions/productionProducer";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckIcon,
  Edit2Icon,
  EllipsisIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

export const getProducerProductionColumns = (
  handleEdit: (record: ProducerProduction) => void,
  handleDelete: (record: ProducerProduction) => void,
): ColumnDef<ProducerProduction>[] => [
  {
    accessorKey: "producerName",
    header: "Produtor",
    meta: { nameInFilters: "Produtor" },
  },
  {
    accessorKey: "totalQuantity",
    header: "Vendável (L)",
    cell: ({ getValue }) => `${getValue<number>()} L`,
    meta: { nameInFilters: "Vendável" },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    },
    meta: { nameInFilters: "Data" },
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
      const record = row.original;

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
                onSelect={() => handleEdit(record)}
              >
                <Edit2Icon className="size-4 mr-2" /> Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => handleDelete(record)}
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

export const getValidationColumns = (
  handleAction: (
    request: ProducerProductionRequest,
    type: "approve" | "reject",
  ) => void,
): ColumnDef<ProducerProductionRequest>[] => [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  {
    accessorKey: "producerName",
    header: "Produtor",
  },
  {
    accessorKey: "totalQuantity",
    header: "Vendável (L)",
    cell: ({ getValue }) => `${getValue<number>()} L`,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div className="flex gap-5">
          <button
            onClick={() => handleAction(request, "approve")}
            className="cursor-pointer"
          >
            <CheckIcon className="w-5 h-5 text-green-500" />
          </button>

          <button
            onClick={() => handleAction(request, "reject")}
            className="cursor-pointer"
          >
            <XIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
      );
    },
  },
];
