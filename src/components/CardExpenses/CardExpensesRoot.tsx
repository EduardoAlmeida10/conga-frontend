import type { ReactNode } from "react";

interface CardExpensesRootProps {
  title?: string
  children: ReactNode;
}

export default function CardExpensesRoot({ children, title }: CardExpensesRootProps) {
  return(
    <div  className="flex flex-col bg-white justify-center items-center w-max p-5 gap-5 rounded-2xl">
      <h1 className="font-bold text-2xl">{title}</h1>
      {children}
    </div>
  )
}
