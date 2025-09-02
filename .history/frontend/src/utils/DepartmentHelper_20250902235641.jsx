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

const DepartmentButton =