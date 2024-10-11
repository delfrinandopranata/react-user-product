// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import axios from 'axios';
import columnsConfig from '../config/columnsConfig';
import '../components/tableStyles.scss'; // Import the new table styles

const PageSizeOptions = [5, 10, 20, 50]; // Page size options

// Function to fetch the full data set for products
const fetchFullData = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=100'); // Fetching all data (assuming a limit of 100 for demonstration)
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products data: ', error);
    return [];
  }
};

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size is 10
  const [data, setData] = useState([]); // Store the full dataset
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [priceFilter, setPriceFilter] = useState(''); // Price filter state
  const [brandFilter, setBrandFilter] = useState(''); // Brand filter state
  const [categoryFilter, setCategoryFilter] = useState(''); // Category filter state
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // Track total number of records for pagination

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const fetchedData = await fetchFullData(); // Fetch full data set
      setData(fetchedData);
      setFilteredData(fetchedData); // Initially, set filtered data to the full data set
      setTotalCount(fetchedData.length); // Total count is the length of the full data set
      setLoading(false);
    };

    getData();
  }, []);

  // Handle Page Size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize); // Update the page size
    setCurrentPage(1); // Reset to first page whenever page size changes
  };

  // Handle Price, Brand, and Category Filter changes
  useEffect(() => {
    const applyFilters = () => {
      const filtered = data.filter((item) => {
        const priceMatch = priceFilter ? item.price <= parseInt(priceFilter, 10) : true;
  
        // Handle case-insensitive brand filtering, ensuring brand exists
        const brandMatch = brandFilter
          ? item.brand && item.brand.toLowerCase().includes(brandFilter.toLowerCase())
          : true;
  
        const categoryMatch = categoryFilter
          ? item.category && item.category.toLowerCase().includes(categoryFilter.toLowerCase())
          : true;
  
        return priceMatch && brandMatch && categoryMatch;
      });
  
      setFilteredData(filtered);
      setTotalCount(filtered.length); // Update total count to reflect filtered data
      setCurrentPage(1); // Reset to the first page after filter
    };
  
    applyFilters();
  }, [priceFilter, brandFilter, categoryFilter, data]);
  
  

  // Get data for the current page based on the pagination
  const currentTableData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <h1 className="page-header">Products Page</h1>
      {loading ? (
        <p className="loading-indicator">Loading...</p>
      ) : (
        <>
          {/* Price, Brand, and Category Filters */}
          <div className="filters-container">
            <label>
              Max Price:
              <input
                type="number"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="filter-input"
                placeholder="Filter by Max Price"
              />
            </label>
            <label>
              Brand:
              <input
                type="text"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="filter-input"
                placeholder="Filter by Brand"
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-input"
                placeholder="Filter by Category"
              />
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
            <Table columns={columnsConfig['products']} data={currentTableData} />
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

export default ProductPage;
