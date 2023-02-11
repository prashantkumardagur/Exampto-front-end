import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlobalLoader from "../components/ui/GlobalLoader";

import { refreshTokenAPI, loginAPI } from "../api/auth";


// AuthContext definition
const AuthContext = React.createContext({
  isLoggedIn: false,
  token: '',
  person: {},
  updatePerson: () => {},
  role: '',
  login: () => {},
  logout: () => {},
});

export default AuthContext;



// AuthContext provider component
export const AuthContextProvider = (props) => {

  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  // Effect to refresh the token on mount
  useEffect(() => {

    const getLoginData = async () => {
      const token = localStorage.getItem('token');
      const person = localStorage.getItem('person');
      const expiry = localStorage.getItem('expiry');
      if (expiry && expiry < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('person');
        localStorage.removeItem('expiry');
        setIsLoading(false);
        return;
      }
      if (token && person) {
        setPerson(JSON.parse(person));
        let response = await refreshTokenAPI(token);
        if (response.status === 'success') {
          let newToken = response.data;
          setToken(newToken);
          localStorage.setItem('token', newToken);
          localStorage.setItem('expiry', Date.now() + 3600000 * 12);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('person');
          localStorage.removeItem('expiry');
        }
      }

      
      setIsLoading(false);

    }

    getLoginData();

  }, []);


  // Function to update person on profile update
  const updatePerson = (data) => {
    setPerson((prev) => ({...prev, name: data.name, gender: data.gender, phone: data.phone}));
  }



  // Function to login
  const login = async (credentials) => {
    let response = await loginAPI(credentials);
    if(response.status === 'success'){
      response = response.data;
      localStorage.setItem('token', response.token);
      localStorage.setItem('person', JSON.stringify(response.person));
      localStorage.setItem('expiry', Date.now() + 3600000 * 12);
      setToken(response.token);
      setPerson(response.person);
      return {message: 'Login Successful', role: response.person.role};
    } else {
      return {message: response.message, role: ''};
    }
  }

  // Function to logout
  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('person');
    localStorage.removeItem('expiry');
    setToken(null);
    setPerson({});
    navigate('/');
  }




  // AuthContext provider value
  const authContextValue = {
    isLoggedIn: !!token,
    token,
    person,
    updatePerson,
    role: person.role,
    login,
    logout,
  }

  if(isLoading) return <GlobalLoader />;

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}