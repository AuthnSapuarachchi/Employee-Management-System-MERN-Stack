import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const userContext = createContext();

const authContext = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/verify", {
                    
                })
                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                if (error.response && !error.data.error ) {
                    navigate('/login');
                }
            }
        }
        verifyUser();
    }, [])

    const login = (user) => {
        setUser(user);
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token on logout
    }

  return (
    <userContext.Provider value={{ user, login, logout }}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext);

export default authContext
