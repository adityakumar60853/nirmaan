import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CSCDashboard from './pages/CSCDashboard';
import JobProviderDashboard from './pages/JobProviderDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterProvider from './pages/RegisterProvider';
import Courses from './pages/Courses';
import Vacancies from './pages/Vacancies';
import CSC from './pages/CSC';
import PrivateRoute from './components/PrivateRoute';
import Schemes from './pages/Schemes';
import Chatbot from './components/Chatbot';

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const DashboardComponent = () => {
    if (!user) return <Navigate to="/login" />;
    
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'csc':
        return <CSCDashboard />;
      case 'jobProvider':
        return <JobProviderDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-provider" element={<RegisterProvider />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardComponent />
          </PrivateRoute>
        }
      />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
      <Route path="/vacancies" element={<PrivateRoute><Vacancies /></PrivateRoute>} />
      <Route path="/csc" element={<PrivateRoute><CSC /></PrivateRoute>} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <PrivateRoute>
            {user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          </PrivateRoute>
        } 
      />
      
      {/* CSC Routes */}
      <Route 
        path="/csc/*" 
        element={
          <PrivateRoute>
            {user?.role === 'csc' ? <CSCDashboard /> : <Navigate to="/" />}
          </PrivateRoute>
        } 
      />

      {/* Job Provider Routes */}
      <Route 
        path="/job-provider/*" 
        element={
          <PrivateRoute>
            {user?.role === 'jobProvider' ? <JobProviderDashboard /> : <Navigate to="/" />}
          </PrivateRoute>
        } 
      />

      {/* User Routes */}
      <Route 
        path="/user/*" 
        element={
          <PrivateRoute>
            {user?.role === 'user' ? <UserDashboard /> : <Navigate to="/" />}
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes; 