import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaCog, FaSignOutAlt, FaBell, FaSearch, FaChartLine, FaUserTie, FaClipboardList, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth.js';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const stats = [
        { 
            title: 'Total Employees', 
            value: '150', 
            icon: FaUsers, 
            color: 'from-blue-400 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            change: '+12%',
            changeColor: 'text-green-500'
        },
        { 
            title: 'Departments', 
            value: '8', 
            icon: FaBuilding, 
            color: 'from-emerald-400 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            change: '+2%',
            changeColor: 'text-green-500'
        },
        { 
            title: 'Pending Leaves', 
            value: '12', 
            icon: FaCalendarAlt, 
            color: 'from-amber-400 to-amber-600',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            change: '-8%',
            changeColor: 'text-red-500'
        },
        { 
            title: 'Active Projects', 
            value: '25', 
            icon: FaChartLine, 
            color: 'from-purple-400 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            change: '+18%',
            changeColor: 'text-green-500'
        }
    ];

    const quickActions = [
        { title: 'Add Employee', icon: FaUserTie, color: 'from-blue-500 to-blue-700', href: '/admin-dashboard/employees/add' },
        { title: 'New Department', icon: FaBuilding, color: 'from-emerald-500 to-emerald-700', href: '/admin-dashboard/departments/add' },
        { title: 'View Reports', icon: FaClipboardList, color: 'from-amber-500 to-amber-700', href: '/admin-dashboard/reports' },
        { title: 'Performance', icon: FaTrophy, color: 'from-purple-500 to-purple-700', href: '/admin-dashboard/performance' }
    ];

    const recentActivities = [
        { 
            message: 'New employee John Doe added to HR department', 
            time: '2 hours ago', 
            type: 'user',
            color: 'bg-blue-100 text-blue-800'
        },
        { 
            message: 'Leave request approved for Sarah Wilson', 
            time: '4 hours ago', 
            type: 'approval',
            color: 'bg-green-100 text-green-800'
        },
        { 
            message: 'Department meeting scheduled for Marketing team', 
            time: '1 day ago', 
            type: 'meeting',
            color: 'bg-yellow-100 text-yellow-800'
        },
        { 
            message: 'New project "Website Redesign" assigned to Dev team', 
            time: '2 days ago', 
            type: 'project',
            color: 'bg-purple-100 text-purple-800'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl border-r border-gray-100">
                {/* Logo/Header */}
                <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                    <h1 className="text-xl font-bold text-white relative z-10">EMS Dashboard</h1>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-blue-600 capitalize font-medium">{user?.role} Admin</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 px-3 space-y-2">
                    <NavLink 
                        to="/admin-dashboard" 
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <FaTachometerAlt className="mr-3 h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/employees" 
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <FaUsers className="mr-3 h-5 w-5" />
                        Employees
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/departments" 
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <FaBuilding className="mr-3 h-5 w-5" />
                        Departments
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/leave" 
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <FaCalendarAlt className="mr-3 h-5 w-5" />
                        Leave Management
                    </NavLink>

                    <NavLink 
                        to="/admin-dashboard/settings" 
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <FaCog className="mr-3 h-5 w-5" />
                        Settings
                    </NavLink>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-3">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 hover:shadow-md"
                    >
                        <FaSignOutAlt className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="ml-64 flex-1">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
                    <div className="px-6 py-4 sm:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    Good morning, {user?.name}! 👋
                                </h1>
                                <p className="text-gray-600 mt-1">Here's what's happening in your organization today.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                    <FaBell className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6 space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        <p className={`text-sm font-medium ${stat.changeColor} mt-1`}>{stat.change} from last month</p>
                                    </div>
                                    <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                                        <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <button key={index} className={`p-6 bg-gradient-to-br ${action.color} rounded-xl hover:shadow-lg transition-all duration-300 text-center group hover:scale-105`}>
                                    <action.icon className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-sm font-semibold text-white">{action.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity & Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activities */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                                                        {activity.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Performance Overview */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Employee Satisfaction</p>
                                            <p className="text-2xl font-bold text-green-600">94%</p>
                                        </div>
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <FaTrophy className="h-8 w-8 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Project Completion</p>
                                            <p className="text-2xl font-bold text-blue-600">87%</p>
                                        </div>
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaChartLine className="h-8 w-8 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Attendance Rate</p>
                                            <p className="text-2xl font-bold text-purple-600">96%</p>
                                        </div>
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                            <FaCalendarAlt className="h-8 w-8 text-purple-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard

export default Dashboard
