import { useContext, useState, useEffect } from "react";

import Section from "../../components/dashboard/Section";
import ExamList from "../../components/dashboard/ExamList";

import AuthContext from "../../store/AuthContext";
import { getPracticeExamsAPI } from "../../api/user";




const PracticeSection = () => {

  const { token } = useContext(AuthContext);

  const [availableExams, setAvailableExams] = useState([]);
  const [attemptedExams, setAttemptedExams] = useState([]);
  const [loading, setLoading] = useState(true);



  // Effect to get all practice exams
  useEffect(() => {
    const getPracticeExams = async () => {
      const response = await getPracticeExamsAPI(token);
      setLoading(false);
      if(response.status !== 'success'){ console.log(response.message); return; }
      setAvailableExams(response.data.availablePracticeExams);
      setAttemptedExams(response.data.attemptedPracticeExams);
    }

    getPracticeExams();

  }, [token]);




  return (<>
    <Section heading="Recently Attempted" >
      <ExamList list={attemptedExams} linkTo="/user/viewexam/" loading={loading} />
    </Section>
    <Section heading="Practice Exams Available" >
      <ExamList list={availableExams} linkTo="/user/viewexam/" loading={loading} />
    </Section>
  </>);
}

export default PracticeSection;