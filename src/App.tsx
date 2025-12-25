import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import TransactionsPage from '@/pages/TransactionsPage';

import SettingsPage from '@/pages/SettingsPage';
import ProfilePage from '@/pages/ProfilePage';
import SupportPage from '@/pages/SupportPage';

function DashboardWithLayout() {
  return (
    <DashboardLayout>
       <Outlet />
    </DashboardLayout>
  )
}

import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ManageUsersPage from '@/pages/admin/ManageUsersPage';
import ManageLocationsPage from '@/pages/admin/ManageLocationsPage';
import ActivityLogPage from '@/pages/admin/ActivityLogPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route element={
            <ProtectedRoute adminOnly>
              <DashboardWithLayout />
            </ProtectedRoute>
          }>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<ManageUsersPage />} />
            <Route path="/admin/locations" element={<ManageLocationsPage />} />
            <Route path="/admin/activity" element={<ActivityLogPage />} />
          </Route>

          {/* User Routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardWithLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
