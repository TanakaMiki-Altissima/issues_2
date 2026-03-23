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
  faChevronRight,
  faChevronLeft,
  faCalendarDays,
  faFilter,
  faSliders,
  faMagnifyingGlass,
  faPen,
  faTrashCan,
  faAnglesLeft,
  faAnglesRight,
  faList,
  faCaretDown,
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
  const selectedCompany = 'Aテスト本社';
  const employeeCount = 0;

  const staticRow = (label: string) => (
    <div
      key={label}
      className="flex h-[40px] w-full shrink-0 items-center gap-2 px-3 text-sm text-gray-700 border border-gray-300 hover:bg-sky-100"
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
      className="flex h-[40px] w-full shrink-0 items-center gap-2 px-3 text-left text-sm text-gray-700 border border-gray-300 hover:bg-sky-100"
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
      className="flex h-[40px] w-full shrink-0 items-center pl-10 pr-3 text-sm text-gray-700 border border-gray-300 hover:bg-sky-100"
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
        <main className="flex flex-col min-h-0 w-full bg-gray-300">
          <div className="flex items-center p-4 mt-2 pl-6 w-full bg-white border border-gray-400 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <p className="text-xl font-bold text-gray-600">ユーザー管理</p>
            <p className="text-sm font-bold text-blue-600 pl-6">在籍中のユーザー</p>
            <FontAwesomeIcon icon={faCaretDown} className="text-blue-600" />
            <div className="ml-auto flex w-1/3 min-w-0 shrink-0 flex-col gap-2">
              <div className="grid w-full grid-cols-3 gap-2">
                <button className="border border-gray-300 rounded-md px-1 py-1">
                  <FontAwesomeIcon icon={faList} className="text-sky-400 " /> 表示項目
                </button>
                <button className="border border-gray-300 rounded-md px-1 py-1">
                  <FontAwesomeIcon icon={faFilter} className="text-sky-400" />
                  フィルター
                </button>
                <button className="border border-gray-300 rounded-md px-1 py-1">
                  <FontAwesomeIcon icon={faArrowsUpDown} className="text-sky-400" />
                  ソート
                </button>
              </div>
              <div className="flex w-full flex-nowrap items-stretch justify-between gap-1">
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1 border border-gray-300 rounded-md px-9 py-1 text-left text-sm text-gray-500 whitespace-nowrap"
                >
                  日付を指定して過去のユーザー情報を表示
                  <FontAwesomeIcon icon={faCalendarDays} className="text-sky-400" />
                </button>
                <button
                  type="button"
                  className="shrink-0 border border-gray-300 rounded-md px-8  py-1 text-sm"
                >
                  指定
                </button>
              </div>
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
            <div className="flex flex-1 flex-col bg-white rounded-r border border-gray-400 mt-6 overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.15)] min-w-0">
              <div className="flex items-center gap-2 pt-2 px-4">
                <p className="font-bold text-gray-800">社員</p>
                <p className="text-sm font-bold text-green-600">{employeeCount}</p>
              </div>

              <div className="flex items-center gap-4 px-4">
                <p className="shrink-0 font-bold text-sm text-gray-400">{selectedCompany}</p>
                <div className="ml-auto flex w-1/3 min-w-0 items-center gap-3">
                  <div className="relative min-w-0 flex-1">
                    <input
                      placeholder="連絡先・ユーザーを検索"
                      className="w-full min-w-0 px-2 py-2 rounded border border-gray-300 text-gray-600 outline-none"
                    />
                    <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-gray-300 select-none">|</span>
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-green-600" />
                    </div>
                  </div>
                  <button type="button" className="shrink-0 text-gray-400">
                    <FontAwesomeIcon icon={faSliders} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-sm text-gray-500">
                {[
                  'すべて',
                  'ア',
                  'カ',
                  'サ',
                  'タ',
                  'ナ',
                  'ハ',
                  'マ',
                  'ヤ',
                  'ラ',
                  'ワ',
                  'A〜Z',
                  '0〜9',
                  'その他',
                  '名前なし',
                ].map((t) => (
                  <button key={t} type="button" className="hover:text-gray-700">
                    {t}
                  </button>
                ))}

                <button
                  type="button"
                  className="ml-auto shrink-0 bg-green-600 text-white font-bold rounded-md px-4 py-2 text-sm"
                >
                  アカウント作成 ＋
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
