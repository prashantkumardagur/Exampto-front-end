import { useContext, useState, useEffect } from "react";

import ExamList from "../../components/dashboard/ExamList";
import Section from "../../components/dashboard/Section";

import AuthContext from "../../store/AuthContext";
import { getExamsAPI } from "../../api/user";




const ExamSection = () => {
  const { token } = useContext(AuthContext);

  const [exams, setExams] = useState({
    upcomingExams: [],
    availableExams: [],
    completedExams: [],
  })



  // Effect to get exams
  useEffect(() => {
    const getUserExams = async () => {
      const response = await getExamsAPI(token);
      if(response.status !== 'success') { console.log(response.message); return; }

      let { enrolledExams, availableExams } = response.data;
      availableExams = availableExams.filter(exam => !enrolledExams.some(enrolledExam => enrolledExam._id === exam._id));
      let upcomingExams = enrolledExams.filter(exam => exam.lastStartTime + exam.duration * 60 * 1000 > Date.now());
      let completedExams = enrolledExams.filter(exam => exam.lastStartTime + exam.duration * 60 * 1000 < Date.now());

      setExams({
        upcomingExams,
        availableExams,
        completedExams
      });
    }

    getUserExams();
  }, [token])


  

  return (<>
    <Section heading="Exams you are enrolled in" >
      <ExamList list={exams.upcomingExams} linkTo={'/user/viewexam/'} />
    </Section>
    <Section heading="Mock Exams Available" >
      <ExamList list={exams.availableExams} linkTo={'/user/viewexam/'} />
    </Section>
    <Section heading="Completed Exams" >
      <ExamList list={exams.completedExams} linkTo={'/user/viewexam/'} />
    </Section>
  </>);
}

export default ExamSection;