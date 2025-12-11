import { cn } from "@/lib/utils";
import { getCurrentMonthRange } from "@/utils/getCurrentMonth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { CalendarIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CustomCalendarProps {
  onDateChange?: (date: dayjs.Dayjs | null) => void;
  placeholder?: string;
  defaultToCurrentMonth?: boolean;
}

export function CustomCalendar({
  onDateChange,
  placeholder = "Filtrar por mês",
  defaultToCurrentMonth = true,
}: CustomCalendarProps) {
  const getDefaultDate = () => {
    if (defaultToCurrentMonth) {
      const currentMonthRange = getCurrentMonthRange();
      return dayjs(currentMonthRange.dateFrom);
    }
    return null;
  };

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    getDefaultDate(),
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultToCurrentMonth && selectedDate && onDateChange) {
      onDateChange(selectedDate);
    }
  }, []);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
    if (newDate) {
      setIsOpen(false);
    }
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(null);
    }
  };

  const formatDate = (date: dayjs.Dayjs | null) => {
    if (!date) return placeholder;

    const month = date.locale("pt-br").format("MMMM");
    const year = date.year();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-max px-4 h-10 text-black flex items-center gap-2 hover:bg-accent hover:text-accent-foreground",
              selectedDate && "border-primary bg-primary/5 text-primary",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="font-normal">{formatDate(selectedDate)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              views={["month", "year"]}
              openTo="month"
              sx={{
                "& .MuiPickersCalendarHeader-root": {
                  paddingLeft: "16px",
                  paddingRight: "16px",
                },
                "& .MuiDayCalendar-header": {
                  paddingLeft: "16px",
                  paddingRight: "16px",
                },
                "& .MuiMonthCalendar-root": {
                  padding: "16px",
                },
              }}
            />
          </LocalizationProvider>
        </PopoverContent>
      </Popover>

      {selectedDate && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilter}
          className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
          title="Limpar filtro"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
