import axios from 'axios';
import config from "../../../config";

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${config.API_URL}/auth/register`, userData);
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || 'Error registering user');
  }
};

export const loginUser = async (loginData: any) => {
  try {
    const response = await axios.post(`${config.API_URL}/auth/login`, loginData);
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};
