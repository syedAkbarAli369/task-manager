import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ allowedRoles }) => {

  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />
  }

  // Role check
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateRoute