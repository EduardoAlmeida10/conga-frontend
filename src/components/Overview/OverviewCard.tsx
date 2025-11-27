import React from 'react';

type OverviewCardProps = {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  iconBgColor?: string;
};

const OverviewCard: React.FC<OverviewCardProps> = ({ icon: IconComponent, title, value, iconBgColor = 'bg-blue-500' }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className={`p-4 rounded-full ${iconBgColor} text-white`}>
        {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
      </div>
      
      <div className="flex flex-col">
        <span className="text-gray-600 text-sm">{title}</span>
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default OverviewCard;