/**
 * useState Hook
 * 
 * SCENARIO: Managing simple state values in functional components
 * 
 * When to use:
 * - Track simple state values like form inputs, toggles, counters
 * - Manage component-level state without class components
 * - Store any data that changes over time
 */

import React, { useState } from 'react';

// Example 1: Simple Counter
function CounterExample() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0); // Initial value is 0

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Example 2: Form Input Tracking
function FormExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { name, email });
    // Reset form
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Example 3: Toggle State
function ToggleExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      {isVisible && <p>This content is now visible!</p>}
    </div>
  );
}

// Example 4: Multiple State Values
function TodoExample() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Example 5: Functional Update (when new state depends on previous state)
function FunctionalUpdateExample() {
  const [count, setCount] = useState(0);

  // Using functional update to avoid stale closure issues
  const incrementTwice = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // This will correctly increment by 2
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementTwice}>Increment by 2</button>
    </div>
  );
}

export {
  CounterExample,
  FormExample,
  ToggleExample,
  TodoExample,
  FunctionalUpdateExample
};
