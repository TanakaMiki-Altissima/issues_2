import { VpcItem } from '../../lib/mockapi';
import { VpcEditModal } from './VpcEditModal';

interface VpcActionMenuProps {
  actionMenuRect: { top: number; left: number; width: number } | null;
  selectedItem: VpcItem | null;
  setSelectedRowId: (id: string | null) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setEditingItem: (item: VpcItem | null) => void;
  setIsDeleteConfirmOpen: (open: boolean) => void;
  setDeleteTargetItem: (item: VpcItem | null) => void;
  isEditModalOpen?: boolean;
  editingItem?: VpcItem | null;
  loadList?: () => void;
}

export function VpcActionMenu({
  selectedItem,
  setSelectedRowId,
  setIsEditModalOpen,
  setEditingItem,
  setIsDeleteConfirmOpen,
  setDeleteTargetItem,
  isEditModalOpen,
  editingItem,
  loadList,
}: VpcActionMenuProps) {
  return (
    <>
      {selectedItem && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
          aria-modal="true"
          onClick={() => setSelectedRowId(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4">
              以下のデータを操作しますか？
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">スタック名</label>
                <p className="w-full border border-gray-200 rounded-md p-2 bg-gray-50 text-gray-900">
                  {selectedItem.stackName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                <p className="w-full border border-gray-200 rounded-md p-2 bg-gray-50 text-gray-900 min-h-[2.5rem]">
                  {selectedItem.description ?? ''}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setSelectedRowId(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                閉じる
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => {
                  setEditingItem(selectedItem);
                  setIsEditModalOpen(true);
                  setSelectedRowId(null);
                }}
              >
                編集
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => {
                  setDeleteTargetItem(selectedItem);
                  setIsDeleteConfirmOpen(true);
                  setSelectedRowId(null);
                }}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}

      <VpcEditModal
        isOpen={isEditModalOpen ?? false}
        item={editingItem ?? null}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
          loadList?.();
        }}
      />
    </>
  );
}
