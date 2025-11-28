import type { ReactNode } from "react";

interface CardAnalysisProps {
  title: string;
  value: number;
  children: ReactNode;
  color?: string;
}

export default function CardAnalysis({
  title,
  value,
  children,
  color = "bg-primary-100",
}: CardAnalysisProps) {
  return (
    <div className="flex justify-center items-center py-4 w-60 gap-10 bg-white rounded-xl">
      <label>
        <h1 className="text-gray-400 text-[16px]">{title}</h1>
        <p className="font-bold text-[17px]">R$ {value}</p>
      </label>
      <div className={`flex justify-center items-center h-12 w-12 rounded-xl text-white ${color}`}>
        {children}
      </div>
    </div>
  );
}
