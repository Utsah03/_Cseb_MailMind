import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Sent from './pages/Sent';
import Drafts from './pages/Drafts';
import Compose from './pages/Compose';
import Settings from './pages/Settings';
import { MailProvider } from './context/MailContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // Initialize theme class on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mailmind-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ThemeProvider>
      <MailProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/sent" element={<Sent />} />
              <Route path="/drafts" element={<Drafts />} />
              <Route path="/compose" element={<Compose />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </MailProvider>
    </ThemeProvider>
  );
}

export default App;