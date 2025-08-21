import React, { createContext, useContext, useState } from 'react'

const userContext = createContext();

const authContext = ({Children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

export const useAuth = () => useContext(userContext);

export default authContext
