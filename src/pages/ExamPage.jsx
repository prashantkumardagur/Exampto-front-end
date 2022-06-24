import { useCallback, useEffect, useState } from "react";
import './ExamPage.css';

import ExamHeader from "../components/exam/ExamHeader";
import ExamNav from "../components/exam/ExamNav";
import MainArea from "../components/exam/MainArea";

import { ExamContextProvider } from "../store/ExamPageContext";



const ExamPage = () => {

  const [navVisibility, setNavVisibility] = useState(true);

  const toggleNav = useCallback(() => { setNavVisibility(!navVisibility) }, [navVisibility]);




  // Effect to hide navbar on mobile or small screens
  useEffect(() => {
    if(window.innerWidth < 768) setNavVisibility(false);
  }, []);


  

  return (<ExamContextProvider>
    <ExamHeader toggleNav={toggleNav} />
    <ExamNav toggleNav={toggleNav} navVisibility={navVisibility} />
    <MainArea navVisibility={navVisibility} />
  </ExamContextProvider>);
}

export default ExamPage;