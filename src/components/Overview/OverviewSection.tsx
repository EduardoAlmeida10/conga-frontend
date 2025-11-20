import OverviewCard from './OverviewCard';

import { AiOutlineAreaChart } from 'react-icons/ai'; 
import { FaDollarSign } from 'react-icons/fa';

const OverviewSection = () => {
  const lastUpdated = "17/10/2025";

  const cardData = [
    {
      icon: AiOutlineAreaChart,
      title: 'Receita Diária Média',
      value: 'R$ 780,00',
      iconBgColor: 'bg-blue-500', // Azul para a primeira e segunda
    },
    {
      icon: AiOutlineAreaChart,
      title: 'Receita Total Mensal',
      value: 'R$ 23.360',
      iconBgColor: 'bg-blue-500', // Azul
    },
    {
      icon: FaDollarSign,
      title: 'Preço do Leite',
      value: 'R$ 3,20 L',
      iconBgColor: 'bg-blue-500', // Azul
    },
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Visão Geral</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-start gap-8">
          {cardData.map((data, index) => (
            <OverviewCard 
              key={index}
              icon={data.icon}
              title={data.title}
              value={data.value}
              iconBgColor={data.iconBgColor}
            />
          ))}
        </div>

        <hr className="my-6 border-gray-200" />
        
        <p className="text-sm text-gray-500">
          Última Atualização: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default OverviewSection;