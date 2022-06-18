import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Section from "../../components/dashboard/Section";
import IconHolder from "../../components/ui/IconHolder";
import LoadingIcon from "../../components/ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";
import { initializeTestAPI, getUnpublishedExamsAPI } from "../../api/coordinator";
import ExamList from "../../components/dashboard/ExamList";
import Model from "../../components/ui/Model";

const NewTestSection = () => {
  const [model, setModel] = useState(false);
  const { token } = useContext(AuthContext);
  const [btnSideText, setBtnSideText] = useState("Initialize a blank test and continue in ExamEditor.");
  const navigate = useNavigate();

  const [unpublishedExams, setUnpublishedExams] = useState([]);
  useEffect(() => {
    const getUnpublishedExams = async () => {
      const response = await getUnpublishedExamsAPI(token);
      if (response.status !== 'success') {console.log(response.message); return};
      setUnpublishedExams(response.data);
    }
    getUnpublishedExams();
  }, [token]);


  const createNewTest = async () => {
    setBtnSideText(<span><LoadingIcon /> Initializing...</span>);
    let response = await initializeTestAPI(token);
    if (response.status !== 'success') { setBtnSideText(response.message); return; }
    setBtnSideText("New exam created successfully. Redirecting...");
    setTimeout(() => { navigate(`/exameditor/${response.data}`); }, 1000);
  }
  const newTestHandler = () => {
    setModel({
      heading: "Create new Exam?",
      text: "Are you sure you want to create a new exam? This will initialize a blank exam and redirect you to the exam editor.",
    });
  }

  return (<>
    {model && <Model content={model} onContinue={createNewTest} onCancel={() => {setModel(false)}} />}
    <button className='btn primary d-inflex flex-center gap-1 mb-6' onClick={newTestHandler}>
      <IconHolder icon='add_circle' color='white' /> Create a new test
    </button>
    <p className="d-inline ml-2">{btnSideText}</p>

    <Section heading='Exams under creation'>
      <ExamList list={unpublishedExams} linkTo='/exameditor/' />
    </Section>
  </>);
}

export default NewTestSection;