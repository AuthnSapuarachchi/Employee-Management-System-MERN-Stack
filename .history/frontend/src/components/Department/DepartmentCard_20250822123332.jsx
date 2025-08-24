import React from 'react'
import { FaEdit, FaTrash, FaUser, FaDollarSign, FaUsers } from 'react-icons/fa'

const DepartmentCard = ({ department, onDelete }) => {
    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit department:', department.id)
    }

    const handleDelete = () => {
        onDelete(department.id)
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{department.name}</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                            title="Edit Department"
                        >
                            <FaEdit className="h-4 w-4 text-white" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 bg-white/20 rounded-lg hover:bg-red-500 transition-colors"
                            title="Delete Department"
                        >
                            <FaTrash className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {department.description}
                </p>

                {/* Department Info */}
                <div className="space-y-3">
                    <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <FaUser className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Manager</p>
                            <p className="font-semibold text-gray-900">{department.manager}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <FaUsers className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Employees</p>
                            <p className="font-semibold text-gray-900">{department.employeeCount}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                            <FaDollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Budget</p>
                            <p className="font-semibold text-gray-900">{department.budget}</p>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        department.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                            department.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        {department.status}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DepartmentCard
