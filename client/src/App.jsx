import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, PublicOnlyRoute } from './routes/ProtectedRoute'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import VendorDashboard from './pages/vendor/VendorDashboard'
import Shop from './pages/customer/Shop'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['VENDOR']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><Shop /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
