export const fetchDepartments = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/departments', {

    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error);
    }
}
};