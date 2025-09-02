import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
import Datatable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';

const DepartmentList = (req, ) => {

  const [departments, setDepartments] = React.useState([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/departments', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => (
          {
            id: dep._id,
            sno: sno++,
            name: dep.name,
            action: (<DepartmentButtons />)

          }
        ));
          setDepartments(data.departments);
          console.log(data.departments);
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)      
      }
    } finally {
        setLoading(false);
      }
    };

    fetchDepartments();

  }, []);


  return (

    <>{loading ? <div>Loading ...</div> :

    <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content area on the right */}
      <div className="flex-1 ml-64 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Manage Department</h3>
        </div>
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder='Search by Dep Name' 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link 
            to="/admin-dashboard/add-department"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Department
          </Link>
        </div>
        
        {/* Department List Table */}
        <div>
          <Datatable
            columns={columns}
            data={departments || []}
          />
        </div>
        
      </div>
    </div>
  }</>
  )
}

export default DepartmentList
