import { useRef, useState, useContext } from "react";

import FileInput from "../ui/Forms/FileInput";
import IconHolder from "../ui/IconHolder";
import LoadingIcon from "../ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";



const FileUpload = (props) => {
  const fileInputRef = useRef();
  const { token } = useContext(AuthContext);
  const { examId, api } = props;

  const [btnText, setBtnText] = useState('Click here to select a file to upload.');
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);



  // Simulates a click on the file input
  const clickHandler = () => {
    if(fileUploaded) return;
    fileInputRef.current.click();
  }

  // Handles file upload
  const uploadHandler = async (e) => {
    if(!file) return;
    if(fileUploaded) return;
    setBtnText(<span><LoadingIcon /> Uploading file...</span>)
    let response = await api(token, examId, file);
    if(response.status !== 'success'){ setBtnText(response.message); return; }
    setBtnText('File uploaded successfully.');
    setFileUploaded(true);
  }

  // Handles file input change
  const changeHandler = (e) => {
    let file = e.target.files[0];
    if(!file) return;
    setFile(file);
    setBtnText(`${file.name} - ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
  }




  return (
  <div className={`d-flex align-center justify-between bg3 overflow-hidden w500 file-upload ${props.className}`}>
    <p className="px-2 py-1 d-flex align-center cursor-copy" onClick={clickHandler}>
      <IconHolder icon="folder_open" className='mr-2' color='var(--accent1)' />
      {btnText}
    </p>
    <button disabled={file === null} type="button" className="btn primary d-flex align-center" onClick={uploadHandler}>
      <IconHolder color='white' icon='upload' />
      Upload
    </button>
    <FileInput name='solutionFile' ref={fileInputRef} accept='.pdf' onChange={changeHandler} />
  </div>);
}

export default FileUpload;