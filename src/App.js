import React, { useEffect, useState } from 'react';
import './App.css';

// Import the todo service from the local services
import { getTodos } from './services';
import { TodoForm } from './components';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

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
      mounted = false; // avoid state updates after unmount
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todos (from jsonplaceholder)</h1>

          {/* Form Section */}
          {showForm && (
            <TodoForm
              initialData={editingTodo}
              onSubmitSuccess={(newTodo) => {
                // Add or update the todo in the list
                if (editingTodo) {
                  // Update mode
                  setTodos(todos.map(t => t.id === newTodo.id ? newTodo : t));
                } else {
                  // Add mode
                  setTodos([newTodo, ...todos]);
                }
                setShowForm(false);
                setEditingTodo(null);
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingTodo(null);
              }}
            />
          )}

          {/* Add Todo Button */}
          {!showForm && (
            <button
              onClick={() => {
                setEditingTodo(null);
                setShowForm(true);
              }}
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
          )}

        {loading && <p>Loading todos…</p>}
        {error && <p style={{ color: 'salmon' }}>Error: {error}</p>}

        {!loading && !error && (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Completed</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>User</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((t) => (
                  <tr key={t.id}>
                    <td style={{ border: '1px solid #eee', padding: '8px' }}>{t.id}</td>
                    <td style={{ border: '1px solid #eee', padding: '8px' }}>{t.title}</td>
                    <td style={{ border: '1px solid #eee', padding: '8px' }}>
                      {t.completed ? '✅' : '—'}
                    </td>
                    <td style={{ border: '1px solid #eee', padding: '8px' }}>{t.userId}</td>
                      <td style={{ border: '1px solid #eee', padding: '8px' }}>
                        <button
                          onClick={() => {
                            setEditingTodo(t);
                            setShowForm(true);
                          }}
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
        )}
      </header>
    </div>
  );
}

export default App;
