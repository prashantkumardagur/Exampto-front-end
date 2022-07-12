import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Section from "../../components/dashboard/Section";
import IconHolder from "../../components/ui/IconHolder";
import LoadingIcon from "../../components/ui/LoadingIcon";
import ExamList from "../../components/dashboard/ExamList";


import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";
import { initializeTestAPI, getUnpublishedExamsAPI } from "../../api/coordinator";




const NewTestSection = () => {
  const { token } = useContext(AuthContext);
  const { setModel } = useContext(AppContext);
  const navigate = useNavigate();

  const [btnSideText, setBtnSideText] = useState("Initialize a blank test and continue in ExamEditor.");
  const [unpublishedExams, setUnpublishedExams] = useState([]);
  const [loading, setLoading] = useState(true);



  // effect to get all unpublished exams
  useEffect(() => {
    const getUnpublishedExams = async () => {
      const response = await getUnpublishedExamsAPI(token);
      if (response.status !== 'success') { console.log(response.message); return };

      setUnpublishedExams(response.data);
      setLoading(false);
    }

    getUnpublishedExams();
  }, [token]);



  // Creates a new test and redirects to the editor
  const createNewTest = async () => {
    setBtnSideText(<span><LoadingIcon /> Initializing...</span>);
    let response = await initializeTestAPI(token);
    if (response.status !== 'success') { setBtnSideText(response.message); return; }
    setBtnSideText("New exam created successfully. Redirecting...");
    setTimeout(() => { navigate(`/exameditor/${response.data}`); }, 1000);
  }
  // Handles the click event of the new test button
  const newTestHandler = () => {
    setModel({
      heading: "Create new Exam?",
      text: "Are you sure you want to create a new exam? This will initialize a blank exam and redirect you to the exam editor.",
      onContinue: createNewTest
    });
  }




  return (<>
    <button className='btn primary d-inflex flex-center gap-1 mb-6' onClick={newTestHandler}>
      <IconHolder icon='add_circle' color='white' /> Create a new test
    </button>
    <p className="d-inline ml-2">{btnSideText}</p>

    <Section heading='Exams under creation'>
      <ExamList list={unpublishedExams} linkTo='/exameditor/' loading={loading} />
    </Section>
  </>);
}

export default NewTestSection;