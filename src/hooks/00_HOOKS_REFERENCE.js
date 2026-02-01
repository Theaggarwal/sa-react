/**
 * SUMMARY: React Hooks Quick Reference Guide
 * 
 * This file provides a quick reference for all React Hooks with their use cases
 */

// ============================================================================
// BASIC HOOKS (Most Commonly Used)
// ============================================================================

/**
 * 1. useState - Manage component state
 * 
 * Syntax: const [value, setValue] = useState(initialValue);
 * 
 * Use Cases:
 * - Form input tracking
 * - Toggle states (showing/hiding content)
 * - Counters
 * - Any data that changes over time
 * 
 * Example: const [count, setCount] = useState(0);
 */

/**
 * 2. useEffect - Perform side effects
 * 
 * Syntax: useEffect(() => { ... }, [dependencies]);
 * 
 * Use Cases:
 * - API calls/data fetching
 * - Event listeners
 * - DOM updates
 * - Cleanup operations
 * 
 * Dependency Array:
 * - No array: runs after every render
 * - Empty []: runs only once (on mount)
 * - [value]: runs when value changes
 * 
 * Example: useEffect(() => { fetchData(); }, []);
 */

// ============================================================================
// STATE MANAGEMENT HOOKS
// ============================================================================

/**
 * 3. useReducer - Complex state management
 * 
 * Syntax: const [state, dispatch] = useReducer(reducer, initialState);
 * 
 * Use Cases:
 * - Multiple state values
 * - Complex state transitions
 * - State that depends on previous state
 * - Passing state to many nested components
 * 
 * Better Than useState When:
 * - Managing multiple related state values
 * - State logic is complex with many cases
 * - You want more predictable state management
 * 
 * Example:
 * const reducer = (state, action) => {
 *   switch(action.type) {
 *     case 'INCREMENT': return state + 1;
 *     default: return state;
 *   }
 * };
 * const [count, dispatch] = useReducer(reducer, 0);
 */

/**
 * 4. useContext - Access context values
 * 
 * Syntax: const value = useContext(MyContext);
 * 
 * Use Cases:
 * - Theme switching (light/dark mode)
 * - Authentication state
 * - Language/localization
 * - Global app settings
 * - Avoid prop drilling
 * 
 * Process:
 * 1. Create context: const MyContext = createContext();
 * 2. Provide value: <MyContext.Provider value={...}>
 * 3. Consume: const value = useContext(MyContext);
 * 
 * Example: const theme = useContext(ThemeContext);
 */

// ============================================================================
// PERFORMANCE OPTIMIZATION HOOKS
// ============================================================================

/**
 * 5. useCallback - Memoize functions
 * 
 * Syntax: const memoizedCallback = useCallback(() => { ... }, [deps]);
 * 
 * Use Cases:
 * - Passing callbacks to optimized child components
 * - Preventing infinite loops in useEffect
 * - Functions used as dependencies
 * 
 * When to Use:
 * - If child component is wrapped in React.memo
 * - Callback is used in dependency array of other hooks
 * - You have performance issues with many re-renders
 * 
 * Note: Only optimize when you have measured performance issues
 * 
 * Example: 
 * const handleClick = useCallback(() => { setCount(c => c + 1); }, []);
 */

/**
 * 6. useMemo - Memoize expensive calculations
 * 
 * Syntax: const memoizedValue = useMemo(() => { ... }, [deps]);
 * 
 * Use Cases:
 * - Expensive computations
 * - Filtering/sorting large arrays
 * - Complex calculations based on props/state
 * 
 * When to Use:
 * - Value is expensive to calculate
 * - Value is used in dependency array
 * - Child components depend on referential equality
 * 
 * Example:
 * const expensiveValue = useMemo(() => {
 *   return largeArray.sort(...);
 * }, [largeArray]);
 */

// ============================================================================
// REF HOOKS
// ============================================================================

/**
 * 7. useRef - Access DOM elements and store mutable values
 * 
 * Syntax: const refContainer = useRef(initialValue);
 * 
 * Use Cases:
 * - Accessing DOM elements directly
 * - Managing focus
 * - Text selection
 * - Triggering animations
 * - Storing timers/subscriptions
 * - Tracking previous values
 * 
 * Key Differences from useState:
 * - Doesn't trigger re-render when changed
 * - Returns same object reference
 * - .current property holds the value
 * 
 * Example:
 * const inputRef = useRef(null);
 * inputRef.current.focus();
 */

// ============================================================================
// ADDITIONAL HOOKS
// ============================================================================

/**
 * 8. useLayoutEffect - Similar to useEffect but fires synchronously
 * 
 * Syntax: useLayoutEffect(() => { ... }, [deps]);
 * 
 * Use Cases:
 * - DOM measurements
 * - DOM mutations that must happen before browser paint
 * 
 * When to Use:
 * - You need values from DOM before browser paints
 * - Most cases should use useEffect
 */

