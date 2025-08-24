import { useContext } from 'react';
import { userContext } from '../context/userContext.js';

export const useAuth = () => useContext(userContext);
