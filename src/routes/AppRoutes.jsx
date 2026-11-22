import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Welcome from '../pages/Welcome';
import Onboarding from '../pages/Onboarding';
import Discover from '../pages/Discover';
import Matches from '../pages/Matches';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Welcome Screen (Authenticated, but before or after onboarding) */}
          <Route element={<ProtectedRoute requireOnboarding={false} />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* Protected Routes (Requires Authentication and Completed Onboarding) */}
          <Route element={<ProtectedRoute requireOnboarding={true} />}>
            <Route path="/discover" element={<Discover />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
