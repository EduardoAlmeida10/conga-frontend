import {
  ChevronLeftIcon,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDataTable } from "./DataTableContext";

export function DataTablePagination() {
  const { table } = useDataTable();

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <small>Linhas por página</small>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[80px] h-[32px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {[2, 4, 6, 8, 10].map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <small>
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </small>

      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={table.firstPage}>
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={table.lastPage}>
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
