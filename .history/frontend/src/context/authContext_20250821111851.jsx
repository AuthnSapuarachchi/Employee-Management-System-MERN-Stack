import React, { useState } from 'react'

const userContext = React.createContext();
const authContext = () => {
    const [user, setUser] = useState(null);

    const login = () => {

    }
    const logout = () => {
        setUser(null);
    }

  return (
    <div>
      
    </div>
  )
}

export default authContext
