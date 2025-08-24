import React, { useState } from 'react'
import { FaCalendarAlt, FaPlus, FaCheck, FaTimes, FaSearch, FaClock, FaUser } from 'react-icons/fa'

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [leaveRequests] = useState([
    {
      id: 1,
      employeeName: 'John Smith',
      employeeEmail: 'john.smith@company.com',
      leaveType: 'Annual Leave',
      startDate: '2024-09-01',
      endDate: '2024-09-05',
      days: 5,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: '2024-08-15'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@company.com',
      leaveType: 'Sick Leave',
      startDate: '2024-08-25',
      endDate: '2024-08-27',
      days: 3,
      reason: 'Medical appointment',
      status: 'Approved',
      appliedDate: '2024-08-20'
    },
    {
      id: 3,
      employeeName: 'Mike Chen',
      employeeEmail: 'mike.chen@company.com',
      leaveType: 'Personal Leave',
      startDate: '2024-09-10',
      endDate: '2024-09-12',
      days: 3,
      reason: 'Personal matters',
      status: 'Rejected',
      appliedDate: '2024-08-18'
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeEmail: 'emily.davis@company.com',
      leaveType: 'Annual Leave',
      startDate: '2024-09-15',
      endDate: '2024-09-20',
      days: 6,
      reason: 'Wedding celebration',
      status: 'Pending',
      appliedDate: '2024-08-22'
    }
  ])

  const filteredLeaves = leaveRequests.filter(leave => {
    const matchesSearch = leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || leave.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLeaveTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'annual leave':
        return 'bg-blue-100 text-blue-800'
      case 'sick leave':
        return 'bg-red-100 text-red-800'
      case 'personal leave':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApprove = (id) => {
    console.log('Approve leave request:', id)
    // Implementation for approving leave
  }

  const handleReject = (id) => {
    console.log('Reject leave request:', id)
    // Implementation for rejecting leave
  }

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(leave => leave.status === 'Pending').length,
    approved: leaveRequests.filter(leave => leave.status === 'Approved').length,
    rejected: leaveRequests.filter(leave => leave.status === 'Rejected').length
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
              <FaCalendarAlt className="mr-3 text-green-600" />
              Leave Management
            </h1>
            <p className="text-gray-600 mt-2">Track and manage employee leave requests</p>
          </div>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <FaPlus className="mr-2" />
            New Leave Policy
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-blue-100">
              <FaCalendarAlt className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-yellow-100">
              <FaClock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-green-100">
              <FaCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-red-100">
              <FaTimes className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by employee name or leave type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Leave Requests</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                        <FaUser className="text-white h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                        <div className="text-sm text-gray-500">Applied: {leave.appliedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(leave.leaveType)}`}>
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{leave.startDate} to {leave.endDate}</div>
                    <div className="text-sm text-gray-500">{leave.days} day(s)</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{leave.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {leave.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(leave.id)}
                          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <FaCheck className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleReject(leave.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    {leave.status !== 'Pending' && (
                      <span className="text-gray-400">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredLeaves.length === 0 && (
        <div className="text-center py-12">
          <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No leave requests have been submitted yet.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default LeaveManagement
