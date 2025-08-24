import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const userContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
/*************  ✨ Windsurf Command ⭐  *************/
        /**
         * Verifies the user by making a GET request to /api/auth/verify
         * If the response is successful, it sets the user to the user object
         * If the response is not successful, it sets the user to null and removes the token
         * If there is no token, it sets the user to null and sets loading to false
         */
/*******  94ac5a26-619b-4671-b0dd-dae1f0b8e49d  *******/
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get("http://localhost:5000/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                        localStorage.removeItem('token');
                    }
                } else {
                    setUser(null);
                    setLoading(false);
                }
            } catch {
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export default AuthProvider;
