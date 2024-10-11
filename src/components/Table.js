// src/components/Table.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Table component to render a table based on provided columns and data.
 * @param {Array} columns - The table headers and corresponding keys to access data.
 * @param {Array} data - The data to be displayed in the table.
 */
const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{item[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
