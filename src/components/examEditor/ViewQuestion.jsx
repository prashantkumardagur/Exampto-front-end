import { useState, useContext } from "react";

import Textarea from "../ui/Forms/Textarea";
import InputField from "../ui/Forms/InputField";
import Form from "../ui/Forms/Form";
import SelectField from "../ui/Forms/SelectField";

import LoadingIcon from "../ui/LoadingIcon";
import Model from "../ui/Model";

import EditorContext from "../../store/EditorContext";
import { updateQuestionAPI, deleteQuestionAPI } from "../../api/editor";




const ViewQuestion = () => {

  const { exam, currentQuestion, setExam, token, setPage } = useContext(EditorContext);
  const answer = exam.answers[currentQuestion];
  const question = exam.contents[currentQuestion].question;
  const options = exam.contents[currentQuestion].options;


  const [model, setModel] = useState(false);
  const [btnState, setBtnState] = useState('');



  // Handles form submission
  const submitHandler = async (e) => {
    setBtnState(<span><LoadingIcon />Updating</span>)
    const formData = new FormData(e.target);
    const content = {
      question: formData.get("thisQuestion"),
      options: [
        formData.get("thisOption1"),
        formData.get("thisOption2"),
        formData.get("thisOption3"),
        formData.get("thisOption4")
      ]
    }
    const answer = formData.get("thisAnswer");

    const response = await updateQuestionAPI(token, exam._id, currentQuestion, content, answer);
    if(response.status !== 'success') { setBtnState(response.message); return; }

    const newExam = { ...exam };
    newExam.contents[currentQuestion] = content;
    newExam.answers[currentQuestion] = answer;
    setExam(newExam);

    setBtnState('Updated successfully');
  }



  // Deletes the question
  const deleteQuestion = async () => {
    setBtnState(<span><LoadingIcon /> Deleting...</span>);
    setModel(false);
    const response = await deleteQuestionAPI(token, exam._id, currentQuestion);
    if(response.status !== 'success') { setBtnState(response.message); return; }

    const newExam = { ...exam };
    newExam.contents.splice(currentQuestion, 1);
    newExam.answers.splice(currentQuestion, 1);
    setExam(newExam);

    setPage(1);
  }

  // Handles delete button click
  const deleteHandler = async () => {
    setModel({
      heading: "Delete Question?",
      text: "Are you sure you want to delete this question? This is a irreversible action."
    });
  }



  
  return (<>
    <h2>View Question {currentQuestion+1}</h2>

    { model && <Model content={model} onContinue={deleteQuestion} onCancel={() => {setModel(false)}} />}

    <Form onSubmit={submitHandler} onChange={() => { setBtnState(''); }}>
      <Textarea key={currentQuestion} label='Question' name='thisQuestion' id='thisQuestion' value={question} />
      {options.map((option, i) => <InputField key={`${currentQuestion}${i}`} label={`Option${i+1}`} name={`thisOption${i+1}`} id={`thisOption${i+1}`} value={option} />)}
      <SelectField key={currentQuestion+'select'} label='Answer' name='thisAnswer' id='thisAnswer' type='number' defaultValue={answer.toString()} >
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
        <option value='4'>Option 4</option>
      </SelectField>
      <button type="submit" className="btn primary large mt-3">Update question</button>
      <p className="d-sm-inblock pt-2 pt-md-0 pl-sm-2">{btnState}</p><br/>
      <button type="button" className="btn bg-red primary large mt-2" style={{background: '#f00'}} onClick={deleteHandler}>Delete question</button>
    </Form>
  </>);
}

export default ViewQuestion;