
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
import { useState } from 'react';
import { User } from '../../lib/mockapi';

interface UserDeleteModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

function formatDisplayName(u: User): string {
  return [u.last_name, u.first_name].filter(Boolean).join(' ') || '—';
}

export function UserCreateModal({ isOpen, user, onClose, onConfirm }: UserDeleteModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-3 mb-4">削除の確認</h2>
        <p className="mb-4">本当によろしいですか？</p>
        {user && (
          <div className="mb-4 text-sm text-gray-600 space-y-1">
            <p>{formatDisplayName(user)}</p>
            <p>社員ID: {user.id}</p>
          </div>
        )}
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            いいえ
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            {submitting ? '削除中...' : 'はい'}
          </button>
        </div>
      </div>
    </div>
  );
}
