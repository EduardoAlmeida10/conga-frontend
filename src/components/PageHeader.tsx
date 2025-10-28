interface PageHeaderProps {
  title: string;
  userName: string;
  date: string;
}

export default function PageHeader({ title, userName, date }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-right text-sm text-gray-600">
        <p>Olá, {userName} 👋</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
