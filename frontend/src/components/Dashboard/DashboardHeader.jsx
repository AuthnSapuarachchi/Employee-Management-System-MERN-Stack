import React from 'react'
import { FaBell, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.js';

const DashboardHeader = () => {
    const { user } = useAuth();
    
    const getCurrentDate = () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return now.toLocaleDateString('en-US', options);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Welcome Section */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {getGreeting()}, {user?.name}! 👋
                    </h1>
                    <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="h-4 w-4 mr-2" />
                        <span className="text-sm">{getCurrentDate()}</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search employees, departments..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Notifications and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                            <FaBell className="h-5 w-5" />
                            {/* Notification badge */}
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>

                    {/* Profile Menu */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-blue-600 capitalize">{user?.role} Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
