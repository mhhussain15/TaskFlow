import React, { useState, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Tags } from './pages/Tags';
import { Calendar } from './pages/Calendar';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  // Update page title based on route
  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/': 'Dashboard | TaskFlow',
      '/tasks': 'Tasks | TaskFlow',
      '/tags': 'Tags | TaskFlow',
      '/calendar': 'Calendar | TaskFlow',
    };
    
    document.title = pathToTitle[currentPath] || 'TaskFlow';
  }, [currentPath]);

  // Simple router
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/tasks':
        return <Tasks />;
      case '/tags':
        return <Tags />;
      case '/calendar':
        return <Calendar />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <TaskProvider>
        {renderRoute()}
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;