/**
 * TodoForm Component
 *
 * A reusable form component for adding and editing todos.
 * Uses React Hook Form for form state management and validation.
 * Integrates with todoService to send data to the API.
 *
 * FEATURES:
 * - Add new todos
 * - Edit existing todos
 * - Built-in validation using Yup schema
 * - Error handling and display
 * - Loading state during API calls
 * - Accessible form with semantic HTML
 *
 * PROPS:
 * - initialData: (Object) - Pre-filled form data for edit mode { id, title, completed, userId }
 * - onSubmitSuccess: (Function) - Callback when form is submitted successfully
 * - onCancel: (Function) - Callback when user cancels the form
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addTodo, updateTodo } from '../services';

// Validation schema using Yup
const todoValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  completed: yup.boolean().default(false),
  userId: yup
    .number()
    .min(1, 'User ID must be at least 1')
    .max(10, 'User ID must not exceed 10')
    .required('User ID is required')
});

function TodoForm({ initialData, onSubmitSuccess, onCancel }) {
  // State for API call feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Determine if this is an edit or add form
  const isEditMode = !!initialData?.id;

  // Initialize React Hook Form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(todoValidationSchema),
    // Pre-fill form with initial data in edit mode
    defaultValues: initialData || {
      title: '',
      completed: false,
      userId: 1
    }
  });

  /**
   * Handle form submission
   * Makes API call to add or update todo
   * @param {Object} data - Form data from React Hook Form
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let result;

      if (isEditMode) {
        // Update existing todo
        result = await updateTodo(initialData.id, data);
        console.log('Todo updated:', result);
      } else {
        // Create new todo
        result = await addTodo(data);
        console.log('Todo created:', result);
      }

      // Reset form on success
      reset();

      // Call the success callback with the result
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }
    } catch (error) {
      // Capture and display API errors
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Failed to save todo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle form cancellation
   * Resets form and calls cancel callback
   */
  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>{isEditMode ? 'Edit Todo' : 'Add New Todo'}</h2>

      {/* Title Field */}
      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>
          Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter todo title..."
          {...register('title')}
          style={{
            ...styles.input,
            borderColor: errors.title ? '#dc3545' : '#ccc'
          }}
          disabled={isSubmitting}
        />
        {errors.title && (
          <span style={styles.errorMessage}>{errors.title.message}</span>
        )}
      </div>

      {/* Completed Checkbox */}
      <div style={styles.formGroup}>
        <label htmlFor="completed" style={{ ...styles.label, display: 'flex', alignItems: 'center' }}>
          <input
            id="completed"
            type="checkbox"
            {...register('completed')}
            style={{ marginRight: '8px', cursor: 'pointer' }}
            disabled={isSubmitting}
          />
          Mark as completed
        </label>
      </div>

      {/* User ID Field */}
      <div style={styles.formGroup}>
        <label htmlFor="userId" style={styles.label}>
          User ID *
        </label>
        <input
          id="userId"
          type="number"
          placeholder="Enter user ID (1-10)..."
          {...register('userId')}
          style={{
            ...styles.input,
            borderColor: errors.userId ? '#dc3545' : '#ccc'
          }}
          disabled={isSubmitting}
        />
        {errors.userId && (
          <span style={styles.errorMessage}>{errors.userId.message}</span>
        )}
      </div>

      {/* Error Message Display */}
      {submitError && (
        <div style={styles.alert}>
          <strong>Error:</strong> {submitError}
        </div>
      )}

      {/* Form Actions */}
      <div style={styles.buttonGroup}>
        <button
          type="submit"
          style={{
            ...styles.button,
            ...styles.submitButton
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Todo' : 'Add Todo'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            ...styles.button,
            ...styles.cancelButton
          }}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/**
 * Inline styles for the form
 * In production, use CSS modules or styled-components
 */
const styles = {
  form: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333'
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '4px',
    fontWeight: '500'
  },
  alert: {
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    border: '1px solid #f5c6cb'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    ':disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white'
  }
};

export default TodoForm;
