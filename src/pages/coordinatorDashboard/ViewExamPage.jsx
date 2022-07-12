import { useEffect, useContext, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import ExamDetails from "../../components/dashboard/ExamDetails";
import ExamInstructions from "../../components/dashboard/ExamInstructions";
import DataBox from "../../components/ui/DataBox";

import { getExamAPI, declareResultsAPI } from "../../api/coordinator";
import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";




const ViewExamPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { setModel } = useContext(AppContext);

  const [exam, setExam] = useState(null);
  const [sideBtns, setSideBtns] = useState('');



  // effect to get the exam details
  useEffect(() => {
    const getExam = async () => {
      const response = await getExamAPI(token, id);
      if(response.status !== "success") { console.log(response.message); return; }
      setExam(response.data);
    }

    getExam();
  }, [id, token]);



  // declare the results of the exam
  const declareResults = useCallback( async () => {
    const response = await declareResultsAPI(token, id);
    if(response.status !== "success") { console.log(response.message); return; }

    setExam((prevState) => {
      return {
        ...prevState,
        meta: {
          ...prevState.meta,
          resultDeclared: true,
          resultDeclaredOn: Date.now()
        }
    } }) 

  }, [id, token]);

  // Handler to declare the results of the exam button
  const declareResultsHandler = useCallback( () => {
    setModel({
      heading: "Declare Results?",
      text: "Are you sure you want to declare the results of this exam?",
      onContinue: declareResults
    });
  }, [setModel, declareResults] )




  // Effect to set the side buttons
  useEffect(() => {
    if(!exam) return;

    if(exam.startTime > Date.now()) 
        setSideBtns(<DataBox icon='check_circle' content='Exam published' size='large' />);

    else if(exam.lastStartTime + exam.duration * 60 * 1000 > Date.now())
        setSideBtns(<DataBox icon='album' content='Exam in progress' size='large' />);

    else if(exam.meta.resultDeclared)
        setSideBtns(<DataBox icon='check_circle' content='Results declared' size='large' />);

    else setSideBtns(<button className="btn primary large" onClick={declareResultsHandler}>Declare Results</button>);
  }, [exam, declareResultsHandler]);




  return (<>
    <ExamDetails exam={exam} sideBtns={sideBtns} />
    <ExamInstructions>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt magnam quasi nihil! Repudiandae omnis 
        impedit iure facilis voluptatibus quod ea, error excepturi. Consectetur aliquam ratione quam, veniam error 
        provident ipsa esse, neque voluptatum pariatur magnam sed quibusdam ab iure eligendi ea excepturi atque? Expedita 
        amet delectus, tempore voluptatibus qui error?</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, deleniti?</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos quod doloribus laborum praesentium 
        explicabo dolorem fugiat? Quos, ad esse?</li>
      <li>This is an instruction.</li>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. At laboriosam ea dolores quos cupiditate natus in. 
        Aperiam magni architecto quis assumenda inventore a, iusto tempora?</li>
    </ExamInstructions>
  </>);
}

export default ViewExamPage;