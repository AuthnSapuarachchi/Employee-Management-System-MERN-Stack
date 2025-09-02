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
    name: 'Actions',
    selector: (row) => row.action
}

]

const DepartmentButtons =() => {
    return (
        <div className="flex space-x-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
    )
}