import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                {/* Logo/Header */}
                <div className="flex items-center justify-center h-16 bg-blue-600">
                    <h1 className="text-xl font-bold text-white">EMS Dashboard</h1>
                </div>

                {/* User Info */}
                <div className="p-4 border-b">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-5 px-2 space-y-1">
                    <NavLink 
                        to="/admin-dashboard" 
                        className={({ isActive }) => 
                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <FaTachometerAlt className="mr-3 h-4 w-4" />
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/employees" 
                        className={({ isActive }) => 
                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <FaUsers className="mr-3 h-4 w-4" />
                        Employees
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/departments" 
                        className={({ isActive }) => 
                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <FaBuilding className="mr-3 h-4 w-4" />
                        Departments
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/leave" 
                        className={({ isActive }) => 
                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <FaCalendarAlt className="mr-3 h-4 w-4" />
                        Leave Management
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/settings" 
                        className={({ isActive }) => 
                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <FaCog className="mr-3 h-4 w-4" />
                        Settings
                    </NavLink>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <FaSignOutAlt className="mr-3 h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="ml-64 flex-1">
                {/* Top Header */}
                <header className="bg-white shadow">
                    <div className="px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600">Here's what's happening in your organization today.</p>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100">
                                    <FaUsers className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                                    <p className="text-2xl font-semibold text-gray-900">150</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100">
                                    <FaBuilding className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Departments</p>
                                    <p className="text-2xl font-semibold text-gray-900">8</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100">
                                    <FaCalendarAlt className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
                                    <p className="text-2xl font-semibold text-gray-900">12</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-purple-100">
                                    <FaTachometerAlt className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                                    <p className="text-2xl font-semibold text-gray-900">25</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-900">New employee John Doe added to HR department</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-900">Leave request approved for Sarah Wilson</p>
                                            <p className="text-xs text-gray-500">4 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-900">Department meeting scheduled for Marketing team</p>
                                            <p className="text-xs text-gray-500">1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
                                        <FaUsers className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                        <span className="text-sm font-medium text-blue-900">Add Employee</span>
                                    </button>
                                    <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
                                        <FaBuilding className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                        <span className="text-sm font-medium text-green-900">New Department</span>
                                    </button>
                                    <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center">
                                        <FaCalendarAlt className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                                        <span className="text-sm font-medium text-yellow-900">View Leaves</span>
                                    </button>
                                    <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
                                        <FaCog className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                        <span className="text-sm font-medium text-purple-900">Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

import React from 'react'
import Sidebar from './Dashboard/Sidebar.jsx'
import DashboardHeader from './Dashboard/DashboardHeader.jsx'
import StatsCards from './Dashboard/StatsCards.jsx'
import QuickActions from './Dashboard/QuickActions.jsx'
import RecentActivity from './Dashboard/RecentActivity.jsx'

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-auto">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <DashboardHeader />

                    {/* Stats Cards */}
                    <StatsCards />

                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Recent Activity */}
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
