export const initialFormData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
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
  