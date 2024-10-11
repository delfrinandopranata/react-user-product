// src/hooks/useTableData.js
import { useMemo } from 'react';

/**
 * Custom hook to handle paginated table data.
 * @param {Array} data - The complete data set to be paginated.
 * @param {number} currentPage - Current active page number.
 * @param {number} pageSize - Number of items per page.
 * @returns {Array} - The data sliced to match the current page.
 */
const useTableData = (data, currentPage, pageSize) => {
  return useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage, pageSize]);
};

export default useTableData;
