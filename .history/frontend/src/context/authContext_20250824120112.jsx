import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userContext } from './userContext.js';

const AuthProvider = ({children}) => {
    console.log("AuthProvider: Initializing...");
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AuthProvider: useEffect triggered");
        
        const verifyUser = async () => {
            console.log("AuthProvider: Starting user verification...");
            
            try {
                const token = localStorage.getItem('token');
                console.log("AuthProvider: Found token:", token ? 'YES' : 'NO');
                
                if (token) {
                    // Handle demo token
                    if (token === 'demo-token') {
                        console.log("AuthProvider: Processing demo token");
                        const demoUser = JSON.parse(localStorage.getItem('demo-user') || 'null');
                        if (demoUser) {
                            console.log("AuthProvider: Demo user found:", demoUser);
                            setUser(demoUser);
                        } else {
                            console.log("AuthProvider: No demo user found, clearing token");
                            localStorage.removeItem('token');
                            setUser(null);
                        }
                        setLoading(false);
                        return;
                    }
                    
                    // Only try to verify with backend if it's not a demo token
                    try {
                        console.log("AuthProvider: Attempting backend verification...");
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
                            console.log("AuthProvider: Backend verification successful");
                            setUser(response.data.user);
                        } else {
                            console.log("AuthProvider: Backend verification failed");
                            setUser(null);
                            localStorage.removeItem('token');
                        }
                    } catch (networkError) {
                        if (networkError.name === 'AbortError') {
                            console.warn('AuthProvider: Backend verification timeout');
                        } else {
                            console.warn('AuthProvider: Backend not available:', networkError.message);
                        }
                        setUser(null);
                        localStorage.removeItem('token');
                    }
                } else {
                    console.log("AuthProvider: No token found");
                    setUser(null);
                }
            } catch (error) {
                console.error('AuthProvider: Verification error:', error);
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                console.log("AuthProvider: Verification complete, setting loading to false");
                setLoading(false);
            }
        };
        
        // Add a small delay to prevent immediate execution issues
        const timer = setTimeout(verifyUser, 100);
        return () => clearTimeout(timer);
    }, []);

    const login = (user) => {
        console.log("AuthProvider: Login called with user:", user);
        setUser(user);
        // Store demo user data for persistence
        if (localStorage.getItem('token') === 'demo-token') {
            localStorage.setItem('demo-user', JSON.stringify(user));
        }
    };
    
    const logout = () => {
        console.log("AuthProvider: Logout called");
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('demo-user');
    };

    console.log("AuthProvider: Rendering with state:", { user, loading });

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

export default AuthProvider;
