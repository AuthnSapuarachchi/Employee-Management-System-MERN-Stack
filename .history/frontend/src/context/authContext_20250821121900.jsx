import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext();

const authContext = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/verify")
                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                if (error.response && !error )
            }
    }, [] )

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
