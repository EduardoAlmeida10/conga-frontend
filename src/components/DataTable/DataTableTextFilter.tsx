import { Input } from "../ui/input";
import { useDataTable } from "./DataTableContext";

interface IDataTableTextFilterProps {
  column?: string;
  placeholder?: string;
}

export function DataTableTextFilter({
  placeholder,
  column,
}: IDataTableTextFilterProps) {
  const { table } = useDataTable();

  if (column) {
    const tableColumn = table.getColumn(column);
    const value = tableColumn?.getFilterValue() as string | undefined;

    return (
      <Input
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(event) => tableColumn?.setFilterValue(event.target.value)}
      />
    );
  }

  return (
    <Input
      className="w-72"
      placeholder={placeholder}
      onChange={(event) => table?.setGlobalFilter(event.target.value)}
    />
  );
}
