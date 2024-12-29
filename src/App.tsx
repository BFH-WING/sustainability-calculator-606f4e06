import { useEffect } from 'react';
import { initializeAppwrite } from './integrations/appwrite/database';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './components/Auth';
import { Toaster } from 'sonner';

const App = () => {
  useEffect(() => {
    initializeAppwrite();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
};

export default App;