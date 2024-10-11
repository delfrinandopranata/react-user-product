// src/utils/dataFetching.js
import axios from 'axios';

/**
 * Fetch data from the API based on type, pageSize, selectedField, and filterValue.
 * @param {string} type - The type of data to fetch (e.g., 'users' or 'products').
 * @param {number} pageSize - The number of items to fetch.
 * @param {string} field - The field to filter by.
 * @param {string} value - The value to filter by.
 * @returns {Promise<Array>} - The fetched data from the API.
 */
export const fetchData = async (type, pageSize, field = '', value = '') => {
  try {
    let url = `https://dummyjson.com/${type}?limit=${pageSize}`;
    
    // If a field and value are provided, add them as query parameters for filtering
    if (field && value) {
      url += `&${field}=${value}`;
    }

    const response = await axios.get(url);
    return type === 'users' ? response.data.users : response.data.products;
  } catch (error) {
    console.error(`Error fetching ${type} data: `, error);
    return [];
  }
};
