import React from 'react'
import { FaUserPlus, FaUserEdit, FaCalendarCheck, FaBuilding, FaClock } from 'react-icons/fa';

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: 'employee_added',
            message: 'John Smith was added to Marketing department',
            user: 'Admin',
            time: '2 hours ago',
            icon: FaUserPlus,
            color: 'green'
        },
        {
            id: 2,
            type: 'leave_approved',
            message: 'Leave request approved for Sarah Johnson',
            user: 'HR Manager',
            time: '4 hours ago',
            icon: FaCalendarCheck,
            color: 'blue'
        },
        {
            id: 3,
            type: 'employee_updated',
            message: 'Employee profile updated for Mike Wilson',
            user: 'Admin',
            time: '6 hours ago',
            icon: FaUserEdit,
            color: 'yellow'
        },
        {
            id: 4,
            type: 'department_created',
            message: 'New department "Data Science" was created',
            user: 'Admin',
            time: '1 day ago',
            icon: FaBuilding,
            color: 'purple'
        },
        {
            id: 5,
            type: 'employee_added',
            message: 'Emma Davis joined the Development team',
            user: 'Admin',
            time: '1 day ago',
            icon: FaUserPlus,
            color: 'green'
        },
        {
            id: 6,
            type: 'leave_approved',
            message: 'Medical leave approved for Robert Brown',
            user: 'HR Manager',
            time: '2 days ago',
            icon: FaCalendarCheck,
            color: 'blue'
        }
    ];

    const getActivityColors = (color) => {
        const colors = {
            green: {
                bg: 'bg-green-50',
                icon: 'bg-gradient-to-r from-green-500 to-green-600',
                border: 'border-green-200'
            },
            blue: {
                bg: 'bg-blue-50',
                icon: 'bg-gradient-to-r from-blue-500 to-blue-600',
                border: 'border-blue-200'
            },
            yellow: {
                bg: 'bg-yellow-50',
                icon: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                border: 'border-yellow-200'
            },
            purple: {
                bg: 'bg-purple-50',
                icon: 'bg-gradient-to-r from-purple-500 to-purple-600',
                border: 'border-purple-200'
            }
        };
        return colors[color];
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="flex items-center">
                    <FaClock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity) => {
                    const activityColors = getActivityColors(activity.color);
                    return (
                        <div 
                            key={activity.id} 
                            className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                        >
                            <div className={`w-10 h-10 ${activityColors.icon} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                                <activity.icon className="h-5 w-5 text-white" />
                            </div>
                            
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                    {activity.message}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        by {activity.user}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {activity.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* View All Button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    View All Activities →
                </button>
            </div>
        </div>
    )
}

export default RecentActivity
