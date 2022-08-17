import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Checkboxes from "../ui/Forms/Checkboxes";
import Form from "../ui/Forms/Form";
import InputField from "../ui/Forms/InputField";
import SelectField from "../ui/Forms/SelectField";
import LoadingIcon from "../ui/LoadingIcon";
import FileUpload from "../dashboard/FileUpload";
import CopyToClipboard from "../ui/CopyToClipboard";

import EditorContext from "../../store/EditorContext";
import AppContext from "../../store/AppContext";
import { updateExamDetailsAPI, publishExamAPI, uploadSolutionAPI, deleteExamAPI } from "../../api/editor";




const ExamDetails = () => {

  const navigate = useNavigate();
  const { exam, setExam, token } = useContext(EditorContext);
  const { setModel } = useContext(AppContext);


  const [btnState, setBtnState] = useState('Make sure to save changes.');

  let category = exam.category;
  const categoryChangeHandler = (newValue) => { category = newValue; }



  // Handles exam details form submission
  const submitHandler = async (e) => {
    setBtnState(<span><LoadingIcon /> Saving...</span>);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: category,
      startTime: new Date( formData.get("startTime") ).getTime(),
      lastStartTime: new Date( formData.get("lastStartTime") ).getTime(),
      duration: formData.get("duration"),
      marking: {
        positive: formData.get('positive'),
        negative: formData.get('negative'),
      },
      "meta.isPrivate" : formData.get('visibility'),
      "meta.availableForPractice" : formData.get('conversion')
    }
    
    const response = await updateExamDetailsAPI( token, exam._id, data);
    if(response.status !== 'success'){ setBtnState(response.message); return; }

    setExam({
      ...exam,
      ...data,
      meta : {
        ...exam.meta, 
        isPrivate : data["meta.isPrivate"] === 'true',
        availableForPractice : data["meta.availableForPractice"] === 'true'
        }
      });
    setBtnState('Changes saved successfully.');
  }



  // Publishes the exam
  const publishExam = async () => {
    const response = await publishExamAPI( token, exam._id );
    if(response.status !== 'success'){ setModel(false); console.log(response.message); return; }
    navigate('/coordinator/mytests');
  }

  // Handles publish exam button click
  const publishHandler = async () => {
    setModel({
      heading: "Publish Exam?",
      text: "Are you sure you want to publish this exam? You won't be able to make any changes after publishing.",
      onContinue: publishExam,
    })
  }



  // Handles delete exam button click
  const deleteHandler = async () => {
    setModel({
      heading: "Delete Exam?",
      text: "Are you sure you want to delete this exam? This is a irreversible action.",
      onContinue: deleteExam,
    })
  }

  // Deletes the exam
  const deleteExam = async () => {
    const response = await deleteExamAPI( token, exam._id );
    if(response.status !== 'success'){ console.log(response.message); return; }
    navigate('/coordinator/mytests');
  }



  return (<>
  <h2>Exam Details</h2>

  <Form onSubmit={submitHandler} onChange={(e) => { setBtnState('Make sure to save changes.'); }}>
    <h6 className="ch accent1 mt-5">Basic Info</h6>
    <InputField label='Exam Name' id='examName' name='name' type='text' value={exam.name} minLength='3' maxLength='64' />
    <div className="grid-md-2 gap-3">
      <InputField label='Price (Ruppee equivalent)' id='examPrice' name='price' type='number' value={exam.price} min='0' />
      <p className="fs-2 pt-1 pt-md-4">This amount will be collected from every student while enrolling.</p>
    </div>
    <div className="grid-md-2 gap-3">
      <Checkboxes label='Category' name='category' defaultValue={exam.category} onUpdate={categoryChangeHandler} >
        <span value='JEE'>JEE</span>
        <span value='NEET'>NEET</span>
        <span value='CDS'>CDS</span>
        <span value='BANK'>BANK</span>
        <span value='NDA'>NDA</span>
        <span value='UPSC'>UPSC</span>
        <span value='GATE'>GATE</span>
      </Checkboxes>
      <p className="fs-2 pt-2 pt-md-4">
        This exam will be visible to students with selected programs only.
        In case you want to share this exam with other programs, please select all that apply or share the test link with students.
      </p>
    </div>

    <h6 className="ch accent1 mt-5">Timings</h6>
    <div className="grid-md-2 gap-3">
      <InputField label='Start date and time' id='examStartTime' name='startTime' type='datetime-local' value={new Date(exam.startTime + 19800000).toISOString().substring(0,16)} />
      <InputField label='Duration (in minutes)' id='examDuration' name='duration' type='number' value={exam.duration} min='10' max='1440' />
    </div>
    <div className="grid-md-2 gap-3">
      <InputField label='Last start date and time' id='examLastTime' name='lastStartTime' type='datetime-local' value={new Date(exam.lastStartTime + 19800000).toISOString().substring(0,16)} />
      <p className="fs-2 pt-1 pt-md-4">
        A user will not be able to start their test after Last Start Time. Make sure that start time and last start 
        time have at least a difference of 5 minutes.
      </p>
    </div>

    <h6 className="ch accent1 mt-5">Marking</h6>
    <div className="grid-md-2 gap-3">
      <InputField label='Positive Mark' id='examPositiveMark' name='positive' type='number' value={exam.marking.positive} min='1' max='1000' />
      <InputField label='Negative Mark' id='examNegativeMark' name='negative' type='number' value={exam.marking.negative} min='0' max='1000' />
    </div>

    <h6 className="ch accent1 mt-5 mb-2">Exam Solution PDF</h6>
    {exam.solutions > 0 ? <p className="mb-1 fs-2">Solution file already uploaded.</p> : null}
    <FileUpload examId={exam._id} api={uploadSolutionAPI} />

    <h6 className="ch accent1 mt-5">Custom Controls</h6>
    <div className="grid-md-2 gap-3">
      <SelectField label="Conversion" id="examConversion" name="conversion" defaultValue={exam.meta.availableForPractice ? 'true' : 'false'}>
        <option value="false">Don't convert</option>
        <option value="true">Convert to practice test</option>
      </SelectField>
      <p className="fs-2 pt-1 pt-md-4">
        If you allow conversion, the exam will be converted to a practice test after the result declaration, so that the 
        students who didn't attempt the exam can attempt it as a practice test.
      </p>
    </div>
    <div className="grid-md-2 gap-3 mt-2">
      <SelectField label='Exam Visibility' id='examVisibility' name='visibility' defaultValue={exam.meta.isPrivate ? 'true' : 'false'} >
        <option value="false">Visible to everyone</option>
        <option value="true">People with link only</option>
      </SelectField>
      <p className="fs-2 pt-1 pt-md-4">
        In case of link only, you will need to provide the link to your students. Exam will not be visible in 
        explore section.
      </p>
    </div>
    <p className="w500 mt-3">Exam Link</p>
    <CopyToClipboard text={`https://www.exampto.com/user/viewexam/${exam._id}`} />
    <p className="mt-2 fs-2">This link is for students (not for coordinators). The exam link will be accessible by students
        only if the exam is already published. Student of any program can access this exam with the help of the link.
    </p>

    <button type="submit" className="btn primary large mt-6">Save Changes</button>
    <p className="d-sm-inblock pt-2 pt-md-0 pl-sm-2">{btnState}</p>
  </Form>

  <div>
    <h2 className="mt-7 mb-4">Exam Control</h2>
    <button className="btn primary large mb-2" onClick={publishHandler}>Publish Exam</button><br />
    <button className="btn primary large" style={{background: '#f00'}} onClick={deleteHandler}>Delete Exam</button>
  </div>
  </>);
}

export default ExamDetails;