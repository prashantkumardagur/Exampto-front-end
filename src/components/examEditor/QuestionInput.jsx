import React, { useState, useContext, useRef, useImperativeHandle } from "react";

import LoadingIcon from "../ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";
import { uploadImageAPI, deleteImageAPI } from "../../api/editor";
import { hostUrl } from "../../api/runAPI";



const QuestionInput = React.forwardRef((props, ref) => {
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef();

  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);


  useImperativeHandle(ref, () => ({
    reset: () => {
      setImage('');
      setIsUploading(false);
    }
  }));





  const onTextAreaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  }


  const selectTextOnly = async () => {
    const response = await deleteImageAPI(token, image);
    if(response.status !== 'success') { console.log(response.message); return; }
    setImage('');
  }


  const selectImage = async () => {
    fileInputRef.current.click();
  }

  const uploadImage = async () => {
    setIsUploading(true);
    const file = fileInputRef.current.files[0];
    if(!file) return;
    const response = await uploadImageAPI(token, file);
    if(response.status !== 'success') { console.log(response.message); return; }

    setImage(response.data);
    setIsUploading(false);
  }



  return (<>
    <label>Question</label>
    <div className="option-type">
      <button type="button" className={image === '' ? 'selected' : ''} onClick={selectTextOnly}>No image</button>
      <button type="button" className={image !== '' ? 'selected' : ''} onClick={selectImage}>With Image</button>
      {isUploading && <div className="pt-1 px-2 fs-2"><LoadingIcon /> Uploading</div>}
    </div>
    <input 
      style={{display: 'none'}} 
      ref={fileInputRef} 
      type="file" 
      id={`fileInputNewQuestion`} 
      accept='.png, .jpeg, .jpg' 
      onChange={uploadImage}
    />
    <input
      style={{display: 'none'}}
      type="text"
      name='newQuestionImage'
      value={image}
      readOnly
      required
    />
    {image !== '' && <img src={`${hostUrl}/images/${image}`} className="option-image" alt="questionImage" />}
    <textarea 
      name="newQuestion" 
      id='newQuestion' 
      minLength='1' 
      maxLength='4095'
      onInput={onTextAreaInput}
      placeholder="Enter question here"
    ></textarea>
  </>);
});

export default QuestionInput;