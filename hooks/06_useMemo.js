/**
 * useMemo Hook
 * 
 * SCENARIO: Memoizing expensive calculations to improve performance
 * 
 * When to use:
 * - Expensive computations (sorting large arrays, complex calculations)
 * - Derived data that hasn't changed
 * - Objects/arrays that should maintain referential equality
 * - Optimization for components that re-render frequently
 * 
 * Benefits:
 * - Avoids recalculating expensive values on every render
 * - Maintains referential equality for objects/arrays
 * - Prevents unnecessary re-renders of child components
 */

import React, { useMemo, useState } from 'react';

// Example 1: Expensive Computation
function UseMemoExample1() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Expensive calculation - simulated with a loop
  const fibonacci = (n) => {
    console.log('Calculating fibonacci...');
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // WITHOUT useMemo - recalculates every time component renders
  // const result = fibonacci(40); // Very slow!

  // WITH useMemo - only recalculates when number changes
  const result = useMemo(() => {
    console.log('useMemo: Calculating fibonacci...');
    return fibonacci(35); // Reduced from 40 for demo
  }, []); // No dependencies - calculated once

  return (
    <div>
      <p>Fibonacci(35): {result}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something (won't recalculate fibonacci)..."
      />
    </div>
  );
}

// Example 2: Sorting and Filtering Data
function UseMemoExample2() {
  const [items, setItems] = useState([
    { id: 3, name: 'Charlie', score: 85 },
    { id: 1, name: 'Alice', score: 92 },
    { id: 2, name: 'Bob', score: 78 }
  ]);
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'score'
  const [count, setCount] = useState(0);

  // Expensive sorting operation
  const sortedItems = useMemo(() => {
    console.log('useMemo: Sorting items...');
    return [...items].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.score - a.score; // Sort by score descending
    });
  }, [items, sortBy]); // Recalculate when items or sortBy changes

  return (
    <div>
      <div>
        <button onClick={() => setSortBy('name')}>Sort by Name</button>
        <button onClick={() => setSortBy('score')}>Sort by Score</button>
      </div>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (won't re-sort)</button>

      <ul>
        {sortedItems.map(item => (
          <li key={item.id}>{item.name} - Score: {item.score}</li>
        ))}
      </ul>
    </div>
  );
}

// Example 3: Referential Equality for Objects
function UseMemoExample3() {
  const [userId, setUserId] = useState(1);
  const [count, setCount] = useState(0);

  // WITHOUT useMemo - creates new object every render
  // This would cause ChildComponent to re-render even if userId doesn't change
  // const user = { id: userId, name: `User ${userId}` };

  // WITH useMemo - maintains same object reference if userId doesn't change
  const user = useMemo(
    () => ({ id: userId, name: `User ${userId}` }),
    [userId]
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (won't re-render child)</button>
      <button onClick={() => setUserId(userId + 1)}>Next User (will re-render child)</button>

      <ChildComponent user={user} />
    </div>
  );
}

// Child component that only re-renders if user prop changes
const ChildComponent = React.memo(({ user }) => {
  console.log('ChildComponent rendered with user:', user.name);
  return <div>User: {user.name}</div>;
});

// Example 4: Filtering Data
function UseMemoExample4() {
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);

  const allUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Alice Brown', email: 'abrown@example.com' },
    { id: 4, name: 'Charlie Wilson', email: 'charlie@example.com' },
    { id: 5, name: 'David Alice', email: 'dalice@example.com' }
  ];

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    console.log('useMemo: Filtering users...');
    return allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allUsers]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (won't re-filter)</button>

      <p>Found: {filteredUsers.length} users</p>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

// Example 5: Combining useMemo and Map Operations
function UseMemoExample5() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 1000, quantity: 2 },
    { id: 2, name: 'Mouse', price: 25, quantity: 5 },
    { id: 3, name: 'Monitor', price: 300, quantity: 1 }
  ]);
  const [count, setCount] = useState(0);

  // Calculate total price - expensive operation on large lists
  const cartSummary = useMemo(() => {
    console.log('useMemo: Calculating cart summary...');
    const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const itemCount = products.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      itemCount
    };
  }, [products]); // Recalculate when products change

  return (
    <div>
      <h3>Shopping Cart</h3>
      <p>Items: {cartSummary.itemCount}</p>
      <p>Subtotal: ${cartSummary.subtotal}</p>
      <p>Tax: ${cartSummary.tax}</p>
      <p>Total: ${cartSummary.total}</p>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (won't recalculate)</button>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} x {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Example 6: useMemo vs not using useMemo
function ComparisonExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // WITHOUT useMemo - recalculated every render
  const calculateSum = () => {
    console.log('Calculating without useMemo...');
    let sum = 0;
    for (let i = 0; i < 100000000; i++) {
      sum += i;
    }
    return sum;
  };

  // WITH useMemo - only recalculated when dependencies change
  const memoizedSum = useMemo(() => {
    console.log('Calculating with useMemo...');
    let sum = 0;
    for (let i = 0; i < 100000000; i++) {
      sum += i;
    }
    return sum;
  }, []); // Never recalculate

  // Note: Without useMemo, calculateSum() would be called every render
  // const result = calculateSum(); // Don't uncomment - very slow!

  return (
    <div>
      <p>Memoized Result: {memoizedSum}</p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <p>Open console to see the difference in performance!</p>
    </div>
  );
}

export {
  UseMemoExample1,
  UseMemoExample2,
  UseMemoExample3,
  UseMemoExample4,
  UseMemoExample5,
  ComparisonExample
};
