import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog,faHome,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

export function Calendar() {
    const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const totalCells = 42;
  while (cells.length < totalCells) cells.push(null);

  const getCellStyle = (date: number | null, colIndex: number) => {
    if (date === null) return 'text-[9px]';
    const isPast = date < today;
    const isToday = date === today;
    const isWeekend = colIndex === 0 || colIndex === 6;

    if (isToday) return 'text-[9px] bg-blue-200 rounded text-center';
    if (isPast) return `text-[9px] text-gray-400 text-center ${isWeekend ? 'text-red-300' : ''}`;
    return `text-[9px] text-center ${isWeekend ? 'text-red-500' : 'text-gray-700'}`;
  };

  return (
    <div className="flex flex-col p-3 bg-white rounded-lg m-6 max-h-[350px]">
       <div className="flex w-full items-center gap-2">
        <FontAwesomeIcon icon={faCog} className="text-gray-700 bg-gray-200 rounded p-1 px-2" />
        <p className="text-sm font-semibold text-gray-700 p-1 px-2 mx-6">{year}年{month + 1}月</p>
        <div className="min-w-0 flex-1" />
        <div className="flex gap-1">
          <FontAwesomeIcon icon={faChevronLeft} className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2" />
          <FontAwesomeIcon icon={faHome} className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2" />
          <FontAwesomeIcon icon={faChevronRight} className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2" />
        </div>
      </div>

      <div className="border-b-2 border-blue-500 pt-2">
        <div className="grid grid-cols-7 gap-1 px-1 text-center">
          {DAY_LABELS.map((day, i) => (
            <div
              key={day}
              className={`text-[9px] font-bold ${i === 0 || i === 6 ? 'text-red-500' : 'text-gray-700'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 px-1 py-1">
        {cells.map((date, i) => (
          <div
            key={i}
            className={`pb-9 flex items-center justify-center ${getCellStyle(date, i % 7)}`}
          >
            {date ?? ''}
          </div>
        ))}
      </div>
    </div>
  );
}