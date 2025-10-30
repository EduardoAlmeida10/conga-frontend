import iconCalendar from "../assets/iconCalendar.svg"
interface PageHeaderProps {
  title: string;
  nameUser: string;
  date: string;
}

export default function PageHeader({ title, nameUser, date }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="">
        <p className="text-[18px] font-bold">Olá, {nameUser} 👋🏼</p>
        <label className="flex gap-1.5 items-center">
          <p className="text-right text-[16px] text-gray-600">{date}</p>
          <img src={iconCalendar} alt="icon calendar"/>
        </label>
      </div>
    </div>
  );
}
