import React, { useEffect, useState, useCallback } from "react";

import Model from "../components/ui/overlay/Model";
import AlertBox from "../components/ui/overlay/AlertBox";

import changeMode from "../lib/changeMode";


// AppContext definition
const AppContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  setModel: () => {},
  showAlert: () => {},
});

export default AppContext;



// AppContext provider component
export const AppContextProvider = (props) => {

  const [darkMode, setDarkMode] = useState(false);
  const [model, setModel] = useState(false);
  const [alert, setAlert] = useState(false);



  // Effect to change the color mode on mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if(storedDarkMode === 'true'){
      changeMode(true);
      setDarkMode(true);
    }

  }, []);

  // Function to toggle the color mode
  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    changeMode(!darkMode);
    setDarkMode(!darkMode);
  }



  
  // Handles Model Cancel action
  const handleCancel = useCallback( () => {
    if(model.onCancel) model.onCancel();
    setModel(false);
  } , [model]);

  // Handles Model Action
  const handleContinue = useCallback(() => {
    if(model.onContinue) model.onContinue();
    setModel(false);
  }, [model]);



  // Function to show alert and hide it after some time
  const showAlert = (text, type="success") => {
    setAlert({text, show: true, type});
    let alertTimeout = setTimeout(() => { setAlert({text, show: false, type:"success"}); }, 4000);

    return () => {
      clearTimeout(alertTimeout);
      setAlert({text, show: false, type:"success"});
    }
  }



  // Return the context provider
  return (
    <AppContext.Provider value={{darkMode: false, toggleDarkMode, setModel, showAlert}}>
      { model &&
        <Model content={model} onContinue={ handleContinue } onCancel={ handleCancel } />
      }
      {
        <AlertBox text={alert.text} type={alert.type} style={ alert.show ? {bottom: '20px'} : {bottom: '-60px'}} />
      }
      {props.children}
    </AppContext.Provider>
  );
}
