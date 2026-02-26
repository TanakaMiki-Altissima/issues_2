'use client';

import { useState } from 'react';

const SIDEBAR_WIDTH_COLLAPSED = 50;
const SIDEBAR_WIDTH_EXPANDED = 200;

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const width = isOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  return (
    <aside
      className="fixed flex h-screen flex-col transition-[width] z-50"
      style={{ width: `${width}px` }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[40px] w-full shrink-0 items-center bg-black text-white ${isOpen ? 'justify-end pr-2' : 'justify-center'}`}
      >
        <span className="text-md font-semibold text-gray-400 hover:text-white">
          {isOpen ? '＜' : '＞'}
        </span>
      </button>
      <div className="min-h-0 flex-1 bg-gray-800" />
    </aside>
  );
}
