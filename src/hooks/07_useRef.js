/**
 * useRef Hook
 * 
 * SCENARIO: Accessing DOM elements directly or storing mutable values
 * 
 * When to use:
 * - Direct DOM access (focus, text selection, triggering animations)
 * - Storing timers, subscriptions without triggering re-renders
 * - Managing imperative libraries (video players, maps, etc.)
 * - Keeping track of previous values
 * - Mutable values that don't affect rendering
 * 
 * Key difference from useState:
 * - Doesn't trigger re-render when value changes
 * - Returns same object reference across renders
 * - Persists across re-renders
 */

import React, { useRef, useState, useEffect } from 'react';

// Example 1: Focusing Input Element
function UseFocusExample() {
  // Create a ref to access the input DOM element
  const inputRef = useRef(null);

  const handleFocus = () => {
    // Access the DOM element using .current
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.borderColor = 'blue';
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.borderColor = 'gray';
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click button to focus me"
        onBlur={handleBlur}
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

// Example 2: Text Selection
function UseSelectTextExample() {
  const inputRef = useRef(null);

  const handleSelectAll = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue="Select this text"
      />
      <button onClick={handleSelectAll}>Select All Text</button>
    </div>
  );
}

// Example 3: Storing Mutable Values (Timers/Intervals)
function UseTimerExample() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null); // Store interval ID

  // Using useRef allows us to store the interval ID without triggering re-renders

  const handleStart = () => {
    if (intervalRef.current) return; // Already running

    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

// Example 4: Tracking Previous Value
function UsePreviousValueExample() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    // Store current count as previous count after render
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Custom hook to track previous value
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Example 5: Using Custom usePrevious Hook
function UseCustomPreviousExample() {
  const [name, setName] = useState('');
  const prevName = usePrevious(name);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type a name"
      />
      <p>Current Name: {name}</p>
      <p>Previous Name: {prevName}</p>
    </div>
  );
}

// Example 6: Video/Media Control
function UseVideoControlExample() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSetTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  return (
    <div>
      <video ref={videoRef} width="320" height="240" style={{ border: '1px solid #ccc' }}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={() => handleSetTime(0)}>Reset</button>
        <button onClick={() => handleSetTime(5)}>Go to 5s</button>
      </div>

      <p>{isPlaying ? 'Playing...' : 'Paused'}</p>
    </div>
  );
}

// Example 7: Canvas Drawing
function UseCanvasExample() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    // Draw initial content
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#000';
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.type === 'mousedown') {
      context.beginPath();
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: '1px solid #ccc', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      />
      <button onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
}

// Example 8: Managing DOM Measurements
function UseMeasureExample() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  const handleMeasure = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    }
  };

  return (
    <div>
      <div
        ref={elementRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          margin: '20px 0'
        }}
      >
        Measure Me
      </div>

      <button onClick={handleMeasure}>Measure Element</button>
      <p>Width: {size.width}px, Height: {size.height}px</p>
    </div>
  );
}

// Example 9: useRef vs useState
function ComparisonExample() {
  const countRef = useRef(0); // Doesn't cause re-render
  const [countState, setCountState] = useState(0); // Causes re-render

  const incrementRef = () => {
    countRef.current += 1;
    console.log('Ref (no re-render):', countRef.current);
  };

  const incrementState = () => {
    setCountState(countState + 1);
    console.log('State (re-renders):', countState + 1);
  };

  return (
    <div>
      <p>Ref Count (not shown, check console): {countRef.current}</p>
      <p>State Count (shown): {countState}</p>

      <button onClick={incrementRef}>Increment Ref</button>
      <button onClick={incrementState}>Increment State</button>

      <p style={{ fontSize: '12px', color: 'gray' }}>
        Open console to see the difference.
        Ref doesn't trigger re-render, State does.
      </p>
    </div>
  );
}

export {
  UseFocusExample,
  UseSelectTextExample,
  UseTimerExample,
  UsePreviousValueExample,
  UseCustomPreviousExample,
  UseVideoControlExample,
  UseCanvasExample,
  UseMeasureExample,
  ComparisonExample
};
