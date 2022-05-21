import React, { useEffect, useState } from "react";

import changeMode from "../lib/changeMode";

const AppContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const AppContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if(storedDarkMode === 'true'){
      changeMode(true);
      setDarkMode(true);
    }

  }, [])

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    changeMode(!darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <AppContext.Provider value={{darkMode: false, toggleDarkMode}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;