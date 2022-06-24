import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import GlobalLoader from "../components/ui/GlobalLoader";

import AuthContext from "./AuthContext";
import AppContext from "./AppContext";
import { initializeExamAPI, markAnswerAPI, submitExamAPI, countDisconnectionAPI } from "../api/exam";


// EditorContext definition
const ExamContext = React.createContext({
  exam : {},
  token : null,
  resultId : null,
  currentQuestion : 0,
  changeQuestion : () => {},
  answers : [],
  markAnswer : () => {},
  flags : [],
  toggleFlag : () => {},
  initialRemainingTime : 300,
  submitExam : () => {},
});

export default ExamContext;



// EditorContext provider component
export const ExamContextProvider = (props) => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);


  const [isLoading, setIsLoading] = useState(true);

  const [exam, setExam] = useState({});
  const [answers, setAnswers] = useState([]);
  const [flags, setFlags] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [resultId, setResultId] = useState(null);
  const [initialRemainingTime, setInitialRemainingTime] = useState(300);



  // Effect to initialize exam
  useEffect(() => {
    if(!token) return;

    const initializeExam = async () => {
      let response = await initializeExamAPI(token, id);
      if(response.status !== 'success') { console.log(response.message); navigate('/user/exams'); return; }

      const { exam, responses, startedOn, resultId } = response.data;
      setExam(exam);
      setAnswers(responses);
      setResultId(resultId);
      setFlags(new Array(exam.contents.length).fill(false));
      setInitialRemainingTime( parseInt(exam.duration * 60 - (Date.now() - startedOn) / 1000) );

      setIsLoading(false);
    }

    initializeExam();

  }, [id, token, navigate]);




  // Handles window blur event
  const handleWindowBlur = useCallback(async () => {
    if(!token) return;
    if(!resultId) return;

    const response = await countDisconnectionAPI(token, resultId);
    console.log(response.message);

  }, [resultId, token]);

  // Handles window focus event
  const handleWindowFocus = useCallback(() => {
    console.log("Window focus event");
    showAlert("Disconnection counted. Please do not change tab or minimize window. Otherwise, exam will be terminated.");
  }, [showAlert]);


  // Effect to hide navbar on mobile or small screens
  useEffect(() => {
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);


    // Cleanup
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    }
  }, [handleWindowBlur, handleWindowFocus]);





  // Marks an answer
  const markAnswer = async (n) => {
    const response = await markAnswerAPI(token, resultId, currentQuestion, n);
    if(response.status !== 'success') { console.log(response.message); return; }

    let newAnswers = [...answers];
    newAnswers[currentQuestion] = n;
    setAnswers(newAnswers);
  }


  // toggle flag
  const toggleFlag = () => {
    const newFlags = [...flags];
    newFlags[currentQuestion] = !newFlags[currentQuestion];
    setFlags(newFlags);
  }


  // Changes current question
  const changeQuestion = (n) => {
    if(n < 0 || n >= flags.length) return;
    setCurrentQuestion(n);
  }


  // Submits exam
  const submitExam = async () => {
    const response = await submitExamAPI(token, resultId);
    if(response.status !== 'success') { console.log(response.message); return; }

    navigate('/user/exams');
  }



  
  if(isLoading) return <GlobalLoader />;

  return (
    <ExamContext.Provider 
            value={{ 
              exam,
              token,
              resultId,
              currentQuestion,
              changeQuestion,
              answers,
              markAnswer,
              flags,
              toggleFlag,
              initialRemainingTime,
              submitExam,
            }}>
      { props.children }
    </ExamContext.Provider>
  )
}