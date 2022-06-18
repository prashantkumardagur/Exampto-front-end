import React, { useEffect, useState, useCallback } from "react";

import Model from "../components/ui/overlay/Model";
import AlertBox from "../components/ui/overlay/AlertBox";

import changeMode from "../lib/changeMode";



const AppContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  setModel: () => {},
  setAlert: () => {},
});

export default AppContext;




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



  // Function to hide the model
  const hideModel = useCallback( () => {
    setModel(false);
  } , []);


  // Function to show alert and hide it after some time
  const showAlert = (text) => {
    setAlert({text, show: true});
    setTimeout(() => { setAlert({text, show: false}); }, 4000);
  }



  return (
    <AppContext.Provider value={{darkMode: false, toggleDarkMode, setModel, setAlert, hideModel, showAlert}}>
      { model &&
        <Model content={model} onContinue={model.onContinue || hideModel } onCancel={model.onCancel || hideModel } />
      }
      {
        <AlertBox text={alert.text} style={ alert.show ? {bottom: '20px'} : {bottom: '-60px'}} />
      }
      {props.children}
    </AppContext.Provider>
  );
}
