import React from "react";
import styles from "./index.module.scss";

const PADDING = 3;

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 基于当前页和总页数，算出中间需要展示的页码范围
function buildPages(page: number, totalPages: number): number[] {
  const start = Math.max(0, page - PADDING);
  const end = Math.min(totalPages - 1, page + PADDING);
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

const SearchPagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.pageBtn}
        disabled={isFirst}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>
      {pages[0] > 0 && (
        <>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onChange(0)}
          >
            1
          </button>
          {pages[0] > 1 && <span className={styles.pageEllipsis}>…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${styles.pageBtn} ${
            p === page ? styles.pageBtnActive : ""
          }`}
          onClick={() => onChange(p)}
        >
          {p + 1}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages - 1 && (
        <>
          {pages[pages.length - 1] < totalPages - 2 && (
            <span className={styles.pageEllipsis}>…</span>
          )}
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onChange(totalPages - 1)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        type="button"
        className={styles.pageBtn}
        disabled={isLast}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default SearchPagination;
