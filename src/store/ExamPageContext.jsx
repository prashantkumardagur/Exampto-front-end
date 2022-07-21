import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import GlobalLoader from "../components/ui/GlobalLoader";

import AuthContext from "./AuthContext";
import AppContext from "./AppContext";
import { initializeExamAPI, markAnswerAPI, submitExamAPI, countDisconnectionAPI } from "../api/exam";


// EditorContext definition
const ExamContext = React.createContext({
  exam : {},
  examType : '',
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
  const { showAlert, setModel } = useContext(AppContext);


  const [isLoading, setIsLoading] = useState(true);

  const [exam, setExam] = useState({});
  const [examType, setExamType] = useState('Live');
  const [disconnections, setDisconnections] = useState(0);
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

      const { exam, responses, startedOn, resultId, resultExamType } = response.data;
      setExam(exam);
      setExamType(resultExamType);
      setAnswers(responses);
      setResultId(resultId);
      setFlags(new Array(exam.contents.length).fill(false));
      setInitialRemainingTime( parseInt(exam.duration * 60 - (Date.now() - startedOn) / 1000) );

      setIsLoading(false);
    }

    initializeExam();

  }, [id, token, navigate]);





  // Submits exam
  const submitExam = useCallback(async () => {
    const response = await submitExamAPI(token, resultId);
    if(response.status !== 'success') { console.log(response.message); return; }

    navigate('/user/exams');
  }, [token, resultId, navigate]);


  // Handles window blur event
  const handleWindowBlur = useCallback(async () => {
    if(!token) return;
    if(!resultId) return;

    const response = await countDisconnectionAPI(token, resultId);
    setDisconnections(response.data);
    console.log(response.message);

  }, [resultId, token]);

  // Handles window focus event
  const handleWindowFocus = useCallback(() => {
    if(disconnections < 4){
      showAlert("Disconnection counted. Please do not change tab or minimize window. Otherwise, exam will be terminated.");
    } else if(disconnections < 6){
      setModel({
        heading: "Disconnection limit reached",
        text: "You have reached the disconnection limit. Please do not change tab or minimize window. Otherwise, exam will be terminated.",
      })
    } else {
      submitExam();
    }
  }, [showAlert, submitExam, disconnections, setModel]);



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



  
  if(isLoading) return <GlobalLoader />;

  return (
    <ExamContext.Provider 
            value={{ 
              exam,
              examType,
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