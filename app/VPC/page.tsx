'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HeaderTab } from '../components/HeaderTab';
import { Sidebar } from '../components/Sidebar';
import { VpcCreateModal } from '../components/VpcCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { VpcItem, fetchVpcList } from '../../lib/mockapi';

function formatDateTime(isoString: string): string {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vpcList, setVpcList] = useState<VpcItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadList = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchVpcList();
      setVpcList(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : '一覧の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <HeaderTab />
        <main className="flex w-full h-full bg-gray-300">
          <div className="flex flex-col flex-1 mx-6 gap-2">
            <h1 className="text-2xl px-6 mt-2 pt-4 border-b border-gray-400">VPC</h1>
            <div className="flex items-center gap-3 p-3 mt-4 w-full bg-white border border-gray-400">
              <p>スタック名</p>
              <input
                placeholder="スタック名を入力"
                type="text"
                className="w-full border border-gray-400 rounded-md p-2 flex-1"
              ></input>
              <p>ステータス</p>
              <select className="pt-2 border border-gray-400 rounded-md p-2 flex-1">
                <option>選択してください</option>
              </select>
              <button type="button" className="bg-gray-200 px-2 py-2 rounded-md ml-24">
                リセット
              </button>
              <button type="button" className="bg-blue-500 text-white px-2 py-2 rounded-md">
                フィルター
              </button>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                className="text-gray-700 bg-gray-200 border border-gray-400 rounded p-3"
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-3 rounded-md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                新規作成
              </button>
            </div>
            <VpcCreateModal
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onSuccess={() => {
                setIsCreateModalOpen(false);
                loadList();
              }}
            />
            <div className="w-full bg-white rounded-md border border-gray-400 mt-6 overflow-hidden">
              <div className="flex justify-between p-3 border-b border-gray-200">
                <p className="flex-1">スタック名</p>
                <p className="flex-1">ステータス</p>
                <p className="flex-1">説明</p>
                <p className="flex-1">作成日時</p>
                <p className="flex-1">更新日時</p>
                <p className="flex-1">削除日時</p>
              </div>

              {loading && (
                <div className="p-6 text-center text-gray-500">読み込み中...</div>
              )}
              {error && (
                <div className="p-6 text-center text-red-600">{error}</div>
              )}
              {!loading && !error && vpcList.length === 0 && (
                <div className="p-6 text-center text-gray-500">データがありません</div>
              )}
              {!loading && !error && vpcList.length > 0 && vpcList.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between p-3 border-b border-gray-100 last:border-b-0"
                >
                  <p className="flex-1 truncate">{item.stackName}</p>
                  <p className="flex-1 truncate">{item.status}</p>
                  <p className="flex-1 truncate">{item.description}</p>
                  <p className="flex-1 truncate">{formatDateTime(item.createdAt ?? '')}</p>
                  <p className="flex-1 truncate">{item.updatedAt ? formatDateTime(item.updatedAt) : ''}</p>
                  <p className="flex-1 truncate"></p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
