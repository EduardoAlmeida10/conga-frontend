import type { Column } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOffIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface IDataTableColumnHeaderProps {
  column: Column<any>;
  title: React.ReactNode;
}

export function DataTableColumnHeader({
  column,
  title,
}: IDataTableColumnHeaderProps) {
  if (!column.getCanSort()) {
    return title;
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 data-[state=open]:bg-accent"
          >
            {title}
            {!column.getIsSorted() && <ChevronsUpDown />}
            {column.getIsSorted() === "asc" && <ArrowUpIcon />}
            {column.getIsSorted() === "desc" && <ArrowDownIcon />}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="text-muted-foreground size-3" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="text-muted-foreground size-3" />
            Desc
          </DropdownMenuItem>

          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => column.toggleVisibility(false)}>
                <EyeOffIcon className="text-muted-foreground size-3" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
