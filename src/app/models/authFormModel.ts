export const initialFormData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    states: '',
    zipcode: '',
    ssn: '',
    email: '',
    password: ''
  };


export interface AuthPageProps {
  isLogin: boolean;
}

export interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
  