import { useContext } from 'react';
import { userContext } from '../context/authContext.jsx';

export const useAuth = () => useContext(userContext);
