import React, { useState } from 'react'
import { FaBuilding, FaPlus, FaEdit, FaTrash, FaUsers, FaSearch } from 'react-icons/fa'
import DepartmentCard from './DepartmentCard.jsx'
import AddDepartmentModal from './AddDepartmentModal.jsx'

const DepartmentList = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [departments, setDepartments] = useState([
        {
            id: 1,
            name: 'Human Resources',
            description: 'Manages employee relations, recruitment, and company policies',
            manager: 'Sarah Johnson',
            employeeCount: 15,
            budget: '$250,000',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Information Technology',
            description: 'Handles all technology infrastructure and software development',
            manager: 'Mike Chen',
            employeeCount: 25,
            budget: '$500,000',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Marketing',
            description: 'Responsible for brand promotion and customer engagement',
            manager: 'Emily Davis',
            employeeCount: 12,
            budget: '$180,000',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Finance',
            description: 'Manages company finances, budgets, and financial planning',
            manager: 'Robert Wilson',
            employeeCount: 8,
            budget: '$120,000',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Operations',
            description: 'Oversees daily business operations and process improvement',
            manager: 'Lisa Anderson',
            employeeCount: 20,
            budget: '$300,000',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Sales',
            description: 'Drives revenue growth through customer acquisition and retention',
            manager: 'David Brown',
            employeeCount: 18,
            budget: '$220,000',
            status: 'Active'
        }
    ])

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddDepartment = (newDept) => {
        const department = {
            id: departments.length + 1,
            ...newDept,
            status: 'Active'
        }
        setDepartments([...departments, department])
        setShowAddModal(false)
    }

    const handleDeleteDepartment = (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDepartments(departments.filter(dept => dept.id !== id))
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
                            <FaBuilding className="mr-3 text-blue-600" />
                            Departments
                        </h1>
                        <p className="text-gray-600 mt-2">Manage and organize your company departments</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <FaPlus className="mr-2" />
                        Add Department
                    </button>
                </div>
            </div>

            {/* Search and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Search Bar */}
                <div className="lg:col-span-2">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search departments or managers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-blue-100">
                            <FaBuilding className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-green-100">
                            <FaUsers className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Employees</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDepartments.map((department) => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
                        onDelete={handleDeleteDepartment}
                    />
                ))}
            </div>

            {/* No Results */}
            {filteredDepartments.length === 0 && (
                <div className="text-center py-12">
                    <FaBuilding className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
                    <p className="text-gray-600 mb-4">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first department.'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaPlus className="mr-2" />
                            Add Department
                        </button>
                    )}
                </div>
            )}

            {/* Add Department Modal */}
            {showAddModal && (
                <AddDepartmentModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddDepartment}
                />
            )}
        </div>
    )
}

export default DepartmentList
