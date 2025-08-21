import React, { Children, createContext, useState } from 'react'

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

const useAuth = () => use

export default authContext
