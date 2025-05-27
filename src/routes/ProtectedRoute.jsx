// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import useStore from "../store"

const ProtectedRoute = () => {
  const user = useStore(state => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet /> // ✅ Required for nested routing to work
}

export default ProtectedRoute
