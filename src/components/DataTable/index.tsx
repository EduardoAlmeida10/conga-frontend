import {
  type ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { DataTableContext } from "./DataTableContext";

interface IDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  children: React.ReactNode;
  pagination?: PaginationState;
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData>({
  columns,
  data,
  children,
  pagination: externalPagination,
  onPaginationChange,
  pageCount,
}: IDataTableProps<TData>) {
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  );

  const pagination = externalPagination ?? internalPagination;

  const handlePaginationChange = onPaginationChange ?? setInternalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount,

    onPaginationChange: handlePaginationChange,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  );
}
