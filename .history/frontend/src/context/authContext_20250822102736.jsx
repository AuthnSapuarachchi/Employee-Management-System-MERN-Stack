import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const userContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get("http://localhost:5000/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console
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
