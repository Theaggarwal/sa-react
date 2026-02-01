# Sample React App - Todo Management Application

A comprehensive React application for managing todos with client-side routing, form handling, and API integration. Built with Create React App, this project demonstrates modern React patterns and best practices.

## 🎯 Application Overview

### What This Application Does

This is a **Todo Management Application** that allows users to:

- **View Todos**: Displays a list of all todos fetched from an external API (JSONPlaceholder)
- **Add New Todos**: Create new todo items with a validated form
- **Edit Todos**: Update existing todo items with title, completion status, and user assignment
- **Navigate Between Pages**: Seamless client-side navigation between the todos list and form pages without full page reloads

### Key Features

- 📋 **Dynamic Todo List**: Fetch and display todos from JSONPlaceholder API
- ➕ **Add Todos**: Create new todos with form validation (Yup schema)
- ✏️ **Edit Todos**: Update existing todos by ID with pre-filled form data
- 🧭 **Client-Side Routing**: Multi-page experience with React Router v6
- ✅ **Form Validation**: Yup schema validation with error handling
- 🎨 **Responsive UI**: Clean, accessible form and table components
- 📡 **API Integration**: Axios-based HTTP client with error handling

---

## 📚 What You Can Learn

### 1. **React Fundamentals**
- Functional components and React Hooks (`useState`, `useEffect`)
- Component composition and reusability
- Props, state management, and data flow
- Conditional rendering and list rendering

### 2. **React Router v6**
- Setting up routing with `BrowserRouter`
- Defining routes with `<Route>` and `<Routes>`
- Navigation with `useNavigate()` hook and `<NavLink>` component
- Route parameters (`:id`) and dynamic page rendering
- Active link styling with `isActive` flag

### 3. **Form Handling with React Hook Form**
- Form state management with `useForm()` hook
- Register form inputs with `register()`
- Form submission handling with `handleSubmit()`
- Default values and form reset
- Display validation errors from the form state

### 4. **Schema Validation with Yup**
- Define validation schemas with Yup
- Create reusable validation rules
- Integrate Yup with React Hook Form using `yupResolver`
- Display user-friendly error messages
- Validate strings, numbers, booleans, and complex objects

### 5. **API Integration with Axios**
- Create a custom API client with axios
- Configure base URL and timeout settings
- Make HTTP requests (GET, POST, PUT)
- Handle API errors and normalize error responses
- Async/await patterns for API calls

### 6. **Component Architecture**
- Separation of concerns (pages vs components)
- Page components for routing (`TodosListPage`, `TodoFormPage`)
- Reusable form component (`TodoForm`) with multiple use cases
- Service layer for API communication (`todoService`)
- Barrel exports for clean imports

### 7. **State Management Patterns**
- Component-level state with `useState`
- Side effects with `useEffect` and cleanup functions
- Lifting state up for shared data
- Loading and error states
- Preventing memory leaks with mounted flag

### 8. **CSS and Styling**
- Inline styles with dynamic values
- CSS Modules and external CSS files
- BEM naming convention (`.tf-form`, `.tf-button`)
- Responsive table layouts with overflow handling
- Conditional styling based on component state

### 9. **Async Programming**
- Promise chains with `.then()` and `.catch()`
- Try/catch blocks with async/await
- Loading states during API calls
- Error handling and user feedback
- Cleanup in effect hooks

### 10. **Git and Version Control**
- Initialize git repositories
- Commit changes with meaningful messages
- Push to remote repositories (GitHub)
- Track project evolution through commits

---

## 📂 Project Structure

```
03_sample_app/
├── src/
│   ├── components/
│   │   ├── TodoForm.js         # Reusable form component (add/edit)
│   │   ├── TodoForm.css        # Form styles (BEM convention)
│   │   └── index.js            # Component barrel exports
│   ├── pages/
│   │   ├── TodosListPage.js    # List all todos page
│   │   ├── TodoFormPage.js     # Add/edit todo page
│   │   └── index.js            # Page barrel exports
│   ├── services/
│   │   ├── todoService.js      # API communication
│   │   └── apiClient.js        # Axios instance configuration
│   ├── hooks/
│   │   ├── 00_HOOKS_REFERENCE.md
│   │   ├── 01_useState.js
│   │   ├── 02_useEffect.js
│   │   ├── 03_useContext.js
│   │   ├── 04_useReducer.js
│   │   ├── 05_useCallback.js
│   │   ├── 06_useMemo.js
│   │   └── 07_useRef.js
│   ├── App.js                  # Main app with routing
│   ├── App.css                 # App styles
│   ├── index.js                # Entry point with BrowserRouter
│   └── index.css               # Global styles
├── public/
│   └── index.html              # HTML template
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## � Dependencies

### Core Dependencies
- **React 18**: UI library for building components
- **React DOM**: Renders React components to the DOM
- **React Router DOM v6**: Client-side routing and navigation
- **React Hook Form**: Efficient form state management
- **Yup**: Schema validation library
- **@hookform/resolvers**: Bridge between React Hook Form and Yup
- **Axios**: HTTP client for API requests

### Development Dependencies
- **Create React App**: Build tooling and development server

### Installation

After cloning or downloading this project:

```bash
cd 03_sample_app
npm install
```

---

## 🚀 Getting Started

### Running the Application

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - The app automatically reloads on code changes

3. **Navigate the app:**
   - View todos on the home page (`/`)
   - Click "Add New Todo" button to create a new todo
   - Click "Edit" on any todo to modify it
   - Use "Back to List" to return to the home page

### Building for Production

```bash
npm run build
```

This creates a `build/` folder with optimized production files.

---

## 💡 Code Examples

### Using the TodoForm Component

```jsx
import TodoForm from './components/TodoForm';

