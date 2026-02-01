/**
 * TodosListPage
 *
 * Displays a list of all todos fetched from the API.
 * Allows users to:
 * - View all todos in a formatted table
 * - Edit existing todos (navigate to TodoFormPage)
 * - Add new todos (navigate to TodoFormPage)
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos } from '../services';

function TodosListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch todos on component mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getTodos()
      .then((data) => {
        if (mounted) setTodos(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '40px' }}>Loading todos…</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'salmon', padding: '40px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todos List</h1>

      {/* Add New Todo Button */}
      <button
        onClick={() => navigate('/add')}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        + Add New Todo
      </button>

      {/* Todos Table */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Title</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Completed</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>User</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr key={t.id}>
                <td style={{ border: '1px solid #eee', padding: '8px' }}>{t.id}</td>
                <td style={{ border: '1px solid #eee', padding: '8px' }}>{t.title}</td>
                <td style={{ border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                  {t.completed ? '✅' : '—'}
                </td>
                <td style={{ border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>{t.userId}</td>
                <td style={{ border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => navigate(`/edit/${t.id}`)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Total todos: {todos.length}
      </p>
    </div>
  );
}

export default TodosListPage;
