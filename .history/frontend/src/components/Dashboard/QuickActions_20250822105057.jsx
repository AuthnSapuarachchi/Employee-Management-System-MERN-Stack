import React from 'react'
import { FaUserPlus, FaBuilding, FaFileAlt, FaChartBar, FaCog, FaDownload } from 'react-icons/fa';

const QuickActions = () => {
    const actions = [
        {
            name: 'Add Employee',
            description: 'Register a new employee',
            icon: FaUserPlus,
            color: 'blue',
            href: '/admin-dashboard/employees/add'
        },
        {
            name: 'Manage Departments',
            description: 'Create or edit departments',
            icon: FaBuilding,
            color: 'green',
            href: '/admin-dashboard/departments'
        },
        {
            name: 'Generate Report',
            description: 'Create employee reports',
            icon: FaFileAlt,
            color: 'purple',
            href: '/admin-dashboard/reports'
        },
        {
            name: 'View Analytics',
            description: 'Check performance metrics',
            icon: FaChartBar,
            color: 'yellow',
            href: '/admin-dashboard/analytics'
        },
        {
            name: 'System Settings',
            description: 'Configure system preferences',
            icon: FaCog,
            color: 'gray',
            href: '/admin-dashboard/settings'
        },
        {
            name: 'Export Data',
            description: 'Download employee data',
            icon: FaDownload,
            color: 'indigo',
            href: '/admin-dashboard/export'
        }
    ];

    const getActionColors = (color) => {
        const colors = {
            blue: {
                bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
                icon: 'bg-gradient-to-r from-blue-500 to-blue-600',
                text: 'text-blue-600',
                border: 'border-blue-200',
                hover: 'hover:from-blue-100 hover:to-blue-200'
            },
            green: {
                bg: 'bg-gradient-to-br from-green-50 to-green-100',
                icon: 'bg-gradient-to-r from-green-500 to-green-600',
                text: 'text-green-600',
                border: 'border-green-200',
                hover: 'hover:from-green-100 hover:to-green-200'
            },
            purple: {
                bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
                icon: 'bg-gradient-to-r from-purple-500 to-purple-600',
                text: 'text-purple-600',
                border: 'border-purple-200',
                hover: 'hover:from-purple-100 hover:to-purple-200'
            },
            yellow: {
                bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
                icon: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                text: 'text-yellow-600',
                border: 'border-yellow-200',
                hover: 'hover:from-yellow-100 hover:to-yellow-200'
            },
            gray: {
                bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
                icon: 'bg-gradient-to-r from-gray-500 to-gray-600',
                text: 'text-gray-600',
                border: 'border-gray-200',
                hover: 'hover:from-gray-100 hover:to-gray-200'
            },
            indigo: {
                bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
                icon: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                text: 'text-indigo-600',
                border: 'border-indigo-200',
                hover: 'hover:from-indigo-100 hover:to-indigo-200'
            }
        };
        return colors[color];
    };

    const handleAction = (href) => {
        // For now, just log the action. Later this can navigate to the actual page
        console.log(`Navigating to: ${href}`);
        alert(`Feature coming soon: ${href}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action) => {
                    const actionColors = getActionColors(action.color);
                    return (
                        <button
                            key={action.name}
                            onClick={() => handleAction(action.href)}
                            className={`group relative overflow-hidden rounded-xl ${actionColors.bg} ${actionColors.border} border p-4 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br ${actionColors.hover}`}
                        >
                            <div className="flex items-start">
                                <div className={`w-12 h-12 ${actionColors.icon} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                                    <action.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-800">
                                        {action.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 group-hover:text-gray-700">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default QuickActions