/**
 * 9. useDebugValue - Help debug custom hooks
 * 
 * Syntax: useDebugValue(value, format);
 * 
 * Use Cases:
 * - Display values in React DevTools
 * - Useful for custom hooks
 */

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Creating Custom Hooks
 * 
 * Custom hooks are functions that use React hooks and can be reused
 * 
 * Rules:
 * - Must start with "use" (e.g., useCustom)
 * - Can call other hooks
 * - Only call at top level (not in loops/conditions)
 * 
 * Example:
 * function useWindowWidth() {
 *   const [width, setWidth] = useState(window.innerWidth);
 *   
 *   useEffect(() => {
 *     const handleResize = () => setWidth(window.innerWidth);
 *     window.addEventListener('resize', handleResize);
 *     return () => window.removeEventListener('resize', handleResize);
 *   }, []);
 *   
 *   return width;
 * }
 */

// ============================================================================
// HOOK RULES
// ============================================================================

/**
 * Rules of Hooks (MUST FOLLOW):
 * 
 * 1. Only Call Hooks at Top Level
 *    ✅ Call hooks in component body
 *    ❌ Don't call hooks in loops, conditions, or nested functions
 * 
 * 2. Only Call Hooks from React Components
 *    ✅ Call from functional components
 *    ✅ Call from custom hooks
 *    ❌ Don't call from regular JavaScript functions
 * 
 * 3. Hook Naming Convention
 *    ✅ Start custom hook names with "use"
 *    ❌ Don't use other naming conventions for hooks
 */

// ============================================================================
// COMPARISON TABLE
// ============================================================================

/**
 * useState vs useReducer:
 * 
 * useState:
 * - Simple state management
 * - Single or few state values
 * - Easy to understand
 * 
 * useReducer:
 * - Complex state logic
 * - Multiple related state values
 * - More predictable state updates
 * - Better for prop passing to children
 */

/**
 * useCallback vs useMemo:
 * 
 * useCallback:
 * - Memoizes FUNCTIONS
 * - Returns same function reference
 * - Prevents child re-renders
 * 
 * useMemo:
 * - Memoizes VALUES
 * - Returns same value reference
 * - Prevents expensive recalculations
 */

/**
 * useRef vs useState:
 * 
 * useRef:
 * - No re-render on change
 * - Persists across renders
 * - For DOM access
 * - Imperative use cases
 * 
 * useState:
 * - Triggers re-render
 * - For component state
 * - Declarative
 */

// ============================================================================
// PERFORMANCE TIPS
// ============================================================================

/**
 * Performance Optimization Tips:
 * 
 * 1. Measure First
 *    - Don't optimize prematurely
 *    - Use React DevTools Profiler
 * 
 * 2. useCallback and useMemo
 *    - Use when passing to memoized children
 *    - Use when in dependency arrays of other hooks
 * 
 * 3. Code Splitting
 *    - Use React.lazy and Suspense
 *    - Split components by route
 * 
 * 4. Avoid Creating Objects/Arrays in Render
 *    - Use useMemo for computed values
 *    - Use useCallback for functions
 * 
 * 5. useReducer for Complex State
 *    - Easier to track state changes
 *    - Reduces prop drilling
 */

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * Pattern 1: Fetch Data on Mount
 * 
 * useEffect(() => {
 *   fetchData();
 * }, []); // Run once on mount
 */

/**
 * Pattern 2: Update on Dependency Change
 * 
 * useEffect(() => {
 *   handleUpdate();
 * }, [dependency]); // Run when dependency changes
 */

/**
 * Pattern 3: Cleanup (unsubscribe, timers)
 * 
 * useEffect(() => {
 *   const subscription = subscribe();
 *   return () => subscription.unsubscribe(); // Cleanup
 * }, []);
 */

/**
 * Pattern 4: Conditional State
 * 
 * const [data, setData] = useState(null);
 * 
 * useEffect(() => {
 *   if (condition) {
 *     setData(...);
 *   }
 * }, [condition]);
 */

/**
 * Pattern 5: Custom Hook
 * 
 * function useCustomHook(param) {
 *   const [state, setState] = useState(null);
 *   useEffect(() => {
 *     // Custom logic
 *   }, [param]);
 *   return [state, setState];
 * }
 */

// ============================================================================
// MIGRATION GUIDE
// ============================================================================

/**
 * From Class Components to Hooks:
 * 
 * Constructor → useState
 * componentDidMount → useEffect with []
 * componentDidUpdate → useEffect with [deps]
 * componentWillUnmount → return cleanup from useEffect
 * this.state → useState
 * this.setState → setState from useState
 * this.props → function parameters
 */

export { /* This file is for reference only */ };
