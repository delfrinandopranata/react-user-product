// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ProductPage from './pages/ProductPage'; // Import the new ProductPage
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
          <Route path="/users" element={<UserPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/" element={<UserPage />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}
