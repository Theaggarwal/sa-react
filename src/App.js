import React, { useEffect, useState } from 'react';
import './App.css';

// Import the todo service from the local services
import { getTodos } from './services';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
