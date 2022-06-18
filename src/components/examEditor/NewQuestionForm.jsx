import { useState, useContext } from "react";

import Form from "../ui/Forms/Form";
import InputField from "../ui/Forms/InputField";
import SelectField from "../ui/Forms/SelectField";
import Textarea from "../ui/Forms/Textarea";

import LoadingIcon from "../ui/LoadingIcon";

import EditorContext from "../../store/EditorContext";
import { addQuestionAPI } from "../../api/editor";

const NewQuestionForm = () => {
  const [btnState, setBtnState] = useState('');
  const { token, exam, setExam } = useContext(EditorContext);

  const submitHandler = async (e) => {
    setBtnState(<span><LoadingIcon /> Adding question...</span>);
    const formData = new FormData(e.target);
    const data = {
      question: formData.get("newQuestion"),
      options: [
        formData.get("newOption1"),
        formData.get("newOption2"),
        formData.get("newOption3"),
        formData.get("newOption4"),
      ],
      answer: formData.get("newAnswer"),
    }

    const response = await addQuestionAPI(token, exam._id, data);
    if(response.status !== "success") { setBtnState(response.message); return; }

    e.target.reset();
    setBtnState("Question added successfully");

    let newExam = { ...exam };
    newExam.contents.push({
      question: data.question,
      options: data.options,
    });
    newExam.answers.push(parseInt(data.answer));
    setExam(newExam);    
  }

  return (<>
  <h2 className="pb-3">NewQuestionForm</h2>
  <Form onSubmit={submitHandler} onChange={() => {setBtnState('')}}>
    <Textarea label='Question' name='newQuestion' id='newQuestion' minLength='1' maxLength='4095' required />
    <InputField label='Option1' name='newOption1' id='newOption1' minLength='1' maxLength='1024' required />
    <InputField label='Option2' name='newOption2' id='newOption2' minLength='1' maxLength='1024' required />
    <InputField label='Option3' name='newOption3' id='newOption3' minLength='1' maxLength='1024' required />
    <InputField label='Option4' name='newOption4' id='newOption4' minLength='1' maxLength='1024' required />
    <SelectField label='Answer' name='newAnswer' id='newAnswer' type='number' >
      <option value='1'>Option 1</option>
      <option value='2'>Option 2</option>
      <option value='3'>Option 3</option>
      <option value='4'>Option 4</option>
    </SelectField>
    <button type="submit" className="btn primary large mt-3">Save question</button>
    <p className="d-sm-inblock pt-2 pt-md-0 pl-sm-2">{btnState}</p>
  </Form>
  </>);
}

export default NewQuestionForm;