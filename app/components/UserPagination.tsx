'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

export type UserPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function UserPagination({ totalPages, currentPage, onPageChange }: UserPaginationProps) {
  if (totalPages < 1) return null;

  return (
    <div className="pointer-events-auto grid grid-cols-[1fr_auto_1fr] items-center text-sm">
      <div className="flex items-center justify-end gap-2">
        {totalPages > 1 && currentPage > 1 && (
          <>
            <button
              type="button"
              className="rounded px-2 py-1 font-mono text-gray-600"
              onClick={() => onPageChange(1)}
              aria-label="最初のページ"
            >
              <FontAwesomeIcon icon={faAnglesLeft} className="shrink-0 text-green-500" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 font-mono text-gray-600"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              aria-label="前のページ"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="shrink-0 text-green-500" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            className={
              n === currentPage
                ? 'flex h-8 min-w-8 items-center justify-center rounded-full bg-green-100 px-2 text-sm font-semibold text-green-600'
                : 'flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm text-gray-600'
            }
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-start gap-2">
        {totalPages > 1 && currentPage < totalPages && (
          <>
            <button
              type="button"
              className="rounded px-2 py-1 font-mono text-gray-600"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              aria-label="次のページ"
            >
              <FontAwesomeIcon icon={faAngleRight} className="shrink-0 text-green-500" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 font-mono text-gray-600"
              onClick={() => onPageChange(totalPages)}
              aria-label="最後のページ"
            >
              <FontAwesomeIcon icon={faAnglesRight} className="shrink-0 text-green-500" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
