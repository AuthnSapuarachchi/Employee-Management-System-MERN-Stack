import React, { co useState } from 'react'

const userContext = createContext();
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
