import { useContext, useState } from "react";

import IconHolder from "../ui/IconHolder";
import LoadingIcon from "../ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";

import { downloadFile } from "../../lib/downloadFile";


const FileAccess = (props) => {
  const { token } = useContext(AuthContext);

  const [state, setState] = useState(props.text);
  const [downloaded, setDownloaded] = useState(false);

  const downloadHandler = async () => {
    if(!props.api || downloaded) return;
    setState(<span><LoadingIcon /> Downloading...</span>);
    const response = await props.api(token, props.data);
    downloadFile(response, props.fileName);
    setDownloaded(true);
    setState("File Downloaded.");
  }


  return (
  <div className={`file-access d-flex bg3 w500 overflow-hidden justify-between ${props.className}`}>
    <p className='p-2'>{state}</p>
    <button onClick={downloadHandler} className='d-flex align-center px-2 fs-2' disabled={props.disabled || downloaded}>
      <IconHolder icon='download' color='white' />
      <span>Download</span>
    </button>
  </div>);
}

export default FileAccess;