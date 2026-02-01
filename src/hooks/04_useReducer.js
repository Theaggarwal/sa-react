/**
 * useReducer Hook
 * 
 * SCENARIO: Managing complex state with multiple actions
 * 
 * When to use:
 * - Multiple state values that depend on each other
 * - Complex state logic with multiple actions
 * - Passing state down to deeply nested components (combine with Context API)
 * - State transitions like form submissions, async operations
 * - More predictable state management than useState
 */

import React, { useReducer } from 'react';

// Example 1: Simple Counter with useReducer
function CounterReducerExample() {
  // Reducer function: determines how state changes based on action
  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      case 'RESET':
        return 0;
      case 'ADD':
        return state + action.payload;
      default:
        return state;
    }
  };

  // useReducer(reducerFunction, initialState)
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'ADD', payload: 5 })}>+5</button>
    </div>
  );
}

// Example 2: Form State with Validation
function FormReducerExample() {
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          [action.field]: action.value,
          errors: { ...state.errors, [action.field]: '' } // Clear error on change
        };
      case 'SET_ERROR':
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.message }
        };
      case 'RESET_FORM':
        return {
          firstName: '',
          lastName: '',
          email: '',
          errors: {}
        };
      case 'SUBMIT':
        return { ...state, submitted: true };
      default:
        return state;
    }
  };

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    errors: {},
    submitted: false
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    // Validate fields
    if (!formState.firstName) {
      dispatch({ type: 'SET_ERROR', field: 'firstName', message: 'First name required' });
      hasErrors = true;
    }
    if (!formState.email || !validateEmail(formState.email)) {
      dispatch({ type: 'SET_ERROR', field: 'email', message: 'Valid email required' });
      hasErrors = true;
    }

    if (!hasErrors) {
      console.log('Form submitted:', formState);
      dispatch({ type: 'SUBMIT' });
      setTimeout(() => dispatch({ type: 'RESET_FORM' }), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        {formState.errors.firstName && <p style={{ color: 'red' }}>{formState.errors.firstName}</p>}
      </div>

      <div>
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {formState.errors.email && <p style={{ color: 'red' }}>{formState.errors.email}</p>}
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => dispatch({ type: 'RESET_FORM' })}>
        Clear
      </button>

      {formState.submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
    </form>
  );
}

// Example 3: Todo App with useReducer
function TodoReducerExample() {
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
          filter: state.filter
        };
      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          )
        };
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    todos: [
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Learn useReducer', completed: false }
    ],
    filter: 'all' // 'all', 'completed', 'active'
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  // Filter todos based on current filter
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>All</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>Active</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            {todo.text}
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Example 4: Async Operations with useReducer
function AsyncReducerExample() {
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_START':
        return { loading: true, data: null, error: null };
      case 'FETCH_SUCCESS':
        return { loading: false, data: action.payload, error: null };
      case 'FETCH_ERROR':
        return { loading: false, data: null, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchData = async (url) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <div>
      <button onClick={() => fetchData('https://api.example.com/data')}>
        Fetch Data
      </button>

      {state.loading && <p>Loading...</p>}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
      {state.data && <p>Data: {JSON.stringify(state.data)}</p>}
    </div>
  );
}

// Additional imports needed
import { useState } from 'react';

export {
  CounterReducerExample,
  FormReducerExample,
  TodoReducerExample,
  AsyncReducerExample
};
