import { isAfter } from "./dateComparisons";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface CreateDateRangeSettersParams {
  getDateFrom: () => string | undefined;
  getDateTo: () => string | undefined;
  setDateFrom: SetState<string | undefined>;
  setDateTo: SetState<string | undefined>;
}

export function createDateRangeSetters({
  getDateFrom,
  getDateTo,
  setDateFrom,
  setDateTo,
}: CreateDateRangeSettersParams) {
  const setDateFromSafe = (value?: string) => {
    const dateTo = getDateTo();
    setDateFrom(value);

    if (value && dateTo && isAfter(value, dateTo)) {
      setDateTo(value);
    }
  };

  const setDateToSafe = (value?: string) => {
    const dateFrom = getDateFrom();

    if (dateFrom && value && isAfter(dateFrom, value)) {
      return; // bloqueia
    }

    setDateTo(value);
  };

  return {
    setDateFromSafe,
    setDateToSafe,
  };
}

