/**
 * useContext Hook
 * 
 * SCENARIO: Accessing context values without prop drilling
 * 
 * When to use:
 * - Share data across many components without passing props
 * - Global theme (light/dark mode)
 * - User authentication state
 * - Language/localization settings
 * - Application-wide settings and preferences
 */

import React, { createContext, useState, useContext } from 'react';

// Step 1: Create a context
const ThemeContext = createContext();
const UserContext = createContext();
const NotificationContext = createContext();

// Example 1: Theme Context with Provider
function ThemeProviderExample() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

// Component that consumes ThemeContext
function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgColor = theme === 'light' ? '#fff' : '#333';
  const textColor = theme === 'light' ? '#000' : '#fff';

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, padding: '20px' }}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// Example 2: User Authentication Context
function UserProviderExample() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <UserDisplayComponent />
      <LoginComponent />
    </UserContext.Provider>
  );
}

function UserDisplayComponent() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h3>Welcome, {user.name}!</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

function LoginComponent() {
  const { user, login, logout } = useContext(UserContext);

  const handleLogin = () => {
    login({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin'
    });
  };

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

// Example 3: Notification Context (Alert/Toast Messages)
function NotificationProviderExample() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      <NotificationDisplay />
      <NotificationTriggerComponent />
    </NotificationContext.Provider>
  );
}

function NotificationDisplay() {
  const { notifications } = useContext(NotificationContext);

  return (
    <div style={{ position: 'fixed', top: 10, right: 10 }}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            padding: '10px 15px',
            margin: '5px 0',
            backgroundColor: 
              notification.type === 'success' ? 'green' :
              notification.type === 'error' ? 'red' :
              'blue',
            color: 'white',
            borderRadius: '4px'
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}

function NotificationTriggerComponent() {
  const { addNotification } = useContext(NotificationContext);

  return (
    <div>
      <button onClick={() => addNotification('Success!', 'success')}>
        Success
      </button>
      <button onClick={() => addNotification('Error occurred!', 'error')}>
        Error
      </button>
      <button onClick={() => addNotification('Info message', 'info')}>
        Info
      </button>
    </div>
  );
}

// Example 4: Language/Localization Context
const LanguageContext = createContext();

function LanguageProviderExample() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      greeting: 'Hello',
      farewell: 'Goodbye'
    },
    es: {
      greeting: 'Hola',
      farewell: 'Adiós'
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      <LanguageSwitcherComponent />
      <LanguageDisplayComponent />
    </LanguageContext.Provider>
  );
}

function LanguageSwitcherComponent() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('es')}>Español</button>
      <p>Current Language: {language}</p>
    </div>
  );
}

function LanguageDisplayComponent() {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div>
      <p>{translations[language].greeting}</p>
      <p>{translations[language].farewell}</p>
    </div>
  );
}

// Example 5: Multiple Contexts (Composition)
function CombinedContextExample() {
  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      <UserContext.Provider value={{ user: null, login: () => {}, logout: () => {} }}>
        <NotificationContext.Provider value={{ addNotification: () => {}, removeNotification: () => {} }}>
          <CombinedComponent />
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function CombinedComponent() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const notifications = useContext(NotificationContext);

  return (
    <div>
      <p>Theme: {theme?.theme}</p>
      <p>User: {user?.user?.name || 'Guest'}</p>
      <p>Notifications available: {!!notifications?.addNotification}</p>
    </div>
  );
}

export {
  ThemeProviderExample,
  ThemedComponent,
  UserProviderExample,
  NotificationProviderExample,
  LanguageProviderExample,
  CombinedContextExample
};
