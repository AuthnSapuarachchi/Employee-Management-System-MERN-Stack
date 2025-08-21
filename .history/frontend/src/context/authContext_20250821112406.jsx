import React, { Children, createContext, useContext, useState } from 'react'

const userContext = createContext();

const authContext = ({Children}) => {
    const [user, setUser] = useState(null);

    const login = () => {

    }
    const logout = () => {
        setUser(null);
    }

  return (
    <userContext.Provider value={{ user, login, logout }}>
        {Children}
    </userContext.Provider>
  )
}

const useAuth = () => useContext(userContext);

export default authContext
