import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'

const EmployeeDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const stats = [
    {
      title: 'Leave Balance',
      value: '15 days',
      color: 'blue',
      icon: FaCalendarAlt
    },
    {
      title: 'Pending Requests',
      value: '2',
      color: 'yellow',
      icon: FaUser
    },
    {
      title: 'Current Salary',
      value: '$75,000',
      color: 'green',
      icon: FaMoneyBillWave
    }
  ]

  const quickActions = [
    {
      title: 'Apply for Leave',
      description: 'Submit a new leave request',
      icon: FaCalendarAlt,
      color: 'blue',
      action: () => console.log('Apply for leave')
    },
    {
      title: 'View Pay Slip',
      description: 'Download latest pay slip',
      icon: FaMoneyBillWave,
      color: 'green',
      action: () => console.log('View pay slip')
    },
    {
      title: 'Update Profile',
      description: 'Edit personal information',
      icon: FaUser,
      color: 'purple',
      action: () => console.log('Update profile')
    },
    {
      title: 'Settings',
      description: 'Manage account settings',
      icon: FaCog,
      color: 'gray',
      action: () => console.log('Settings')
    }
  ]

  const getCardColors = (color) => {
    const colors = {
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
      green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      gray: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
    }
    return colors[color] || colors.blue
  }

  const getIconColors = (color) => {
    const colors = {
      blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
      yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      green: 'bg-gradient-to-r from-green-500 to-green-600',
      purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
      gray: 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Routes>
        <Route index element={
          <div className="p-6">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                    <span className="text-white font-bold text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Welcome back, {user?.name}!
                    </h1>
                    <p className="text-gray-600 mt-1">Employee Dashboard</p>
                    <p className="text-sm text-blue-600 capitalize font-medium">{user?.role}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${getCardColors(stat.color)} border rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 ${getIconColors(stat.color)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="flex items-center mb-6">
                <FaTachometerAlt className="mr-3 text-blue-600 h-6 w-6" />
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`${getCardColors(action.color)} border p-4 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 ${getIconColors(action.color)} rounded-lg flex items-center justify-center shadow-md mr-4`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-xs text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md mr-4">
                    <FaCalendarAlt className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Leave request approved</p>
                    <p className="text-xs text-gray-500">Your annual leave for Dec 15-20 has been approved</p>
                  </div>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md mr-4">
                    <FaMoneyBillWave className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Salary credited</p>
                    <p className="text-xs text-gray-500">Your August salary has been credited to your account</p>
                  </div>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md mr-4">
                    <FaUser className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Profile updated</p>
                    <p className="text-xs text-gray-500">Your contact information has been updated successfully</p>
                  </div>
                  <span className="text-xs text-gray-400">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        } />
        {/* Add more employee routes here as needed */}
      </Routes>
    </div>
  )
}

export default EmployeeDashboard
