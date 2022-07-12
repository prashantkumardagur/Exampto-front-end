import { useState, useContext, useEffect } from "react";

import Textarea from "../ui/Forms/Textarea";
import InputField from "../ui/Forms/InputField";
import Form from "../ui/Forms/Form";
import SelectField from "../ui/Forms/SelectField";

import LoadingIcon from "../ui/LoadingIcon";
import IconHolder from "../ui/IconHolder";
import Model from "../ui/Model";

import EditorContext from "../../store/EditorContext";
import { updateQuestionAPI, deleteQuestionAPI, deleteImageAPI } from "../../api/editor";
import { hostUrl } from "../../api/runAPI";




const ViewQuestion = () => {

  const { exam, currentQuestion, setExam, token, setPage } = useContext(EditorContext);
  const answer = exam.answers[currentQuestion];
  const question = exam.contents[currentQuestion].question;
  const options = exam.contents[currentQuestion].options;


  const [model, setModel] = useState(false);
  const [btnState, setBtnState] = useState('');
  const [optionNumber, setOptionNumber] = useState(Array(options.length).fill(0));



  useEffect(() => {
    setOptionNumber(Array(options.length).fill(0));
    setBtnState('');
  }, [options]);



  // Handles form submission
  const submitHandler = async (e) => {
    setBtnState(<span><LoadingIcon />Updating</span>)
    const formData = new FormData(e.target);
    const content = {
      question: formData.get("thisQuestion"),
      options : optionNumber.map((n, i) => formData.get(`thisOption${i+1}`)),
    }
    const answer = formData.get("thisAnswer");

    const response = await updateQuestionAPI(token, exam._id, currentQuestion, content, answer);
    if(response.status !== 'success') { setBtnState(response.message); return; }

    const newExam = { ...exam };
    newExam.contents[currentQuestion].question.text = content.question;
    let kindArr = exam.contents[currentQuestion].options.map((option) => option.kind);
    newExam.contents[currentQuestion].options = content.options.map((option, i) => {
      return {
        kind : kindArr[i] || 'text',
        text : option
      }
    });

    newExam.answers[currentQuestion] = parseInt(answer);
    setExam(newExam);
    setOptionNumber(Array(options.length).fill(1));

    setBtnState('Updated successfully');
  }



  // Deletes the question
  const deleteQuestion = async () => {
    setBtnState(<span><LoadingIcon /> Deleting...</span>);
    setModel(false);

    if(exam.contents[currentQuestion].question.image !== '') deleteImageAPI(token, exam.contents[currentQuestion].question.image);
    exam.contents[currentQuestion].options.forEach((option) => {
      if(option.kind === 'image') deleteImageAPI(token, option.text);
    });

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



  // Handles option number increment
  const addOption = () => {
    if(optionNumber.length >= 6) return;
    setOptionNumber((prevState) => [...prevState, 0]);
  }

  // Handles option number decrement
  const removeOption = () => {
    if(optionNumber.length <= 2) return;
    if(options[optionNumber.length - 1].kind !== 'text') return;
    setOptionNumber((prevState) => prevState.slice(0, prevState.length - 1));
  }



  
  return (<>
    <h2>View Question {currentQuestion+1}</h2>

    { model && <Model content={model} onContinue={deleteQuestion} onCancel={() => {setModel(false)}} />}

    <Form onSubmit={submitHandler} onChange={() => { setBtnState(''); }}>

      <Textarea key={currentQuestion} label='Question' name='thisQuestion' id='thisQuestion' value={question.text} />
      { question.image !== '' && <img src={`${hostUrl}/images/${question.image}`} alt='Question' className="option-image" /> }
      {optionNumber.map((option, i) =>
        options[i] && options[i].kind === 'image' ?
          <div key={`${currentQuestion}${i}`}>
            <label>Option{i+1}</label>
            <input style={{display: 'none'}} name={`thisOption${i+1}`} value={options[i].text} readOnly />
            <img src={`${hostUrl}/images/${options[i].text}`} className='option-image' alt={`option${i+1}`} />
          </div> 
          :
          <InputField 
              key={`${currentQuestion}${i}`} 
              label={`Option${i+1}`} 
              name={`thisOption${i+1}`} 
              id={`thisOption${i+1}`} 
              value={options[i] ? options[i].text : ''} 
          />
      )}

      <button type="button" className="btn primary small mt-3 mb-4" onClick={addOption}>
        <IconHolder icon='add' color='white' />
        Add option
      </button>
      <button type="button" className="btn primary small mt-3 mb-4 ml-2" onClick={removeOption}>
        <IconHolder icon='remove' color='white' />
        Remove option
      </button>


      <SelectField key={currentQuestion+'select'} label='Answer' name='thisAnswer' id='thisAnswer' type='number' defaultValue={answer.toString()} >
        {optionNumber.map((number, i) => 
          <option key={`answerr${i}${currentQuestion}`} value={i+1}>Option {i+1}</option>
        )}
      </SelectField>
      <button type="submit" className="btn primary large mt-3">Update question</button>
      <p className="d-sm-inblock pt-2 pt-md-0 pl-sm-2">{btnState}</p><br/>
      <button type="button" className="btn bg-red primary large mt-2" style={{background: '#f00'}} onClick={deleteHandler}>Delete question</button>
    </Form>
  </>);
}

export default ViewQuestion;