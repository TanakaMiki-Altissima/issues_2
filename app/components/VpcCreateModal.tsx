'use client';

import { useState } from 'react';
import { createVpc } from '../../lib/mockapi';

const STATUS_OPTIONS = [
  { value: '', label: '選択してください' },
  { value: 'CREATE_COMPLETE', label: 'CREATE_COMPLETE' },
  { value: 'CREATE_FAILED', label: 'CREATE_FAILED' },
];

interface VpcCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function VpcCreateModal({ isOpen, onClose, onSuccess }: VpcCreateModalProps) {
  const [stackName, setStackName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    if (!stackName.trim()) {
      setError('スタック名を入力してください。');
      return;
    }
    if (!status) {
      setError('ステータスを選択してください。');
      return;
    }
    setSubmitting(true);
    try {
      await createVpc({
        stackName: stackName.trim(),
        status,
        description: description.trim(),
      });
      setStackName('');
      setStatus('');
      setDescription('');
      onClose();
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '登録に失敗しました。');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">VPC 新規作成</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">スタック名</label>
            <input
              type="text"
              value={stackName}
              onChange={(e) => setStackName(e.target.value)}
              placeholder="スタック名を入力"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-2"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">説明（任意）</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を入力"
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
            {submitting ? '登録中...' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
