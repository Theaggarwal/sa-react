/**
 * TodoFormPage
 *
 * Page component for adding or editing todos.
 *
 * Route params:
 * - /add - create new todo
 * - /edit/:id - edit existing todo (fetches todo data)
 *
 * Features:
 * - Auto-fetch todo data if in edit mode
 * - Use TodoForm component for form rendering
 * - Navigate back to list after successful submission
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodoById } from '../services';
import TodoForm from '../components/TodoForm';

function TodoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Fetch todo data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      getTodoById(id)
        .then((data) => {
          setInitialData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || String(err));
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  const handleFormSubmit = () => {
    // After successful form submission, navigate back to list
    navigate('/');
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '40px' }}>Loading…</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'salmon', padding: '40px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>{isEditMode ? 'Edit Todo' : 'Add New Todo'}</h1>

      <div
        style={{
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid #eee'
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to List
        </button>
      </div>

      {/* Form Component - handles submission logic */}
      <TodoForm
        initialData={initialData}
        onSuccess={handleFormSubmit}
      />
    </div>
  );
}

export default TodoFormPage;
