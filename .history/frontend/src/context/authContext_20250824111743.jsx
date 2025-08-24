import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userContext } from './userContext.js';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Handle demo token
                    if (token === 'demo-token') {
                        const demoUser = JSON.parse(localStorage.getItem('demo-user') || 'null');
                        if (demoUser) {
                            setUser(demoUser);
                        } else {
                            localStorage.removeItem('token');
                            setUser(null);
                        }
                        setLoading(false);
                        return;
                    }
                    
                    // Only try to verify with backend if it's not a demo token
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 5000);
                        
                        const response = await axios.get("http://localhost:5000/api/auth/verify", {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            signal: controller.signal
                        });
                        
                        clearTimeout(timeoutId);
                        
                        if (response.data.success) {
                            setUser(response.data.user);
                        } else {
                            setUser(null);
                            localStorage.removeItem('token');
                        }
                    } catch (networkError) {
                        if (networkError.name === 'AbortError') {
                            console.warn('Backend verification timeout');
                        } else {
                            console.warn('Backend not available:', networkError.message);
                        }
                        setUser(null);
                        localStorage.removeItem('token');
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth verification error:', error);
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        
        // Add a small delay to prevent immediate execution issues
        const timer = setTimeout(verifyUser, 100);
        return () => clearTimeout(timer);
    }, []);

    const login = (user) => {
        setUser(user);
        // Store demo user data for persistence
        if (localStorage.getItem('token') === 'demo-token') {
            localStorage.setItem('demo-user', JSON.stringify(user));
        }
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('demo-user');
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export default AuthProvider;
