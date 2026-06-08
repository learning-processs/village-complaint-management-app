// src/components/common/ProtectedRoute.jsx

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AutContext } from '../../context/AutContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AutContext)

  // Not logged in
  if (!user) {
    if (adminOnly) return <Navigate to='/admin-login' />
    return <Navigate to='/login' />
  }

  // Villager trying to access admin route
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to='/' />
  }

  // Admin trying to access villager route
  if (!adminOnly && user.role === 'admin') {
    return <Navigate to='/admin' />
  }

  return children
}

export default ProtectedRoute