function MyPage() {
  const handleSuccess = () => {
    console.log('Todo saved!');
  };

  return (
    <TodoForm
      initialData={null}  // For add mode
      onSuccess={handleSuccess}
    />
  );
}
```

### Using the Todo Service

```jsx
import { getTodos, getTodoById, addTodo, updateTodo } from './services';

// Fetch all todos
const todos = await getTodos();

// Fetch a specific todo
const todo = await getTodoById(1);

// Add a new todo
const newTodo = await addTodo({ title: 'Learn React', userId: 1, completed: false });

// Update a todo
const updated = await updateTodo(1, { completed: true });
```

### Using React Router Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/')}>Go to List</button>
      <button onClick={() => navigate('/add')}>Add New</button>
      <button onClick={() => navigate(`/edit/5`)}>Edit Todo 5</button>
    </>
  );
}
```

---

## 📚 Advanced Topics

### Option 1: Using Create React App (Recommended)

1. **Navigate to the desired directory:**
   ```bash
   cd 03_sample_app
   ```

2. **Create a new React app:**
   ```bash
   npx create-react-app my-sample-app
   ```
   This will create a new folder called `my-sample-app` with all the necessary dependencies and configuration.

3. **Navigate into the app directory:**
   ```bash
   cd my-sample-app
   ```

4. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

### Option 2: Using Vite (Faster Alternative)
<!-- Vite is a modern build tool & dev server used to create and run React apps much faster than CRA. -->

1. **Create a new Vite React project:**
   ```bash
   npm create vite@latest my-sample-app -- --template react
   ```

2. **Navigate into the app directory:**
   ```bash
   cd my-sample-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Project Structure

After creating your React app, you'll have the following structure:

```
my-sample-app/
├── node_modules/          # All dependencies
├── public/                # Static files
│   ├── index.html         # Main HTML file
│   └── favicon.ico
├── src/                   # Source code
│   ├── App.js             # Main App component
│   ├── App.css            # App styles
│   ├── index.js           # Entry point
│   ├── index.css          # Global styles
│   └── reportWebVitals.js
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Locked dependency versions
└── README.md              # Project documentation
```

## How to Run the Application

### Development Mode

1. **Navigate to your app directory:**
   ```bash
   cd my-sample-app
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - The app will automatically open in your default browser at `http://localhost:3000`
   - The page will reload when you make changes
   - Console errors will be visible in the browser console (press `F12`)

### Production Build

To create an optimized production build:

```bash
npm run build
```

This will:
- Create a `build` folder with optimized files
- Minify and bundle your code
- Generate sourcemaps for debugging

To serve the production build locally:
```bash
npm install -g serve
serve -s build
```

## Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode
- **`npm test`** - Launches the test runner
- **`npm run build`** - Builds the app for production
- **`npm run eject`** - Ejects from Create React App (irreversible!)

## Common Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm install <package>` | Install a new package |
| `npm install <package> --save-dev` | Install as dev dependency |
| `npm uninstall <package>` | Remove a package |
| `npm update` | Update all packages |
| `npm run build` | Create production build |

## Tips for Development

- **Hot Module Replacement (HMR):** Changes to your files will reflect instantly in the browser
- **Console Output:** Check the terminal and browser console for errors and warnings
- **DevTools:** Use React Developer Tools browser extension for debugging
- **Code Formatting:** Consider using Prettier and ESLint for code quality

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Run on a different port: `PORT=3001 npm start` |
| Module not found error | Run `npm install` to ensure all dependencies are installed |
| Dependencies outdated | Run `npm update` to update packages |
| Node modules taking too space | Delete `node_modules` and run `npm install` |

## Learning Resources

- [React Official Documentation](https://react.dev/)
- [Create React App Documentation](https://create-react-app.dev/)
- [MDN Web Docs - React](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)

## License

This sample app is created for learning purposes.
