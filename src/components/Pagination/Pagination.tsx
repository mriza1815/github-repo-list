import { useMemo } from "react";
import styles from "./Pagination.module.css"

type PaginationProps = {
    totalCount: number;
    currentPage: number;
    onClickPrev: () => void;
    onClickNext: () => void;
    handleChangePage: (e: number) => void;
};

const Pagination = ({totalCount, onClickPrev, onClickNext, handleChangePage, currentPage}: PaginationProps) => {

    const totalPages = Math.ceil(totalCount / 10);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages - 1;

    const renderPageNumbers = useMemo(() => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={`page-number-${i}`}
                    onClick={() => handleChangePage(i)}
                    data-testisactive={currentPage === i}
                    className={`${styles.pageBtn} ${currentPage === i ? styles.active : ''}`}
                    aria-label={`Page ${i}`}>
                    {i}
                </button>
            );
        }
        return pages;
    }, [currentPage, totalPages, handleChangePage]);
    
    return (
        <div className={styles.pagination} data-testid="pagination-container">
            <button data-testid="first-page" onClick={() => handleChangePage(1)} disabled={isFirstPage} className={styles.pageBtn} aria-label="First page">&lt;&lt;</button>
            <button data-testid="previous-page" onClick={onClickPrev} disabled={isFirstPage} className={styles.pageBtn} aria-label="Previous page">&lt;</button>
            {renderPageNumbers}
            <button data-testid="next-page" onClick={onClickNext} disabled={isLastPage} className={styles.pageBtn} aria-label="Next page">&gt;</button>
            <button data-testid="last-page" onClick={() => handleChangePage(totalPages-1)} disabled={isLastPage} className={styles.pageBtn} aria-label="Last page">&gt;&gt;</button>
        </div>
    )
}

export default Pagination