import 

const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/departments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setDepartments(response.data.departments);
        setError('');
      } else {
        setError('Failed to fetch departments');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      if (error.response?.status === 401) {
        setError('Please login to view departments');
      } else {
        setError('Failed to fetch departments. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };