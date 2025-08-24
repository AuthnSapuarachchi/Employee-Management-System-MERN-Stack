import React from 'react'
import DashboardHeader from './Dashboard/DashboardHeader.jsx'
import StatsCards from './Dashboard/StatsCards.jsx'
import QuickActions from './Dashboard/QuickActions.jsx'
import RecentActivity from './Dashboard/RecentActivity.jsx'

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <DashboardHeader />

            {/* Stats Cards */}
            <StatsCards />

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions />
                <RecentActivity />
            </div>
        </div>
    )
}

export default Dashboard
