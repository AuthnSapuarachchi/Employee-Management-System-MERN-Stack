import { useNavigate } from 'react-router-dom';

export const columns = [
{
    name: 'S no',
    selector: (row) => row.sno,
},
{
    name: 'Department Name',
    selector: (row) => row.name,
},
{
    name: 'Description',
    selector: (row) => row.description,
},
{
    name: 'Actions',
    selector: (row) => row.action
}
]

export const DepartmentButtons = ({ department, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        if (onEdit) {
            onEdit(department._id);
        } else {
            navigate(`/admin-dashboard/edit-department/${department._id}`);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(department._id);
        } else {
            if (window.confirm('Are you sure you want to delete this department?')) {
                // Default delete logic would go here
                console.log('Delete department:', department._id);
            }
        }
    };

    return (
        <div className="flex justify-center space-x-2">
            <button 
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Edit Department"
            >
                Edit
            </button>
            <button 
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                title="Delete Department"
            >
                Delete
            </button>
        </div>
    );
};

// Helper function to transform department data for table display
export const transformDepartmentData = (departments, onEdit, onDelete) => {
    return departments.map((department, index) => ({
        sno: index + 1,
        name: department.name,
        description: department.description,
        action: <DepartmentButtons 
            department={department} 
            onEdit={onEdit}
            onDelete={onDelete}
        />
    }));
};