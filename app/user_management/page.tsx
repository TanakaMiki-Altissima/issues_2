'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { UserPagination } from '../components/UserPagination';
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
  faList,
  faCaretDown,
  faArrowDown,
  faCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { User, fetchUserList, deleteUser } from '../../lib/mockapi';
import {
  NameFilterTabs,
  type NameFilterTab,
  getUserNameFilterGroup,
  doesUserMatchSearch,
} from './NameFilterTabs';

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

const TREE_INDENT_PX = 16;

const USER_PAGE_SIZE = 10;

const USER_ROW_HEIGHT_PX = 48;
/** スクロール最上部時に見える行数（9件目が半分くらいまで） */
const USER_VISIBLE_ROWS = 8.5;

export default function UserManagement() {
  const [aOpen, setAOpen] = useState(false);
  const [bOpen, setBOpen] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userPage, setUserPage] = useState(1);
  const [selectedNameFilter, setSelectedNameFilter] = useState<NameFilterTab>('すべて');
  const [userSearchQuery, setUserSearchQuery] = useState('');

  const selectedCompany = 'Aテスト本社';
  const employeeCount = user.length;

  const filteredUsers = useMemo(() => {
    const tabFiltered =
      selectedNameFilter === 'すべて'
        ? user
        : user.filter((u) => getUserNameFilterGroup(u) === selectedNameFilter);

    if (!userSearchQuery.trim()) return tabFiltered;
    return tabFiltered.filter((u) => doesUserMatchSearch(u, userSearchQuery));
  }, [selectedNameFilter, user, userSearchQuery]);

  const userTotalPages =
    filteredUsers.length === 0 ? 0 : Math.ceil(filteredUsers.length / USER_PAGE_SIZE);
  const userPageEffective =
    userTotalPages === 0 ? 1 : Math.min(Math.max(1, userPage), userTotalPages);
  const userPageSlice = filteredUsers.slice(
    (userPageEffective - 1) * USER_PAGE_SIZE,
    userPageEffective * USER_PAGE_SIZE,
  );
  const userListScrollMaxHeight = Math.round(USER_VISIBLE_ROWS * USER_ROW_HEIGHT_PX);

  useEffect(() => {
    if (userTotalPages === 0) {
      setUserPage(1);
      return;
    }
    setUserPage((p) => Math.min(Math.max(1, p), userTotalPages));
  }, [userTotalPages]);

  const loadUser = useCallback(async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const list = await fetchUserList();
      setUser(Array.isArray(list) ? list : []);
    } catch (e) {
      setUserError(e instanceof Error ? e.message : 'ユーザーの取得に失敗しました');
      setUser([]);
    } finally {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    // フィルター変更時は先頭ページへ戻す
    setUserPage(1);
  }, [selectedNameFilter]);

  useEffect(() => {
    // 検索変更時も先頭ページへ戻す
    setUserPage(1);
  }, [userSearchQuery]);

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('このユーザーを削除しますか？')) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
      await loadUser();
    } catch (e) {
      alert(e instanceof Error ? e.message : '削除に失敗しました');
    } finally {
      setDeletingId(null);
    }
  };

  const staticRow = (label: string) => (
    <div
      key={label}
      className="flex h-[40px] w-full shrink-0 items-center gap-2 px-3 text-sm text-gray-700 border border-gray-300 hover:bg-sky-100"
      style={{ height: BUTTON_HEIGHT }}
    >
      <FontAwesomeIcon icon={faChevronUp} className="shrink-0 text-gray-500" />
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

  /** 本社展開時の子行：左に段階空白 → 下向きシェブロン（任意）→ ラベル */
  const nestedRow = (label: string, depth: number, showChevron = true) => (
    <div
      key={label}
      className="flex h-[40px] w-full shrink-0 items-center gap-2 border border-gray-300 px-3 text-sm text-gray-700 hover:bg-sky-100"
      style={{ height: BUTTON_HEIGHT }}
    >
      <span className="shrink-0" style={{ width: depth * TREE_INDENT_PX }} aria-hidden />
      {showChevron && <FontAwesomeIcon icon={faChevronDown} className="shrink-0 text-gray-500" />}
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex flex-col min-h-0 w-full flex-1 bg-gray-300">
          <div className="mx-6 flex items-center rounded-md border border-gray-400 bg-white p-4 pl-6 shadow-[0_4px_8px_rgba(0,0,0,0.15)] mt-3">
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
          <div className="flex min-h-0 min-w-0 flex-1 mx-6 mt-3">
            <div className="flex w-52 shrink-0 flex-col self-start border border-gray-400 bg-white">
              <div className="flex flex-col">
                {staticRow(LABELS[0])}
                {staticRow(LABELS[1])}
                {groupBtn(LABELS[2], aOpen, () => setAOpen((p) => !p))}
                {aOpen && nestedRow(LABELS[3], 1)}
                {aOpen && nestedRow(LABELS[4], 2)}
                {aOpen && nestedRow(LABELS[5], 3, false)}
                {groupBtn(LABELS[6], bOpen, () => setBOpen((p) => !p))}
                {bOpen && nestedRow(LABELS[7], 1)}
                {bOpen && nestedRow(LABELS[8], 2)}
                {bOpen && nestedRow(LABELS[9], 3, false)}
              </div>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-r border border-gray-400 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-2 pt-2 px-4">
                <p className="font-bold text-gray-800">社員</p>
                <p className="text-sm font-bold text-green-600">{employeeCount}</p>
              </div>

              <div className="flex items-center gap-4 px-4">
                <p className="shrink-0 font-bold text-sm text-gray-400">{selectedCompany}</p>
                <div className="ml-auto flex w-1/2 min-w-0 items-center gap-3">
                  <div className="relative min-w-0 flex-1">
                    <input
                      placeholder="連絡先・ユーザーを検索"
                      className="w-full min-w-0 px-2 py-2 rounded border border-gray-300 text-gray-600 outline-none"
                      value={userSearchQuery ?? ''}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
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

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm text-gray-400">
                <NameFilterTabs selected={selectedNameFilter} onChange={setSelectedNameFilter} />

                <button
                  type="button"
                  className="ml-auto shrink-0 rounded-md bg-green-600 px-4 py-2 text-sm font-bold text-white"
                >
                  アカウント作成 ＋
                </button>
              </div>

              {/* グレーボーダー下のユーザー表 */}
              <div className="flex min-h-0 flex-1 flex-col border-t border-gray-300">
                <div className="grid min-w-0 grid-cols-6 gap-2 px-4 py-3 text-xs font-bold text-gray-700">
                  <div className="flex min-w-0 items-center justify-start gap-2 text-left">
                    <span className="h-8 w-8 shrink-0" aria-hidden />
                    <span className="inline-flex items-center gap-1">
                      名前
                      <FontAwesomeIcon icon={faArrowDown} className="shrink-0 text-gray-400" />
                    </span>
                  </div>
                  <div className="min-w-0 text-center">社員ID</div>
                  <div className="min-w-0 text-center">役職/階級</div>
                  <div className="min-w-0 text-center">部署</div>
                  <div className="min-w-0 text-center">
                    会社・所属
                    <FontAwesomeIcon icon={faFilter} className="shrink-0 text-gray-400" />
                  </div>
                  <div className="min-w-0 text-center">操作</div>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div
                    className="overflow-y-auto overflow-x-hidden bg-gray-50 [scrollbar-gutter:stable]"
                    style={{ maxHeight: userListScrollMaxHeight }}
                  >
                    {userLoading && (
                      <p className="px-4 py-6 text-center text-sm text-gray-500">読み込み中…</p>
                    )}
                    {!userLoading && userError && (
                      <p className="px-4 py-6 text-center text-sm text-red-600">{userError}</p>
                    )}
                    {!userLoading && !userError && user.length === 0 && (
                      <p className="px-4 py-6 text-center text-sm text-gray-500">
                        ユーザーがいません。mockapi.io に{' '}
                        <code className="rounded bg-gray-50 px-1">user</code>{' '}
                        リソースを作成し、データを登録してください。
                      </p>
                    )}
                    {!userLoading && !userError && user.length > 0 && filteredUsers.length === 0 && (
                      <p className="px-4 py-6 text-center text-sm text-gray-500">
                        条件に一致するユーザーがいません。
                      </p>
                    )}
                    {!userLoading &&
                      !userError &&
                      userPageSlice.map((u) => {
                        const displayName =
                          [u.last_name, u.first_name].filter(Boolean).join(' ') || '—';
                        return (
                          <div
                            key={u.id}
                            className="grid grid-cols-6 gap-2 px-4 py-3 text-sm text-gray-800"
                          >
                            <div
                              className="flex min-w-0 items-center justify-start gap-2 text-left"
                              title={displayName}
                            >
                              <span
                                className="h-8 w-8 shrink-0 rounded-full bg-gray-300"
                                aria-hidden
                              />
                              <span className="min-w-0 truncate text-left">{displayName}</span>
                            </div>
                            <div className="min-w-0 truncate text-center" title={String(u.id)}>
                              {u.id ?? '—'}
                            </div>
                            <div className="min-w-0 truncate text-center" title={u.position}>
                              {u.position ?? '—'}
                            </div>
                            <div className="min-w-0 truncate text-center" title={u.department}>
                              {u.department ?? '—'}
                            </div>
                            <div className="min-w-0 truncate text-center" title={u.affiliation}>
                              {u.affiliation ?? '—'}
                            </div>
                            <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
                              <button
                                type="button"
                                className="rounded border border-green-500 bg-green-50 px-2 py-1 text-xs text-green-700"
                                onClick={() => {
                                  /* 編集モーダル等は今後拡張 */
                                }}
                              >
                                編集
                                <FontAwesomeIcon icon={faPen} className="mr-1" />
                              </button>
                              <button
                                type="button"
                                disabled={deletingId === u.id}
                                className="rounded border border-red-500 bg-red-50 px-2 py-1 text-xs text-red-600"
                                onClick={() => handleDeleteUser(u.id)}
                              >
                                {deletingId === u.id ? '削除中…' : '削除'}
                                <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {!userLoading && !userError && filteredUsers.length > 0 && userTotalPages >= 1 && (
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center border-t border-white/30 bg-white/1 px-3 py-3 backdrop-blur-md"
                      style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.06)' }}
                    >
                      <UserPagination
                        totalPages={userTotalPages}
                        currentPage={userPageEffective}
                        onPageChange={setUserPage}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
