export const fetchDepartments = async () => {
    try {

    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error);
    }
}