import type { ReactNode } from "react";

interface CardAnalysisProps {
  title: string;
  value: number;
  is: "valor" | "litros";
  children: ReactNode;
  color?: string;
}

export default function CardAnalysis({
  title,
  value,
  is,
  children,
  color = "bg-primary-100",
}: CardAnalysisProps) {
  return (
    <div className="flex justify-center items-center py-4 w-60 gap-10 bg-white rounded-xl">
      <label>
        <h1 className="text-gray-400 text-[16px]">{title}</h1>
        {is === "valor" && <p className="font-bold text-[17px]">R$ {value.toFixed(2)}</p>}
        {is === "litros" && <p className="font-bold text-[17px]">{value} Litros</p>}
      </label>
      <div
        className={`flex justify-center items-center h-12 w-12 rounded-xl text-white ${color}`}
      >
        {children}
      </div>
    </div>
  );
}
