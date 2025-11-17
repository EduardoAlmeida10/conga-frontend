import { useState } from "react";

interface CostTypeTabsProps {
  tabs: string[];
  onSelect: (type: string) => void;
}

export default function CostTypeTabs({ tabs, onSelect }: CostTypeTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleSelect = (type: string) => {
    setActiveTab(type);
    onSelect(type);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between bg-white rounded-xl px-10 py-4 mt-4">
        {tabs.map((type) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={`relative pb-2 text-sm font-medium transition-colors
              ${activeTab === type ? "text-sky-500" : "text-gray-600 hover:text-sky-400 cursor-pointer"}
            `}
          >
            {type}
            {activeTab === type && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-sky-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
