import { useEffect } from 'react';
import { initializeAppwrite } from './integrations/appwrite/database';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

const App = () => {
  useEffect(() => {
    initializeAppwrite();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
