# Sample React App

A basic sample React application created with Create React App.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) - verify with `npm --version`

## Steps to Create a Sample React App

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
