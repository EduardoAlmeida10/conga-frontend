// CardExpensesFooter.tsx
import Pagination from "../Pagination";

interface CardExpensesFooterProps {
  text?: string
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function CardExpensesFooter({
  text,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: CardExpensesFooterProps) {
  return (
    <div className="flex justify-between w-full">
      <h1 className="text-[20px] font-bold">{text}</h1>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
