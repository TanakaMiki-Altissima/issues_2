'use client';

import { useState, useEffect } from 'react';
import { updateVpc, VpcItem, VpcUpdateInput, VPC_STATUS_OPTIONS } from '../../lib/mockapi';

interface VpcEditModalProps {
  isOpen: boolean;
  item: VpcItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function VpcEditModal({ isOpen, item, onClose, onSuccess }: VpcEditModalProps) {
  const [stackName, setStackName] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setStackName(item.stackName);
      setStatus(item.status);
      setDescription(item.description ?? '');
    }
  }, [item]);

  const handleSubmit = async () => {
    if (!item) return;
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
      const input: VpcUpdateInput = {
        stackName: stackName.trim(),
        status,
        description: description.trim(),
      };
      await updateVpc(item.id, input);
      onClose();
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : '更新に失敗しました。');
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
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">VPC 編集</h2>
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
              {VPC_STATUS_OPTIONS.map((opt) => (
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
            {submitting ? '更新中...' : '更新'}
          </button>
        </div>
      </div>
    </div>
  );
}
