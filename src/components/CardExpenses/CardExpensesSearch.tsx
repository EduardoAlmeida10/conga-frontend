import { useState } from "react";
import iconFilter from "../../assets/iconFilter.svg";
import iconSearch from "../../assets/iconSearch.svg";

export default function CardExpensesSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-between items-center w-full">
      <div className="relative w-[300px]">
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white pl-10 pr-3 py-2.5 focus:outline-none transition-all"
          placeholder="Pesquisar despesa..."
        />
        <img
          src={iconSearch}
          alt="Buscar"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        />
      </div>
      <button
        type="button"
        className="flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 
                   hover:bg-gray-100 transition-all"
      >
        <img src={iconFilter} alt="Filtrar" className="w-5 h-5" />
        <span className="text-sm text-gray-700">Filtros</span>
      </button>
    </div>
  );
}
