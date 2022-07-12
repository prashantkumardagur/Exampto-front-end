import { useState, useContext, useRef } from "react";

import Form from "../ui/Forms/Form";
import SelectField from "../ui/Forms/SelectField";
import OptionInput from "./OptionInput";

import LoadingIcon from "../ui/LoadingIcon";
import IconHolder from "../ui/IconHolder";

import EditorContext from "../../store/EditorContext";
import { addQuestionAPI } from "../../api/editor";
import QuestionInput from "./QuestionInput";




const NewQuestionForm = () => {

  const { token, exam, setExam } = useContext(EditorContext);

  const [btnState, setBtnState] = useState('');
  const [optionNumber, setOptionNumber] = useState([1,2]);
  const optionRefs = useRef([]);
  const questionRef = useRef();



  // Handles form submission
  const submitHandler = async (e) => {
    setBtnState(<span><LoadingIcon /> Adding question...</span>);
    const formData = new FormData(e.target);
    const data = {
      question: formData.get("newQuestion"),
      questionImage: formData.get("newQuestionImage"),
      optionTypes: optionNumber.map((i) => formData.get(`newOptionType${i}`)),
      options: optionNumber.map((i) => formData.get(`newOption${i}`)),
      answer: formData.get("newAnswer"),
    }

    const response = await addQuestionAPI(token, exam._id, data);
    if(response.status !== "success") { setBtnState(response.message); return; }

    e.target.reset();
    optionRefs.current.forEach((ref) => ref.reset());
    questionRef.current.reset();
    setBtnState("Question added successfully");

    let newExam = { ...exam };
    newExam.contents.push({
      question: { text: data.question, image: data.questionImage, },
      options: data.optionTypes.map((type, index) => {return { text: data.options[index], kind: type }}),
    });
    newExam.answers.push(parseInt(data.answer));
    setExam(newExam);    
  }




  // Handles option number increment
  const addOption = () => {
    if(optionNumber.length >= 6) return;
    setOptionNumber((prevState) => [...prevState, prevState.length + 1]);
  }

  // Handles option number decrement
  const removeOption = () => {
    if(optionNumber.length <= 2) return;
    setOptionNumber((prevState) => prevState.slice(0, prevState.length - 1));
  }



  
  return (<>
  <h2 className="pb-3">NewQuestionForm</h2>
  <Form onSubmit={submitHandler} onChange={() => {setBtnState('')}}>
    <QuestionInput ref={questionRef} />
    {optionNumber.map((number, index) => <OptionInput index={index} key={index} ref={el => optionRefs.current[index] = el} />
    )}
    <button type="button" className="btn primary small mt-3 mb-4" onClick={addOption}>
      <IconHolder icon='add' color='white' />
      Add option
    </button>
    <button type="button" className="btn primary small mt-3 mb-4 ml-2" onClick={removeOption}>
      <IconHolder icon='remove' color='white' />
      Remove option
    </button>
    <SelectField label='Answer' name='newAnswer' id='newAnswer' type='number' >
      {optionNumber.map((number) =><option value={number} key={`option${number}`}>Option {number}</option>)}
    </SelectField>
    <button type="submit" className="btn primary large mt-3">Save question</button>
    <p className="d-sm-inblock pt-2 pt-md-0 pl-sm-2">{btnState}</p>
  </Form>
  </>);
}

export default NewQuestionForm;