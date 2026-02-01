/**
 * App - Main application component with routing
 *
 * Routes:
 * - / → TodosListPage (list all todos)
 * - /add → TodoFormPage (create new todo)
 * - /edit/:id → TodoFormPage (edit existing todo)
 */

import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { TodosListPage, TodoFormPage } from './pages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav style={{ marginBottom: '20px' }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              padding: '8px 16px',
              marginRight: '10px',
              borderRadius: '4px',
              textDecoration: 'none',
              color: isActive ? 'white' : '#333',
              backgroundColor: isActive ? '#007bff' : 'transparent',
              fontWeight: isActive ? '600' : 'normal',
              display: 'inline-block',
              border: '1px solid #ccc'
            })}
          >
            📋 Todos List
          </NavLink>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<TodosListPage />} />
          <Route path="/add" element={<TodoFormPage />} />
          <Route path="/edit/:id" element={<TodoFormPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
