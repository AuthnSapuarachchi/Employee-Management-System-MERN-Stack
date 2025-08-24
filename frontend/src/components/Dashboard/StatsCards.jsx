import React from 'react'
import { FaUsers, FaBuilding, FaCalendarCheck, FaMoneyBillWave } from 'react-icons/fa';

const StatsCards = () => {
    const stats = [
        {
            name: 'Total Employees',
            value: '142',
            change: '+4.75%',
            changeType: 'increase',
            icon: FaUsers,
            color: 'blue'
        },
        {
            name: 'Active Departments',
            value: '8',
            change: '+0.00%',
            changeType: 'neutral',
            icon: FaBuilding,
            color: 'green'
        },
        {
            name: 'Pending Leaves',
            value: '12',
            change: '-2.36%',
            changeType: 'decrease',
            icon: FaCalendarCheck,
            color: 'yellow'
        },
        {
            name: 'Monthly Payroll',
            value: '$45,280',
            change: '+3.2%',
            changeType: 'increase',
            icon: FaMoneyBillWave,
            color: 'purple'
        }
    ];

    const getCardColors = (color) => {
        const colors = {
            blue: {
                bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
                icon: 'bg-gradient-to-r from-blue-500 to-blue-600',
                text: 'text-blue-600',
                border: 'border-blue-200'
            },
            green: {
                bg: 'bg-gradient-to-br from-green-50 to-green-100',
                icon: 'bg-gradient-to-r from-green-500 to-green-600',
                text: 'text-green-600',
                border: 'border-green-200'
            },
            yellow: {
                bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
                icon: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                text: 'text-yellow-600',
                border: 'border-yellow-200'
            },
            purple: {
                bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
                icon: 'bg-gradient-to-r from-purple-500 to-purple-600',
                text: 'text-purple-600',
                border: 'border-purple-200'
            }
        };
        return colors[color];
    };

    const getChangeColor = (changeType) => {
        switch (changeType) {
            case 'increase':
                return 'text-green-600';
            case 'decrease':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const getChangeIcon = (changeType) => {
        switch (changeType) {
            case 'increase':
                return '↗';
            case 'decrease':
                return '↘';
            default:
                return '→';
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const cardColors = getCardColors(stat.color);
                return (
                    <div 
                        key={stat.name} 
                        className={`relative overflow-hidden rounded-2xl ${cardColors.bg} ${cardColors.border} border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.name}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mb-2">
                                        {stat.value}
                                    </p>
                                    <div className="flex items-center">
                                        <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                                            {getChangeIcon(stat.changeType)} {stat.change}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className={`w-14 h-14 ${cardColors.icon} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="h-7 w-7 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative element */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${cardColors.icon}`}></div>
                    </div>
                );
            })}
        </div>
    )
}

export default StatsCards
