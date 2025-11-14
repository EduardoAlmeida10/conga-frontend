import type { Invoice } from "@/entities/Invoice";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CreditCardIcon,
  Edit2Icon,
  EllipsisIcon,
  Trash2Icon,
} from "lucide-react";
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
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
        title={
          <div className="flex items-center gap-1">
            <CreditCardIcon className="size-4" /> Payment Status
          </div>
        }
      />
    ),
    filterFn: "equalsString",
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    meta: {
      nameInFilters: "Payment Method",
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    meta: {
      nameInFilters: "Amount",
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
