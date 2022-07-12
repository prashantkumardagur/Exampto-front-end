import { useEffect, useState, useContext } from "react";

import Section from "../../components/dashboard/Section";

import AuthContext from "../../store/AuthContext";
import { getAllExamsAPI } from "../../api/coordinator";
import ExamList from "../../components/dashboard/ExamList";




const MyTestSection = () => {
  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState({ 
    publishedExams: [],
    completedExams: [],
    underwayExams: []
   });


  // Effect to get all exams of the coordinator
  useEffect(() => {
    const getAllExams = async () => {
      const response = await getAllExamsAPI(token);
      if (response.status !== 'success') {console.log(response.message); return};

      let allExams = response.data;
      let published =[], underway = [], completed = [];

      allExams.forEach(exam => {
        if ( exam.startTime > Date.now() ) published.push(exam);
        else if ( exam.meta.resultDeclared ) completed.push(exam);
        else underway.push(exam);
      });

      setExams({ 
        publishedExams: published, 
        completedExams: completed, 
        underwayExams: underway 
      });
      setLoading(false);     
    }

    getAllExams();
  }, [token]);


  

  return (<>
    <Section heading="Exams published" >
      <ExamList list={exams.publishedExams} linkTo={'/coordinator/viewexam/'} loading={loading} />
    </Section>
    <Section heading="Exams underway" >
      <ExamList list={exams.underwayExams} linkTo={'/coordinator/viewexam/'} loading={loading} />
    </Section>
    <Section heading="Exams completed" >
      <ExamList list={exams.completedExams} linkTo={'/coordinator/viewexam/'} loading={loading} />
    </Section>
  </>);
}

export default MyTestSection;