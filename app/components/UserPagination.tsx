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
    <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 text-sm">
      {totalPages > 1 && currentPage > 1 && (
        <>
          <button
            type="button"
            className="rounded px-2 py-1 font-mono text-gray-600 hover:bg-white/80"
            onClick={() => onPageChange(1)}
            aria-label="最初のページ"
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="shrink-0 text-green-500" />
          </button>
          <button
            type="button"
            className="rounded px-2 py-1 font-mono text-gray-600 hover:bg-white/80"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            aria-label="前のページ"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="shrink-0 text-green-500" />
          </button>
        </>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPageChange(n)}
          className={
            n === currentPage
              ? 'flex h-8 min-w-8 items-center justify-center rounded-full bg-green-100 px-2 text-sm font-semibold text-green-600'
              : 'flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm text-gray-600 hover:bg-white/70'
          }
        >
          {n}
        </button>
      ))}
      {totalPages > 1 && currentPage < totalPages && (
        <>
          <button
            type="button"
            className="rounded px-2 py-1 font-mono text-gray-600 hover:bg-white/80"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            aria-label="次のページ"
          >
            <FontAwesomeIcon icon={faAngleRight} className="shrink-0 text-green-500" />
          </button>
          <button
            type="button"
            className="rounded px-2 py-1 font-mono text-gray-600 hover:bg-white/80"
            onClick={() => onPageChange(totalPages)}
            aria-label="最後のページ"
          >
            <FontAwesomeIcon icon={faAnglesRight} className="shrink-0 text-green-500" />
          </button>
        </>
      )}
    </div>
  );
}
