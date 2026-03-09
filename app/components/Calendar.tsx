'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

export function Calendar() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const todayDate = now.getDate();

  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const neededRows = Math.ceil((firstDayOfWeek + daysInMonth) / 7);
  const totalCells = neededRows * 7;

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length < totalCells) cells.push(null);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const goCurrentMonth = () => {
    setViewYear(currentYear);
    setViewMonth(currentMonth);
  };

  const getCellStyle = (date: number | null, colIndex: number) => {
    if (date === null) return 'text-[9px]';
    const isViewingCurrentMonth = viewYear === currentYear && viewMonth === currentMonth;
    const isToday = isViewingCurrentMonth && date === todayDate;
    const isPast =
      viewYear < currentYear ||
      (viewYear === currentYear && viewMonth < currentMonth) ||
      (isViewingCurrentMonth && date < todayDate);
    const isWeekend = colIndex === 0 || colIndex === 6;

    if (isToday) return 'text-[9px] bg-blue-200 rounded text-center';
    if (isPast) return `text-[9px] text-gray-400 text-center ${isWeekend ? 'text-red-300' : ''}`;
    return `text-[9px] text-center ${isWeekend ? 'text-red-500' : 'text-gray-700'}`;
  };

  return (
    <div className="flex flex-col p-3 bg-white rounded-lg m-6 self-start">
      <div className="flex w-full items-center gap-2">
        <FontAwesomeIcon icon={faCog} className="text-gray-700 bg-gray-200 rounded p-1 px-2" />
        <p className="text-sm font-semibold text-gray-700 p-1 px-2 mx-6">
          {viewYear}年{viewMonth + 1}月
        </p>
        <div className="min-w-0 flex-1" />
        <div className="flex gap-1">
          <button
            type="button"
            onClick={goPrevMonth}
            className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            onClick={goCurrentMonth}
            className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            className="text-sm text-gray-700 bg-gray-200 rounded p-1 px-2 hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
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
