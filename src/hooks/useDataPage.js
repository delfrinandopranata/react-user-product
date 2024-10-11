// src/hooks/useDataPage.js
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/dataFetching';

/**
 * Custom hook to manage data fetching, filtering, and pagination for a data page.
 * @param {string} pageType - The type of data to manage (e.g., 'users' or 'products').
 * @param {number} initialPageSize - The initial page size for the table.
 * @returns {Object} - An object containing data, filter states, handlers, and loading state.
 */
const useDataPage = (pageType, initialPageSize) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedField, setSelectedField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false); // State for toggling search input

  // Fetch data whenever pageType, pageSize, selectedField, or filterValue changes
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      
      // Fetch data from the API using the field and value if provided
      const fetchedData = await fetchData(pageType, pageSize, selectedField, filterValue);
      setData(fetchedData);
      setLoading(false);
    };

    getData();
  }, [pageType, pageSize, selectedField, filterValue]);

  // Toggle the visibility of the search input and reset the search term
  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev); // Toggle the visibility state
    setSearchTerm(''); // Reset search term when toggling
  };

  // Handle filter value change based on the selected field
  const handleFilterValueChange = (value) => {
    setFilterValue(value); // Update the filter value state
    setCurrentPage(1); // Reset to the first page
  };

  // Reset filters and search term when a new field is selected
  const handleFieldChange = (field) => {
    setSelectedField(field); // Update selected field
    setFilterValue(''); // Reset filter value
    setSearchTerm(''); // Reset search term
    setCurrentPage(1); // Reset to the first page
  };

  // Handle page size change and reset to the first page
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  // Handle search input change for client-side filtering
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return {
    data,
    currentPage,
    setCurrentPage,
    loading,
    pageSize,
    selectedField,
    filterValue,
    searchTerm,
    showSearchInput, // Return the visibility state of the search input
    toggleSearchInput, // Return the function to toggle search input visibility
    handleFieldChange,
    handlePageSizeChange,
    handleSearchChange,
    handleFilterValueChange, // Return the function to handle filter value change
  };
};

export default useDataPage;
