import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {},
  role: '',
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [role, setRole] = React.useState('');

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    setRole(user.role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({});
    setRole('');
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, user, role, login, logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;