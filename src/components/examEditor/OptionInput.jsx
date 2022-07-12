import React,{ useState, useRef, useContext, useImperativeHandle } from "react";
import LoadingIcon from "../ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";
import { uploadImageAPI, deleteImageAPI } from "../../api/editor";
import { hostUrl } from "../../api/runAPI";



const OptionInput = React.forwardRef((props, ref) => {
  const index = props.index;
  const number = index+1;
  const { token } = useContext(AuthContext);

  const [optionType, setOptionType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef();

  useImperativeHandle(ref, () => ({
    reset: () => {
      setOptionType('text');
      setInputValue('');
      setIsUploading(false);
      fileInputRef.current.value = '';
    }
  }))



  
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const selectText = async () => {
    const response = await deleteImageAPI(token, inputValue);
    if(response.status !== 'success') { console.log(response.message); return; }
    setOptionType('text');
    setInputValue('');
  }


  const selectImage = async (e) => {
    fileInputRef.current.click();
  }

  const uploadImage = async (e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    if(!file) return;
    if(optionType === 'image') {
      const response = await deleteImageAPI(token, inputValue);
      if(response.status !== 'success') { console.log(response.message); return; }
    }
    const response = await uploadImageAPI(token, file);
    if(response.status !== 'success') { console.log(response.message); return; }
    
    setOptionType('image');
    setInputValue(response.data);
    setIsUploading(false);
  }




  return (
  <>
  <label>Option{number}</label>
  <div className="option-type">
    <button type="button" className={optionType === 'text' ? 'selected' : ''} onClick={selectText}>Text</button>
    <button type="button" className={optionType === 'image' ? 'selected' : ''} onClick={selectImage}>Image</button>
    {isUploading && <div className="pt-1 px-2 fs-2"><LoadingIcon /> Uploading</div>}
  </div>
  <input 
    style={{display: 'none'}} 
    ref={fileInputRef} 
    type="file" 
    id={`fileInputNew${index}`} 
    accept='.png, .jpeg, .jpg' 
    onChange={uploadImage}
  />
  <input
    style={{display: 'none'}}
    type="text"
    name={`newOptionType${number}`}
    value={optionType}
    readOnly
    required
  />
  {optionType === 'image' && <img src={`${hostUrl}/images/${inputValue}`} className="option-image" alt="optionImage" />}
  <input 
    style={optionType === 'text' ? {} : {display: 'none'}}
    type="text" 
    id={`newOption${number}`} 
    name={`newOption${number}`} 
    minLength='1' 
    maxLength='1023' 
    required 
    value={inputValue}
    onChange={onInputChange}
    readOnly={optionType === 'image' ? true : ''}
  />
  </>);
})

export default OptionInput;