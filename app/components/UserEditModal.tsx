
'use client';

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
import { useState, useEffect } from 'react';
import { User } from '../../lib/mockapi';

interface UserEditModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export function UserEditModal({ isOpen, user, onClose, onConfirm }: UserEditModalProps) {
    const [id, setid] = useState('');
    const [last_name, setlast_name] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name_okurikana, setlast_name_okurikana] = useState('');
    const [first_name_okurikana, setfirst_name_okurikana] = useState('');
    const [position, setposition] = useState('');
    const [department, setdepartment] = useState('');
    const [affiliation, setaffiliation] = useState('');
    const [joining_date, setjoining_date] = useState('');
    const [sex, setsex] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [telephone_number, settelephone_number] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
  
    useEffect(() => {
      if (user) {
        setlast_name(user.last_name ?? '');
        setfirst_name(user.first_name ?? '');
        setlast_name_okurikana(user.last_name_okurikana ?? '');
        setfirst_name_okurikana(user.first_name_okurikana ?? '');
        setposition(user.position ?? '');
        setdepartment(user.department ?? '');
        setaffiliation(user.affiliation ?? '');
        setjoining_date(user.joining_date ?? '');
        setsex(user.sex ?? '');
        setpassword(user.password ?? '');
        setemail(user.email ?? '');
        settelephone_number(user.telephone_number ?? '');
      }
    }, [user]);
  
    const handleSubmit = async () => {
      if (!user) return;
      setError(null);
      setSubmitting(true);
      try {
        await onConfirm();
        onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : '更新に失敗しました');
      } finally {
        setSubmitting(false);
      }
    };
  
    const handleBack = () => {
      setError(null);
      onClose();
    };
  
    if (!isOpen) return null;
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">ユーザー 編集</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              placeholder="山田"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              placeholder="太郎"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓（カナ）</label>
            <input
              type="text"
              value={last_name_okurikana}
              onChange={(e) => setlast_name_okurikana(e.target.value)}
              placeholder="ヤマダ"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">名（カナ）</label>
            <input
              type="text"
              value={first_name_okurikana}
              onChange={(e) => setfirst_name_okurikana(e.target.value)}
              placeholder="タロウ"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">入社日</label>
            <input
              type="text"
              value={joining_date}
              onChange={(e) => setjoining_date(e.target.value)}
              placeholder="年/月/日"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
            <input
              type="text"
              value={sex}
              onChange={(e) => setsex(e.target.value)}
              placeholder="-"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">社員ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setid(e.target.value)}
              placeholder=""
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="password"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">会社・所属</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
              placeholder="会社・所属"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">部署</label>
            <input
              type="text"
              value={affiliation}
              onChange={(e) => setaffiliation(e.target.value)}
              placeholder="部署"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">役職/階級</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setposition(e.target.value)}
              placeholder="役職/階級"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
            <input
              type="text"
              value={telephone_number}
              onChange={(e) => settelephone_number(e.target.value)}
              placeholder="090-1234-5678"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {submitting ? '更新中...' : '更新'}
          </button>
        </div>
      </div>
    </div>
  );
}
