import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.js';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const navigationItems = [
        {
            name: 'Dashboard',
            href: '.',
            icon: FaTachometerAlt
        },
        {
            name: 'Employees',
            href: 'employees',
            icon: FaUsers
        },
        {
            name: 'Departments',
            href: 'departments',
            icon: FaBuilding
        },
        {
            name: 'Leave Management',
            href: 'leave',
            icon: FaCalendarAlt
        },
        {
            name: 'Settings',
            href: 'settings',
            icon: FaCog
        }
    ];

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
            {/* Logo/Header */}
            <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-blue-700">
                <h1 className="text-xl font-bold text-white">EMS Dashboard</h1>
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
                {navigationItems.map((item) => (
                    <NavLink 
                        key={item.name}
                        to={item.href} 
                        end={item.href === '.'}
                        className={({ isActive }) => 
                            `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md border border-blue-200' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                            }`
                        }
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
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
    )
}

export default Sidebar
