import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './components/project/ProjectDetails';
import ProfilePage from './pages/ProfilePage';
import Loading from '../src/components/Loading/Loading';
import ReportingPage from './pages/ReportingAnalyticsPage';
import AdminPanel from './pages/AdminPanel';
import EmployeeProfile from './pages/employeeProfile';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous task
    setTimeout(() => {
      setLoading(false); // Set loading to false after the components have rendered
    }, 5000); // Adjust the timeout duration according to your needs
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading /> // Render the loading component while loading is true
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:id" element={<DashboardPage />} />
          <Route path="/user/adminPanel/:id" element={<AdminPanel />} />
          <Route path="/user/:id/profile" element={<ProfilePage />} />
          <Route path="/user/:id/userProfile" element={<EmployeeProfile />} />
          <Route
            path="/user/:id/projects/:projectId"
            element={<ProjectDetailPage />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
