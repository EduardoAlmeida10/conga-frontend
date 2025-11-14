import type { Invoice } from "@/entities/Invoice";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
import { DataTableColumnHeader } from "../../components/DataTable/DataTableColumnHeader";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendável (Litros)" />
    ),
    size: 80,
    enableResizing: false,
    enableSorting: false,
    meta: {
      nameInFilters: "Order number #",
    },
  },
  {
    accessorKey: "paymentStatus",
    meta: {
      nameInFilters: "Payment Status",
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={<div className="flex items-center gap-1">Data</div>}
      />
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produtor" />
    ),
    meta: {
      nameInFilters: "Payment Method",
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
      const invoice = row.original;

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
                onSelect={() => alert(`Edit ${invoice.invoice}`)}
              >
                <Edit2Icon className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => alert(`Delete ${invoice.invoice}`)}
              >
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
