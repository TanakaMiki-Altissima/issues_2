'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function HeaderTab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full z-40">
        <div
          className={`
    overflow-hidden bg-gray-300
    shadow-[0_4px_12px_rgba(0,0,0,0.2)]
    ${isMenuOpen ? 'max-h-64 py-1 pl-6' : 'max-h-0'}
  `}
        >
          <div className="flex gap-8 pb-3">
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_traffic_30_s512_f_traffic_30_0nbg.png"
                alt="portal"
                className="w-7 h-7 object-contain p-1 bg-blue-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">ポータル</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_26_s512_f_business_26_2nbg.png"
                alt="schedule"
                className="w-7 h-7 shrink-0object-contain p-1 bg-green-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">
                スケジュール
              </p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_6_s512_f_business_6_2nbg.png"
                alt="my tool"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-red-400 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">MYツール</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_30_s512_f_business_30_1nbg.png"
                alt="e-learning"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-purple-400 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">
                Eラーニング
              </p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_42_s512_f_business_42_1nbg.png"
                alt="reservation"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-orange-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">施設予約</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_56_s512_f_business_56_0nbg.png"
                alt="link"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-purple-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">リンク集</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_47_s512_f_business_47_1nbg.png"
                alt="board"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-red-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">掲示板</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_32_s512_f_business_32_0nbg.png"
                alt="address"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-green-300 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">アドレス帳</p>
            </div>
            <div className="flex flex-col items-center w-7 h-7">
              <img
                src="/f_f_business_1_s512_f_business_1_2nbg.png"
                alt="design"
                className="w-7 h-7 shrink-0 object-contain p-1 bg-orange-200 rounded shadow-[-2px_0_2px_rgba(0,0,0,0.2),0_2px_2px_rgba(0,0,0,0.2)]"
              />
              <p className="text-[9px] text-blue-700 font-semibold whitespace-nowrap">設計図</p>
            </div>
          </div>
        </div>
        <div className="flex h-2 items-center overflow-visible bg-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-2 w-20 items-center justify-center bg-sky-500 text-gray-200 hover:text-white"
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faChevronUp : faChevronDown}
              className="text-[10px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
