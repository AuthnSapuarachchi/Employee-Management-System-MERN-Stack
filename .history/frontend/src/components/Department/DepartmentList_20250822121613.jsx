import React from 'react'
import {Link} from 'react-router-dom'

const DepartmentList = () => {
  return (
    <div>
      <div>
        <h3>Manage Department</h3>
      </div>
      <div>
        <input type="text" placeholder='search By Dep Name' />
        <Link to="/admin-dashboard/add-new-department"><button>Add New Department</button></Link>">
      </div>
    </div>
  )
}

export default DepartmentList
