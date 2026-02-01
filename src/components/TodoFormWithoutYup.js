/**
 * TodoFormWithoutYup Component
 *
 * Uses `react-hook-form` alone (no Yup) to manage validation and form state.
 * This is a lightweight alternative when you don't need schema-based validation.
 *
 * Behavior and props mirror `TodoForm`:
 * - `initialData` optional: pre-fill fields for edit mode
 * - `onSubmitSuccess(result)` called after successful create/update
 * - `onCancel()` called when user cancels
 *
 * Validation is done inline via `register` rules.
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addTodo, updateTodo } from '../services';

function TodoFormWithoutYup({ initialData, onSubmitSuccess, onCancel }) {
  const isEditMode = !!initialData?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Initialize form with default values; react-hook-form will manage field state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || { title: '', completed: false, userId: 1 }
  });

  // If initialData changes (edit selected), reset the form values
  useEffect(() => {
    reset(initialData || { title: '', completed: false, userId: 1 });
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Convert userId to number (register can supply valueAsNumber, but ensure here)
    const payload = { ...data, userId: Number(data.userId) };

    // Basic manual validation (you can expand rules as needed)
    if (!payload.title || payload.title.trim().length < 3) {
      setSubmitError('Title is required and must be at least 3 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      let result;
      if (isEditMode) {
        result = await updateTodo(initialData.id, payload);
      } else {
        result = await addTodo(payload);
      }

      // Reset form after successful submit
      reset();

      if (onSubmitSuccess) onSubmitSuccess(result);
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError(err.message || 'Failed to save todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>{isEditMode ? 'Edit Todo (no Yup)' : 'Add New Todo (no Yup)'}</h2>

      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter todo title..."
          {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' }, maxLength: { value: 100, message: 'Maximum 100 characters' } })}
          style={{ ...styles.input, borderColor: errors.title ? '#dc3545' : '#ccc' }}
          disabled={isSubmitting}
        />
        {errors.title && <span style={styles.errorMessage}>{errors.title.message}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={{ ...styles.label, display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            {...register('completed')}
            style={{ marginRight: '8px' }}
            disabled={isSubmitting}
          />
          Mark as completed
        </label>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="userId" style={styles.label}>User ID *</label>
        <input
          id="userId"
          type="number"
          {...register('userId', { required: 'User ID required', min: { value: 1, message: 'Min 1' }, max: { value: 10, message: 'Max 10' }, valueAsNumber: true })}
          style={{ ...styles.input, borderColor: errors.userId ? '#dc3545' : '#ccc' }}
          disabled={isSubmitting}
        />
        {errors.userId && <span style={styles.errorMessage}>{errors.userId.message}</span>}
      </div>

      {submitError && <div style={styles.alert}><strong>Error:</strong> {submitError}</div>}

      <div style={styles.buttonGroup}>
        <button type="submit" style={{ ...styles.button, ...styles.submitButton }} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Todo' : 'Add Todo'}
        </button>
        <button type="button" onClick={handleCancel} style={{ ...styles.button, ...styles.cancelButton }} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff'
  },
  formGroup: { marginBottom: '16px', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '6px', fontWeight: 600, fontSize: 14 },
  input: { padding: 10, fontSize: 14, border: '1px solid #ccc', borderRadius: 4 },
  errorMessage: { color: '#dc3545', fontSize: 12, marginTop: 4 },
  alert: { padding: 12, backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 4, marginBottom: 12 },
  buttonGroup: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  button: { padding: '10px 20px', fontSize: 14, border: 'none', borderRadius: 4, cursor: 'pointer' },
  submitButton: { backgroundColor: '#007bff', color: 'white' },
  cancelButton: { backgroundColor: '#6c757d', color: 'white' }
};

export default TodoFormWithoutYup;
