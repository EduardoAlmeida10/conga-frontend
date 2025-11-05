import { cn } from "@/lib/utils";
import { FilterIcon, XIcon } from "lucide-react";
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

interface DataTableFacetedFilterProps {
  column: string;
  placeholder?: string;
}

export function DataTableFacetedFilter({
  column,
  placeholder = "Filtros",
}: DataTableFacetedFilterProps) {
  const { table } = useDataTable();
  const tableColumn = table.getColumn(column);

  const facetValues = tableColumn?.getFacetedUniqueValues();
  const options = facetValues ? Array.from(facetValues.keys()) : [];

  const currentFilter = (tableColumn?.getFilterValue() as string) ?? "";

  const handleValueChange = (value: string) => {
    if (!tableColumn) return;
    tableColumn.setFilterValue(value === currentFilter ? undefined : value);
  };

  const clearFilter = () => tableColumn?.setFilterValue(undefined);

  return (
    <div className="flex items-center gap-2">
      <Select value={currentFilter} onValueChange={handleValueChange}>
        <SelectTrigger
          className={cn(
            "w-max [&_.lucide-chevron-down]:hidden px-4",
            currentFilter && "border-primary bg-primary/5",
          )}
        >
          <FilterIcon className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.length === 0 ? (
              <div className="p-2 text-center text-sm text-muted-foreground">
                Nenhuma opção disponível
              </div>
            ) : (
              options.map((option) => {
                const count = facetValues?.get(option) ?? 0;
                const isSelected = currentFilter === option;

                return (
                  <SelectItem
                    key={option}
                    value={option}
                    className={cn(
                      "cursor-pointer flex justify-between items-center",
                      isSelected && "bg-accent font-medium",
                    )}
                  >
                    <span className={cn(isSelected && "text-primary")}>
                      {option}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({count})
                    </span>
                  </SelectItem>
                );
              })
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentFilter && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilter}
          className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
          title="Limpar filtro"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
