import { Settings2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDataTable } from "./DataTableContext";

export function DataTableColumnsVisibilityDropdown() {
  const { table } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <Settings2Icon /> Visualizar
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table.getAllColumns().map((column) =>
          !column.getCanHide() ? null : (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={column.toggleVisibility}
            >
              {column.columnDef.meta?.nameInFilters ?? column.id}
            </DropdownMenuCheckboxItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
