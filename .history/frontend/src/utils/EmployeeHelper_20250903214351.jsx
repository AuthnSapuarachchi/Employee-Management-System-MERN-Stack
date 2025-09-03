export const fetchDepartments = async () => {
    try {
        const 

    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error);
    }
}
};