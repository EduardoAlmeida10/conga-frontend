import { ChartBarStacked } from "./ChartBarStacked";
import { ChartLineInteractive } from "./ChartLineInteractive";
import { ChartPieInteractive } from "./ChartPieInteractive";

export default function ExpenseAnalysis() {
  return (
    <>
      <div className="flex flex-col gap-10 mt-7">
        <div>
          <p className="text-center text-gray-400">
            Período Selecionado <br /> Jun 25 - Jul 25
          </p>
        </div>

        <header className="flex justify-between items-center">
          <label>
            <p>Data</p>
            <input
              type="date"
              className="bg-white h-12 px-3 rounded cursor-pointer"
            />
          </label>
          <label>
            <p>Data</p>
            <input
              type="date"
              className="bg-white h-12 px-3 rounded cursor-pointer"
            />
          </label>
        </header>

        <div>
          <ChartLineInteractive />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1">
          <ChartPieInteractive />
        </div>
        <div className="flex-1">
          <ChartBarStacked />
        </div>
      </div>
    </>
  );
}
