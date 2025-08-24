import React, { useState } from 'react'
import { FaTimes, FaBuilding, FaUser, FaDollarSign, FaFileAlt } from 'react-icons/fa'

const AddDepartmentModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manager: '',
        budget: '',
        employeeCount: 0
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'employeeCount' ? parseInt(value) || 0 : value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Department name is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (!formData.manager.trim()) {
            newErrors.manager = 'Manager name is required'
        }

        if (!formData.budget.trim()) {
            newErrors.budget = 'Budget is required'
        }

        if (formData.employeeCount < 0) {
            newErrors.employeeCount = 'Employee count cannot be negative'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            onAdd(formData)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FaBuilding className="h-6 w-6 text-white mr-3" />
                            <h2 className="text-xl font-bold text-white">Add New Department</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <FaTimes className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Department Name */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaBuilding className="h-4 w-4 mr-2 text-gray-500" />
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter department name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaFileText className="h-4 w-4 mr-2 text-gray-500" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter department description"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Manager */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaUser className="h-4 w-4 mr-2 text-gray-500" />
                            Manager
                        </label>
                        <input
                            type="text"
                            name="manager"
                            value={formData.manager}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                errors.manager ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter manager name"
                        />
                        {errors.manager && (
                            <p className="mt-1 text-sm text-red-600">{errors.manager}</p>
                        )}
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaDollarSign className="h-4 w-4 mr-2 text-gray-500" />
                            Budget
                        </label>
                        <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                errors.budget ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., $100,000"
                        />
                        {errors.budget && (
                            <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                        )}
                    </div>

                    {/* Employee Count */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FaUser className="h-4 w-4 mr-2 text-gray-500" />
                            Initial Employee Count
                        </label>
                        <input
                            type="number"
                            name="employeeCount"
                            value={formData.employeeCount}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                errors.employeeCount ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="0"
                        />
                        {errors.employeeCount && (
                            <p className="mt-1 text-sm text-red-600">{errors.employeeCount}</p>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                        >
                            Add Department
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDepartmentModal
