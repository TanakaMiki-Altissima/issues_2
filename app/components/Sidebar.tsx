'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faGaugeHigh,
  faBookmark,
  faCloud,
  faSquareCheck,
  faUserPlus,
  faCopy,
  faArrowUpFromBracket,
  faFilm,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faAws, faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';

const SIDEBAR_WIDTH_COLLAPSED = 50;
const SIDEBAR_WIDTH_EXPANDED = 200;
const BUTTON_HEIGHT = 40;

const ICONS: IconDefinition[] = [
  faGaugeHigh,
  faBuromobelexperte ,
  faAws,
  faAws,
  faAws,
  faBookmark,
  faArrowUpFromBracket,
  faCopy,
  faFilm,
  faFolder,
  faFilm,
  faCloud,
  faSquareCheck,
  faUserPlus,
];

const LABELS: string[] = [
  'ダッシュボード',
  'ポータル',
  'AWS',
  'AWS利用料金',
  'AWSインスタンス一覧',
  '電子書籍',
  'アップロード',
  '電子書籍管理',
  '動画管理',
  'カテゴリ管理',
  '動画管理',
  'VPC',
  '経営ダッシュボード',
  'ユーザー管理',
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const width = isOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;

  return (
    <aside
      className="flex h-screen flex-col transition-[width]"
      style={{ width: `${width}px` }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[40px] w-full items-center bg-black text-white ${isOpen ? 'justify-end pr-2' : 'justify-center'}`}
      >
        <span className="text-md font-semibold text-gray-400 hover:text-white">
          {isOpen ? '＜' : '＞'}
        </span>
      </button>
      <div className="min-h-0 flex-1 overflow-y-auto bg-gray-800">
        {ICONS.slice(0, 11).map((icon, i) => (
          <button
            key={i}
            type="button"
            className={`flex h-[40px] w-full items-center text-gray-400 hover:bg-gray-700 hover:text-sky-300 ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
            style={{ height: `${BUTTON_HEIGHT}px` }}
          >
            <FontAwesomeIcon icon={icon} />
            {isOpen && <span className="truncate text-sm">{LABELS[i]}</span>}
          </button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col bg-gray-700">
        {ICONS.slice(11, 14).map((icon, i) => (
          <button
            key={i + 11}
            type="button"
            className={`flex h-[40px] w-full items-center bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-sky-300 ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
            style={{ height: `${BUTTON_HEIGHT}px` }}
          >
            <FontAwesomeIcon icon={icon} />
            {isOpen && <span className="truncate text-sm">{LABELS[i + 11]}</span>}
          </button>
        ))}
        <div className="min-h-0 flex-1 bg-gray-700" />
      </div>
    </aside>
  );
}
