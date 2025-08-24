import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userContext = createContext();

const authContext = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                        navigate('/login');
                    }
                } else {
                    setUser(null);
                    navigate('/login');
                }
            } catch (error) {
                setUser(null);
                navigate('/login');
            }
        };
        verifyUser();
    }, [navigate]);

    const login = (user) => {
        setUser(user);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token on logout
    };

    return (
        <userContext.Provider value={{ user, login, logout }}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => useContext(userContext);

export default authContext
