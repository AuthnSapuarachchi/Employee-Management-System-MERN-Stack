import React from 'react'

const Dashboard = () => {
    const { user } = useAuth();
  return (
    <div>
        <div>
            <h1>Welcome to the Dashboard, {user.name}!</h1>
        </div>
        <div>
            <Nav
        </div>
    </div>
  )
}

export default Dashboard
