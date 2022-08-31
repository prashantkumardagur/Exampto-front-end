import { useEffect, useContext, useState, useCallback } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";

import ExamDetails from "../../components/dashboard/ExamDetails";
import ExamInstructions from "../../components/dashboard/ExamInstructions";
import DataBox from "../../components/ui/DataBox";
import ViewResults from "../../components/user/ViewResults";

import { getExamAPI, enrollAPI } from "../../api/user";
import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";




const ViewExamPage = () => {

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { setModel, showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [exam, setExam] = useState(null);
  const [result, setResult] = useState(null);
  const [sideBtns, setSideBtns] = useState('');



  // Initialization
  useEffect(() => {
    const getExam = async () => {

      // Get Exam details
      const response = await getExamAPI(token, id);
      if(response.status !== 'success') {
        console.log(response.message);
        return;
      }

      // Set Exam details
      setIsEnrolled(response.data.isEnrolled);
      setExam(response.data.myExam);
      setResult(response.data.result);
    }

    getExam();
  }, [id, token]);




  const enrollInExam = useCallback( async () => {
    const response = await enrollAPI(token, id);
    if(response.status !== 'success') { showAlert(response.message); return; }
    setIsEnrolled(true);
  }, [id, token, showAlert]);
  // Handle Enroll action
  const enrollHandler = useCallback(() => {
    setModel({
      heading: "Enroll in Exam?",
      text: "Are you sure you want to enroll in this exam?",
      onContinue: enrollInExam
    });
  }, [setModel, enrollInExam]);



  
  const startExam = useCallback(() => { navigate(`/attemptexam/${id}`); }, [navigate, id]);
  // Handle Start Exam action
  const startHandler = useCallback(() => {
    setModel({
      heading: "Start Exam?",
      text: "Are you sure you want to start this exam?",
      onContinue: startExam
    })
  }, [setModel, startExam]);


  // Show results
  const showResults = useCallback( () => {
    navigate('view-results');
  }, [navigate]);



  // Effect to set side buttons
  useEffect(() => {
    if(!exam) return;
    let completed = <DataBox icon='check_circle' content='Exam Completed' size='large' />
    

    
    // If result exists
    if(result){
      if(!result.meta.ended && ( parseInt(result.meta.startedOn) + exam.duration * 60 * 1000 > Date.now()) )
        setSideBtns(<button className="btn primary large" onClick={startHandler}>Continue</button>);
      else if(exam.meta.resultDeclared) 
        setSideBtns(<button className="btn primary large" onClick={showResults}>View Results</button>);
      else setSideBtns(<DataBox icon='schedule' content='Results Pending' size='large' />);
    }
        // Check if user can continue ( show continue button )
        // Check if result is of type practice ( show results button )
        // Check if result is declared ( show results button )
        // Check if result is not declared ( show results pending )


    // If student is enrolled in this exam
    else if(isEnrolled){
      if(exam.startTime > Date.now()) setSideBtns(<DataBox icon='check_circle' content='Enrolled' size='large' />);
      else if(exam.lastStartTime > Date.now())
          setSideBtns(<button className="btn primary large" onClick={startHandler}>Start Exam</button>);
      else if(!exam.meta.resultDeclared)
          setSideBtns(<DataBox icon='schedule' content='Time exceeded' size='large' />)
      else if(exam.meta.availableForPractice)
          setSideBtns(<button className="btn primary large" onClick={startHandler}>Practice exam</button>)
      else setSideBtns(completed);
    }
        // Check if exam is not started ( show enrolled status )
        // Check if exam is started and not exceeded lastStartTime ( show start button )
        // Check if lastStartTime is exceeded and result is not declared ( Show time exceeded status )
        // Check if results are declared and is available for practice ( show practice test option )
        // Check if results are declared and is not available for practice ( show time exceed )


    // Not enrolled in this exam
    else {
      if(exam.startTime > Date.now())
        setSideBtns(<button className="btn primary large" onClick={enrollHandler}>Enroll</button>);
      else if(!exam.meta.resultDeclared)
        setSideBtns(<DataBox icon='schedule' content="Can't enroll anymore" size='large' />)
      else if(exam.meta.availableForPractice)
        setSideBtns(<button className="btn primary large" onClick={startHandler}>Practice exam</button>)
      else setSideBtns(completed);
    }
        // Check if exam is started ( if not show enroll button )
        // If exam is started and results are not declared ( show Can't Enroll status)
        // If results are declared and is available for practice ( show practice exam button )
        // If results are declared and is not available for practice ( show can't enroll status )


  }, [exam, result, isEnrolled, showResults, startHandler, enrollHandler]);


  

  return (<>
    <ExamDetails exam={exam} sideBtns={sideBtns} />
    <Routes>
      <Route path="" element={<ExamInstructions type='user' />} />
      <Route path="view-results" element={<ViewResults />} />
    </Routes>
  </>);
}

export default ViewExamPage;