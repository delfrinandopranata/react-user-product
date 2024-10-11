// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataPage from './pages/DataPage';
// import './components/style.scss'; // Existing styles
import './components/tableStyles.scss'; // Import the new table styles

export default function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>

        {/* Route Configuration */}
        <Routes>
          <Route path="/users" element={<DataPage />} />
          <Route path="/products" element={<DataPage />} />
          <Route path="/" element={<DataPage />} />
        </Routes>
      </div>
    </Router>
  );
}
