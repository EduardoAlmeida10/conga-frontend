import {
  type ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableContext } from "./DataTableContext";

interface IDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  children: React.ReactNode;
  pagination?: PaginationState;
}

export function DataTable<TData>({
  columns,
  data,
  children,
  pagination,
}: IDataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 100,
      minSize: 80,
    },
    globalFilterFn: "includesString",
    initialState: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  );
}
