import { useEffect, useState } from "react";
import './ExamPage.css';

import ExamHeader from "../components/exam/ExamHeader";
import ExamNav from "../components/exam/ExamNav";

import DUMMY_DATA from "../lib/dummyExam";
import MainArea from "../components/exam/MainArea";

const ExamPage = () => {
  const [navVisibility, setNavVisibility] = useState(true);

  const [examData, setExamData] = useState(DUMMY_DATA);
  const [flags, setFlags] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // const totalQuestions = examData.contents.length;
  // const responses = new Array(totalQuestions).fill(0);

  const toggleNav = () => { setNavVisibility(!navVisibility) };

  useEffect(() => {
    if(window.innerWidth < 768) setNavVisibility(false);

    setExamData(DUMMY_DATA);
    setFlags(new Array(DUMMY_DATA.contents.length).fill(false));
    setAnswers(new Array(DUMMY_DATA.contents.length).fill(false));
  }, []);

  const selectAnswer = (n) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = n;
    setAnswers(newAnswers);
  }

  const clearResponse = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = 0;
    setAnswers(newAnswers);
  }

  const toggleFlag = () => {
    const newFlags = [...flags];
    newFlags[currentQuestion] = !newFlags[currentQuestion];
    setFlags(newFlags);
  }

  const changeQuestion = (n) => {
    if(n < 0 || n >= flags.length) return;
    setCurrentQuestion(n);
  }


  return (<>
    <ExamHeader toggleNav={toggleNav} />
    <ExamNav 
      toggleNav={toggleNav}
      navVisibility={navVisibility}
      flags={flags}
      current={currentQuestion}
      changeQuestion={changeQuestion}
      examName={examData.name}
      marked={answers}
    />
    <MainArea 
      navVisibility={navVisibility}
      content={examData.contents[currentQuestion]}
      current={currentQuestion}
      flag={flags[currentQuestion]}
      answer={answers[currentQuestion]}
      onAnswerSelect={selectAnswer}
      onClear={clearResponse}
      onFlag={toggleFlag}
      changeQuestion={changeQuestion}
    />
  </>);
}

export default ExamPage;