import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  return (
    <div>
        <div>
        <h3>Manage Department</h3>
        </div>
        <div>
            <input type="text" placeholder='Search' />
            <Link to="/add-department">
        </div>
    </div>
  )
}

export default DepartmentList
