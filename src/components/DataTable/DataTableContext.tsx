import type { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";

interface IDataTableContextValue {
  table: Table<any>;
}

export const DataTableContext = createContext({} as IDataTableContextValue);

export function useDataTable() {
  const ctxValue = useContext(DataTableContext);

  if (!ctxValue) {
    throw new Error("`useDataTable` should be used inside a DataTable.");
  }

  return ctxValue;
}
