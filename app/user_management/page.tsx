'use client';

import { Header } from '../components/Header';
import { HeaderTab } from '../components/HeaderTab';
import { Sidebar } from '../components/Sidebar';

export default function UserManagement() {
  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <HeaderTab />
        <main className="flex flex-col min-h-0 w-full bg-gray-300">
        <div className="flex items-center p-4 mt-2 px-6 w-full bg-white border border-gray-400 rounded-md">
          <p className="text-xl font-bold text-gray-600">ユーザー管理</p>
        </div>
        <div className="flex">
        <div className="flex bg-white border border-gray-400 mt-6 overflow-hidden">
            <p className="flex-1">テストHT社</p>
          </div>
          <div className="flex bg-white rounded-md border border-gray-400 mt-6 overflow-hidden">
            <p className="flex-1 font-bold">社員</p>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
