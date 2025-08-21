import React, { createContext, useState } from 'react'

const userContext = createContext();
const authContext = () => {
    const [user, setUser] = useState(null);

    const login = () => {

    }
    const logout = () => {
        setUser(null);
    }

  return (
    <userContext.Provider
  )
}

export default authContext
