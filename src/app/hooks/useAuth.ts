import { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (userData: any) => {
    try {
      const registeredUser = await registerUser(userData);
      setUser(registeredUser);
    } catch (err : any) {
      setError(err.message);
    }
  };

  const login = async (loginData: any) => {
    try {
      const loggedInUser = await loginUser(loginData);
      setUser(loggedInUser);
    } catch (err : any) {
      setError(err.message);
    }
  };

  return { user, error, register, login };
};
