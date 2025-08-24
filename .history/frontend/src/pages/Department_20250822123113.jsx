import React from 'react'
import DepartmentList from '../components/Department/DepartmentList.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'

const Department = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      <div className="ml-64 flex-1">
        <DepartmentList />
      </div>
    </div>
  )
}

export default Department
