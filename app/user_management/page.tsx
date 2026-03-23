'use client';

import { useState } from 'react';
import { Header } from '../components/Header';
import { HeaderTab } from '../components/HeaderTab';
import { Sidebar } from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faArrowsUpDown,
  faCalendarDays,
  faFilter,
  faSliders,
  faMagnifyingGlass,
  faPen,
  faTrashCan,
  faAnglesLeft,
  faAnglesRight,
  faList,
} from '@fortawesome/free-solid-svg-icons';

const LABELS: string[] = [
  'テストHT社',
  '虎ノ門オフィス',
  'Aテスト本社',
  'Aテスト支社',
  'Aテスト本部',
  'Aテスト課',
  'Bテスト本社',
  'Bテスト支社',
  'Bテスト本部',
  'Bテスト課',
];

const BUTTON_HEIGHT = 40;

export default function UserManagement() {
  const [aOpen, setAOpen] = useState(false);
  const [bOpen, setBOpen] = useState(false);

  const staticRow = (label: string) => (
    <div
      key={label}
      className="flex h-[40px] w-full shrink-0 items-center gap-2 px-3 text-sm text-gray-700 border border-gray-300 hover:bg-blue-50"
      style={{ height: BUTTON_HEIGHT }}
    >
      <FontAwesomeIcon icon={faChevronUp} className="shrink-0 text-gray-400" />
      <span className="min-w-0 truncate">{label}</span>
    </div>
  );

  const groupBtn = (label: string, expanded: boolean, onToggle: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onToggle}
      className="flex h-[40px] w-full shrink-0 items-center gap-2 px-3 text-left text-sm text-gray-700 border border-gray-300 hover:bg-blue-50"
      style={{ height: BUTTON_HEIGHT }}
    >
      <FontAwesomeIcon
        icon={expanded ? faChevronDown : faChevronUp}
        className="shrink-0 text-gray-500"
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </button>
  );

  const rowItem = (label: string) => (
    <div
      key={label}
      className="flex h-[40px] w-full shrink-0 items-center pl-10 pr-3 text-sm text-gray-700 border border-gray-300 hover:bg-blue-50"
      style={{ height: BUTTON_HEIGHT }}
    >
      <span className="truncate">{label}</span>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <HeaderTab />
        <main className="flex flex-col min-h-0 w-full bg-gray-300">
          <div className="flex items-center p-4 mt-2 px-6 w-full bg-white border border-gray-400 rounded-md">
            <p className="text-xl font-bold text-gray-600">ユーザー管理</p>
            <p className="text-sm font-bold text-blue-600">在籍中のユーザー</p>
            <div className="grid grid-cols-3 gap-2">
              <button className="border border-gray-300 rounded-md px-2 py-1">
                <FontAwesomeIcon icon={faList} className="text-blue-400" /> 表示項目
              </button>
              <button className="border border-gray-300 rounded-md px-2 py-1">
                <FontAwesomeIcon icon={faFilter} className="text-blue-400" />
                フィルター
              </button>
              <button className="border border-gray-300 rounded-md px-2 py-1">
                <FontAwesomeIcon icon={faArrowsUpDown} className="text-blue-400" />
                ソート
              </button>
              <button className="border border-gray-300 rounded-md px-2 py-1">
                日付を指定して過去のユーザー情報を表示
                <FontAwesomeIcon icon={faCalendarDays} className="text-blue-400" />
              </button>
              <button className="border border-gray-300 rounded-md px-2 py-1">指定</button>
            </div>
          </div>
          <div className="flex">
            <div className="flex w-52 flex-col overflow-hidden border border-gray-400 bg-white mt-6">
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {staticRow(LABELS[0])}
                {staticRow(LABELS[1])}
                {groupBtn(LABELS[2], aOpen, () => setAOpen((p) => !p))}
                {aOpen && rowItem(LABELS[3])}
                {aOpen && rowItem(LABELS[4])}
                {aOpen && rowItem(LABELS[5])}
                {groupBtn(LABELS[6], bOpen, () => setBOpen((p) => !p))}
                {bOpen && rowItem(LABELS[7])}
                {bOpen && rowItem(LABELS[8])}
                {bOpen && rowItem(LABELS[9])}
              </div>
            </div>
            <div className="flex bg-white rounded-r  border border-gray-400 mt-6 overflow-hidden">
              <p className="flex-1 font-bold">社員</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
