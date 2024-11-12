// src/services/authService.ts
import axios from 'axios';


const API_URL = 'http://localhost:3003/auth';

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || 'Error registering user');
  }
};

export const loginUser = async (loginData: any) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};
