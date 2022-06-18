import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import ExamDetails from "../../components/dashboard/ExamDetails";
import ExamInstructions from "../../components/dashboard/ExamInstructions";
import DataBox from "../../components/ui/DataBox";
import { getExamAPI } from "../../api/coordinator";
import AuthContext from "../../store/AuthContext";

import { declareResultsAPI } from "../../api/coordinator";

const ViewExamPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [exam, setExam] = useState(null);

  useEffect(() => {
    const getExam = async () => {
      const response = await getExamAPI(token, id);
      if(response.status !== "success") { console.log(response.message); return; }
      setExam(response.data);
    }

    getExam();
  }, [id, token]);



  const declareResults = async () => {
    const response = await declareResultsAPI(token, id);
    if(response.status !== "success") { console.log(response.message); return; }

    setExam((prevState) => {
      return {
        ...prevState,
        meta: {
          ...prevState.meta,
          resultsDeclared: true,
          resultsDeclaredOn: Date.now()
        }
      }
    })

  }



  let sideBtns = '';
  if(exam){
    if(exam.startTime > Date.now()) sideBtns = <DataBox icon='check_circle' content='Exam published' size='large' />;
    else if(exam.lastStartTime + exam.duration * 60 * 1000 > Date.now()) sideBtns = <DataBox icon='album' content='Exam in progress' size='large' />;
    else if(exam.meta.resultDeclared) sideBtns = <DataBox icon='check_circle' content='Results declared' size='large' />;
    else sideBtns = <button className='btn primary' onClick={declareResults}>Declare Results</button>;
  }

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