// src/pages/DataPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import axios from 'axios';
import columnsConfig from '../config/columnsConfig';
import '../components/tableStyles.scss'; // Import the new table styles

const PageSizeOptions = [5, 10, 20, 50]; // Page size options

// Function to fetch the full data set based on the type (users or products)
const fetchFullData = async (type) => {
  try {
    const response = await axios.get(`https://dummyjson.com/${type}?limit=100`); // Fetching all data (assuming a limit of 100 for demonstration)
    return type === 'users' ? response.data.users : response.data.products;
  } catch (error) {
    console.error(`Error fetching ${type} data: `, error);
    return [];
  }
};

// DataPage component to display the table with pagination, search, and filter functionality
const DataPage = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size is 10
  const [data, setData] = useState([]); // Store the full dataset
  const [filteredData, setFilteredData] = useState([]); // Store the filtered data based on age and gender
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [ageFilter, setAgeFilter] = useState(''); // Age filter state
  const [genderFilter, setGenderFilter] = useState(''); // Gender filter state
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // Track total number of records for pagination

  // Determine the page type based on the URL path
  const pageType = location.pathname.includes('products') ? 'products' : 'users';

  // Fetch the full data set when the component mounts or when the page type changes
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const fetchedData = await fetchFullData(pageType); // Fetch full data set
      setData(fetchedData); // Store the full data set
      setFilteredData(fetchedData); // Initially, set filtered data to the full data set
      setTotalCount(fetchedData.length); // Total count is the length of the full data set
      setLoading(false);
    };

    getData();
  }, [pageType]); // Refetch data only when page type changes

  // Handle Page Size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize); // Update the page size
    setCurrentPage(1); // Reset to first page whenever page size changes
  };

  // Handle Search Input change to filter the full data set
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter the entire full data set based on the search term
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered); // Update the filtered data based on search
    setTotalCount(filtered.length); // Update the total count to the length of the filtered data
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle Age and Gender Filter changes
  useEffect(() => {
    const applyFilters = () => {
      const filtered = data.filter((item) => {
        const ageMatch = ageFilter ? item.age === parseInt(ageFilter, 10) : true;
        const genderMatch = genderFilter ? item.gender.toLowerCase() === genderFilter.toLowerCase() : true;
        return ageMatch && genderMatch;
      });

      setFilteredData(filtered);
      setTotalCount(filtered.length); // Update total count to reflect filtered data
      setCurrentPage(1); // Reset to the first page after filter
    };

    applyFilters();
  }, [ageFilter, genderFilter, data]); // Run the filtering logic when filters or data change

  // Get data for the current page based on the pagination
  const currentTableData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <h1 className="page-header">{pageType.charAt(0).toUpperCase() + pageType.slice(1)} Page</h1>
      {loading ? (
        <p className="loading-indicator">Loading...</p>
      ) : (
        <>
          {/* Search Box */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Age and Gender Filters */}
          <div className="filters-container">
            <label>
              Age:
              <input
                type="number"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="filter-input"
                placeholder="Filter by Age"
              />
            </label>
            <label>
              Gender:
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="filter-input"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>

          {/* Page Size Selection Dropdown */}
          <div className="page-size-container">
            <label htmlFor="page-size">Page Size: </label>
            <select
              id="page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="page-size-dropdown"
            >
              {PageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Table Component */}
          <div className="table-container">
            <Table columns={columnsConfig[pageType]} data={currentTableData} />
          </div>

          {/* Pagination Component */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount} // Use totalCount for pagination calculation
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
};

export default DataPage;
