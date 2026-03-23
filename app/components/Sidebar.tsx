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
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faAws, faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const SIDEBAR_WIDTH_COLLAPSED = 50;
const SIDEBAR_WIDTH_EXPANDED = 200;
const BUTTON_HEIGHT = 40;

const ICONS: IconDefinition[] = [
  faGaugeHigh,
  faBuromobelexperte,
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
  '２つ目の動画管理',
  'VPC',
  '経営ダッシュボード',
  'ユーザー管理',
];

const ACTIVE_INDEX = 1;

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [awsOpen, setAwsOpen] = useState(false);
  const [ebookOpen, setEbookOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const width = isOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED;
  const allGroupsClosed = !awsOpen && !ebookOpen && !videoOpen;
  const bottomBg = allGroupsClosed ? 'bg-gray-800' : 'bg-gray-700';
  const bottomBtnHover = allGroupsClosed ? 'hover:bg-gray-700' : 'hover:bg-gray-600';

  const getActiveClass = (index: number) =>
    index === ACTIVE_INDEX ? 'bg-gray-600 text-sky-300' : 'text-gray-400';

  const rowBtn = (icon: IconDefinition, label: string, index: number, isChild?: boolean) => (
    <button
      key={label}
      type="button"
      className={`flex h-[40px] w-full items-center hover:bg-gray-700 hover:text-sky-300 ${getActiveClass(index)} ${isOpen ? `justify-start gap-2 pl-2` : 'justify-center'}`}
      style={{ height: `${BUTTON_HEIGHT}px` }}
    >
      <FontAwesomeIcon icon={icon} />
      {isOpen && <span className="truncate text-sm">{label}</span>}
    </button>
  );

  const groupBtn = (
    icon: IconDefinition,
    label: string,
    index: number,
    expanded: boolean,
    onToggle: () => void,
  ) => (
    <button
      key={label}
      type="button"
      onClick={onToggle}
      className={`flex h-[40px] w-full items-center text-gray-400 hover:bg-gray-700 hover:text-sky-300 ${getActiveClass(index)} ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
      style={{ height: `${BUTTON_HEIGHT}px` }}
    >
      <FontAwesomeIcon icon={icon} />
      {isOpen && (
        <>
          <span className="min-w-0 flex-1 truncate text-left text-sm">{label}</span>
          <span className="pr-2">
            <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronUp} className="text-xs" />
          </span>
        </>
      )}
    </button>
  );

  return (
    <aside className="flex h-screen flex-col transition-[width]" style={{ width: `${width}px` }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[40px] w-full items-center bg-black text-white ${isOpen ? 'justify-end pr-2' : 'justify-center'}`}
      >
        <span className="text-md font-semibold text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
        </span>
      </button>
      <div className="min-h-0 bg-gray-800">
        {rowBtn(ICONS[0], LABELS[0], 0)}
        <Link
          href="/"
          className={`flex h-[40px] w-full items-center hover:bg-gray-700 hover:text-sky-300 ${getActiveClass(1)} ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
          style={{ height: `${BUTTON_HEIGHT}px` }}
        >
          <FontAwesomeIcon icon={ICONS[1]} />
          {isOpen && <span className="truncate text-sm">{LABELS[1]}</span>}
        </Link>
        {groupBtn(ICONS[2], LABELS[2], 2, awsOpen, () => setAwsOpen((p) => !p))}
        {awsOpen && rowBtn(ICONS[3], LABELS[3], 3, true)}
        {awsOpen && rowBtn(ICONS[4], LABELS[4], 4, true)}
        {groupBtn(ICONS[5], LABELS[5], 5, ebookOpen, () => setEbookOpen((p) => !p))}
        {ebookOpen && rowBtn(ICONS[6], LABELS[6], 6, true)}
        {ebookOpen && rowBtn(ICONS[7], LABELS[7], 7, true)}
        {groupBtn(ICONS[8], LABELS[8], 8, videoOpen, () => setVideoOpen((p) => !p))}
        {videoOpen && rowBtn(ICONS[9], LABELS[9], 9, true)}
        {videoOpen && rowBtn(ICONS[10], LABELS[10], 10, true)}
      </div>
      <div className={`flex min-h-0 flex-1 flex-col ${bottomBg}`}>
        {[11, 12, 13].map((i) => (
          i === 11 ? (
            <Link
              key={i}
              href="/VPC"
              className={`flex h-[40px] w-full shrink-0 items-center text-gray-400 hover:text-sky-300 ${getActiveClass(i)} ${bottomBg} ${bottomBtnHover} ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
              style={{ height: `${BUTTON_HEIGHT}px` }}
            >
              <FontAwesomeIcon icon={ICONS[i]} />
              {isOpen && <span className="truncate text-sm">{LABELS[i]}</span>}
            </Link>
          ) : (
          <button
            key={i}
            type="button"
            className={`flex h-[40px] w-full shrink-0 items-center text-gray-400 hover:text-sky-300 ${getActiveClass(i)} ${bottomBg} ${bottomBtnHover} ${isOpen ? 'justify-start gap-2 pl-2' : 'justify-center'}`}
            style={{ height: `${BUTTON_HEIGHT}px` }}
          >
            <FontAwesomeIcon icon={ICONS[i]} />
            {isOpen && <span className="truncate text-sm">{LABELS[i]}</span>}
          </button>
          )
        ))}
        <div className={`min-h-0 flex-1 ${bottomBg}`} />
      </div>
    </aside>
  );
}
