import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";

import ExamDetails from "../../components/dashboard/ExamDetails";
import ExamInstructions from "../../components/dashboard/ExamInstructions";
import DataBox from "../../components/ui/DataBox";
import Model from "../../components/ui/Model";
import ViewResults from "../../components/user/ViewResults";

import { getExamAPI, enrollAPI } from "../../api/user";
import AuthContext from "../../store/AuthContext";




const ViewExamPage = () => {

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [model, setModel] = useState(false);
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




  // Handle Enroll action
  const enrollHandler = () => {
    setModel({
      heading: "Enroll in Exam?",
      text: "Are you sure you want to enroll in this exam?",
      action: enrollInExam
    });
  }

  const enrollInExam = async () => {
    const response = await enrollAPI(token, id);
    if(response.status !== 'success') { console.log(response.message); return; }
    setIsEnrolled(true);
    setModel(false);
  }



  // Handle Start Exam action
  const startHandler = () => {
    setModel({
      heading: "Start Exam?",
      text: "Are you sure you want to start this exam?",
      action: startExam
    })
  }
  const startExam = () => { navigate(`/attemptexam/${id}`); }


  // Show results
  const showResults = () => {
    navigate('view-results');
  }



  // Effect to set side buttons
  useEffect(() => {
    if(!exam) return;
    let completed = <DataBox icon='check_circle' content='Exam Completed' size='large' />

    // If result exists (Student started this test previously)
    if(result){
      if(exam.meta.resultDeclared) 
        setSideBtns(<button className="btn primary large" onClick={showResults}>View Results</button>); 
      else if(result.meta.ended || exam.lastStartTime + exam.duration * 60 * 1000 < Date.now())
          setSideBtns(completed);
      else setSideBtns(<button className="btn primary large" onClick={startHandler}>Continue</button>);

    // If student is enrolled in this exam
    } else if(isEnrolled) {
      if(exam.startTime > Date.now()) setSideBtns(<DataBox icon='check_circle' content='Enrolled' size='large' />);
      else if(exam.lastStartTime + exam.duration * 60 * 1000 > Date.now()) 
          setSideBtns(<button className="btn primary large" onClick={startHandler}>Start Exam</button>);
      else setSideBtns(completed);

		// If student is not enrolled in this exam
    } else {
      if(exam.startTime > Date.now()) 
          setSideBtns(<button className="btn primary large" onClick={enrollHandler}>Enroll</button>);
      else setSideBtns(completed);
    }    

  }, [exam, result, isEnrolled]);


  

  return (<>
    {model && <Model content={model} onContinue={model.action} onCancel={() => {setModel(false)}} />}
    <ExamDetails exam={exam} sideBtns={sideBtns} />
    <Routes>
      <Route path="" element={<ExamInstructions />} />
      <Route path="view-results" element={<ViewResults />} />
    </Routes>
  </>);
}

export default ViewExamPage;