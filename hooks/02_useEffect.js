/**
 * useEffect Hook
 * 
 * SCENARIO: Performing side effects in functional components
 * 
 * When to use:
 * - Fetch data from an API
 * - Subscribe to external data sources
 * - Update the DOM directly
 * - Run cleanup code (unsubscribe, timers, etc.)
 * - Handle component lifecycle (mount, update, unmount)
 */

import React, { useState, useEffect } from 'react';

// Example 1: Run Effect After Every Render
function EffectAfterEveryRender() {
  const [count, setCount] = useState(0);

  // This runs after EVERY render
  useEffect(() => {
    console.log('Component rendered, count is:', count);
  }); // No dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Example 2: Run Effect Only Once (On Mount)
function FetchDataExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Empty dependency array [] means this runs only once when component mounts
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        setLoading(true);
        // In real app, replace with actual API call
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array - runs only on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
}

// Example 3: Run Effect When Dependencies Change
function DependencyExample() {
  const [userId, setUserId] = useState(1);
  const [userInfo, setUserInfo] = useState(null);

  // This runs when userId changes
  useEffect(() => {
    console.log('Fetching user info for ID:', userId);
    // In real app, fetch user data based on userId
    setUserInfo({ id: userId, name: `User ${userId}` });
  }, [userId]); // Dependency array - runs when userId changes

  return (
    <div>
      <p>Current User ID: {userId}</p>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
      {userInfo && <p>User: {userInfo.name}</p>}
    </div>
  );
}

// Example 4: Cleanup Function (Unsubscribe, Clear Timers)
function TimerWithCleanupExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Setting up timer');
    
    // Create a timer
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Return cleanup function that runs before the effect runs again and when component unmounts
    return () => {
      console.log('Cleaning up timer');
      clearInterval(timer); // Clear timer to prevent memory leaks
    };
  }, []); // Run once on mount, cleanup on unmount

  return <div>Timer Count: {count}</div>;
}

// Example 5: Multiple useEffect Hooks
function MultipleEffectsExample() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Effect 1: Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect 2: Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <p>Window Width: {windowWidth}px</p>
      <p>Mouse Position: {position.x}, {position.y}</p>
    </div>
  );
}

// Example 6: Document Title Update
function DocumentTitleExample() {
  const [pageTitle, setPageTitle] = useState('Home');

  useEffect(() => {
    // Update the document title whenever pageTitle changes
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div>
      <p>Current Title: {pageTitle}</p>
      <button onClick={() => setPageTitle('Home')}>Home</button>
      <button onClick={() => setPageTitle('About')}>About</button>
      <button onClick={() => setPageTitle('Contact')}>Contact</button>
    </div>
  );
}

// Example 7: Conditional Effect Execution
function ConditionalEffectExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Only run effect if searchTerm is not empty
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }

    console.log('Searching for:', searchTerm);
    // Simulate API search
    setResults([
      { id: 1, title: `Result 1 for "${searchTerm}"` },
      { id: 2, title: `Result 2 for "${searchTerm}"` }
    ]);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
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

export {
  EffectAfterEveryRender,
  FetchDataExample,
  DependencyExample,
  TimerWithCleanupExample,
  MultipleEffectsExample,
  DocumentTitleExample,
  ConditionalEffectExample
};
