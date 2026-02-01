/**
 * useCallback Hook
 * 
 * SCENARIO: Memoizing callback functions to prevent unnecessary re-renders
 * 
 * When to use:
 * - Passing callback functions to optimized child components
 * - Preventing infinite loops in useEffect dependencies
 * - Functions used as dependencies in other hooks
 * - When performance is critical with frequently re-rendering parents
 * 
 * Benefits:
 * - Same function reference across renders (unless dependencies change)
 * - Prevents child components from unnecessary re-renders
 * - Improves performance in large lists or complex trees
 */

import React, { useCallback, useState, memo } from 'react';

// Example 1: useCallback with Child Component Optimization
// Memoized child component - only re-renders if props change
const MemoizedButton = memo(({ onClick, label }) => {
  console.log(`Rendering button: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

function UseCallbackExample1() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Without useCallback, a new function is created on every render
  // This would cause MemoizedButton to re-render even if count doesn't change

  // With useCallback, the function is only recreated when dependencies change
  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency - function never changes

  const handleDecrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []); // Empty dependency - function never changes

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []); // Empty dependency - function never changes

  return (
    <div>
      <h2>Count: {count}</h2>
      <p>Text: {text}</p>

      <input
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
      />

      {/* These buttons won't re-render when text changes because their callback didn't change */}
      <MemoizedButton onClick={handleIncrement} label="Increment" />
      <MemoizedButton onClick={handleDecrement} label="Decrement" />
    </div>
  );
}

// Example 2: useCallback with Dependencies
function UseCallbackExample2() {
  const [multiplier, setMultiplier] = useState(1);
  const [count, setCount] = useState(0);

  // This function depends on 'multiplier'
  // It will be recreated whenever multiplier changes
  const handleMultiplyCount = useCallback(() => {
    setCount(prevCount => prevCount + multiplier);
  }, [multiplier]); // Recreate when multiplier changes

  return (
    <div>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>

      <button onClick={handleMultiplyCount}>Add {multiplier}</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increase Multiplier</button>
    </div>
  );
}

// Example 3: Preventing Infinite useEffect Loops
function UseCallbackExample3() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Without useCallback, a new function is created every render
  // This would cause the useEffect below to run infinitely

  // With useCallback, the function reference is stable
  const searchFunction = useCallback((term) => {
    console.log('Searching for:', term);
    // Simulate API call
    setResults([
      { id: 1, title: `Result 1 for "${term}"` },
      { id: 2, title: `Result 2 for "${term}"` }
    ]);
  }, []); // Function never changes

  // useEffect depends on searchFunction
  // Without useCallback, this would run on every render causing infinite loop
  React.useEffect(() => {
    if (searchTerm.length > 2) {
      searchFunction(searchTerm);
    }
  }, [searchTerm, searchFunction]); // Safe because searchFunction is stable

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Example 4: Passing Memoized Callbacks to Custom Hook
function useSearch(callback) {
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    // This effect will only run when callback changes
    console.log('Custom hook effect running');
    // Perform search operation
  }, [callback]);

  return results;
}

function UseCallbackExample4() {
  const [searchTerm, setSearchTerm] = useState('');

  // This callback is stable across renders (unless searchTerm changes)
  const handleSearch = useCallback((term) => {
    console.log('Searching:', term);
  }, [searchTerm]);

  const results = useSearch(handleSearch);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {/* Results from custom hook */}
    </div>
  );
}

// Example 5: List Item with Callback
const ListItem = memo(({ item, onDelete, onEdit }) => {
  console.log(`Rendering item: ${item.id}`);
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
      <span>{item.name}</span>
      <button onClick={() => onEdit(item.id)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

function UseCallbackExample5() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);
  const [count, setCount] = useState(0);

  // These callbacks are memoized and won't change unless items change
  const handleDelete = useCallback((id) => {
    setItems(items.filter(item => item.id !== id));
  }, [items]);

  const handleEdit = useCallback((id) => {
    console.log('Edit item:', id);
  }, []);

  return (
    <div>
      <p>Renders: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (triggers re-render)</button>

      <h3>Items (won't re-render unnecessarily due to useCallback):</h3>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}

// Example 6: useCallback vs not using useCallback
function ComparisonExample() {
  const [count, setCount] = useState(0);

  // WITHOUT useCallback - new function every render
  const expensiveCallbackWithout = () => {
    console.log('This function is recreated every render');
    setCount(prev => prev + 1);
  };

  // WITH useCallback - same function unless dependencies change
  const expensiveCallbackWith = useCallback(() => {
    console.log('This function is only recreated when dependencies change');
    setCount(prev => prev + 1);
  }, []); // No dependencies, so function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={expensiveCallbackWithout}>Without useCallback</button>
      <button onClick={expensiveCallbackWith}>With useCallback</button>
      <p>Open console to see the difference!</p>
    </div>
  );
}

export {
  UseCallbackExample1,
  UseCallbackExample2,
  UseCallbackExample3,
  UseCallbackExample4,
  UseCallbackExample5,
  ComparisonExample
};
