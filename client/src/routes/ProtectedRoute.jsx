import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLE_HOME = {
  ADMIN: '/admin/dashboard',
  VENDOR: '/vendor/dashboard',
  CUSTOMER: '/shop',
}

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()

  if (loading) return <FullScreenLoader />

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  }

  return children
}

export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <FullScreenLoader />

  if (user) return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />

  return children
}

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

export { ROLE_HOME }
