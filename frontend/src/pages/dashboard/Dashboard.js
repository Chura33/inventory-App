import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Dashboard = ({children}) => {
  const path = '/login'; // replace with your actual path
  useRedirectLoggedOutUser(path);
  return (
    <div>
      <h2>Dashboard</h2>
      {children}
    </div>
  )
}

export default Dashboard
