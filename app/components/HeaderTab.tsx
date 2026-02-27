'use client';

import { useState } from 'react';

export function HeaderTab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen && (
        <div className="bg-gray-300 py-5 px-4 pl-14">
          {/* メニュー項目 */}
        </div>
      )}
      <div className="flex h-1.5 items-center overflow-hidden bg-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex w-20 items-center justify-center bg-sky-500"
        >
          <span className="text-[8px] font-semibold text-gray-200 hover:text-white rotate-90">
            {isMenuOpen ? '<' : '>'}
          </span>
        </button>
      </div>
    </>
  );
}
