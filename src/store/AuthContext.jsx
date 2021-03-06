import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { refreshTokenAPI, loginAPI } from "../api/auth";


// AuthContext definition
const AuthContext = React.createContext({
  isLoggedIn: false,
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
      return 'Login Successful';
    } else {
      return response.message;
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

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}