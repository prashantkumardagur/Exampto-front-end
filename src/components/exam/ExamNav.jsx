import { useContext } from "react";

import ExamContext from "../../store/ExamPageContext";
import AppContext from "../../store/AppContext";




const ExamNav = (props) => {

  const { changeQuestion, currentQuestion, answers, flags, exam, submitExam } = useContext(ExamContext);
  const { setModel } = useContext(AppContext);

  let isMobile = window.innerWidth < 768;


  // Handles submit button click and shows confirmation modal
  const submitHandler = () => {
    setModel({
      heading: 'Submit Exam',
      text: 'Are you sure you want to submit the exam?',
      onContinue: submitExam
    })
  }


  

  return (   
    <nav className={`${props.navVisibility ? 'show' : ''} sideNav bg1 p-fixed pt-4 t-2 z-5`} onClick={isMobile ? props.toggleNav : null}>
      <h3 className="h5 px-3 pb-3">{exam.name}</h3>

      <div className="Qbtns d-flex flex-wrap align-start px-3 overflow-y-scroll">
        {flags.map((flag, i) => {
          return (
            <button 
              key={i} 
              className={`Qbtn ${i === currentQuestion ? 'active' : ''} ${flag === true ? 'flagged' : ''} ${answers[i] ? 'marked' : ''}`}
              onClick={() => changeQuestion(i)}
            >
              {i+1}
            </button>)
        })}
      </div>
      
      <button className="submitBtn p-absolute" onClick={submitHandler}>Submit Exam</button>
    </nav>
  );
}

export default ExamNav;