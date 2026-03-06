import { Header } from '../components/Header';
import { HeaderTab } from '../components/HeaderTab';
import { Sidebar } from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
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
              <button type="button" className="bg-blue-500 text-white px-3 rounded-md">
                新規作成
              </button>
            </div>
            <div className="flex justify-between p-3 w-full bg-white rounded-md border border-gray-400 mt-6">
              <p>スタック名</p>
              <p>ステータス</p>
              <p>説明</p>
              <p>作成日時</p>
              <p>更新日時</p>
              <p>削除日時</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
