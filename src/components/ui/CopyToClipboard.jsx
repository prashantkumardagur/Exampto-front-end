import { useContext } from "react";

import IconHolder from "./IconHolder";

import AppContext from "../../store/AppContext";




const CopyToClipboard = (props) => {

  const { showAlert } = useContext(AppContext);



  const copyHandler = async (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(props.text);
    showAlert('Exam link copied to clipboard.');
  }



  return (<div className={`copy-to-clipboard d-flex justify-between bg3 overflow-hidden ${props.className}`}>
    <p className="p-2 fs-2">{props.text}</p>
    <button className='d-flex align-center px-2 fs-2' onClick={copyHandler}>
      <IconHolder icon='content_copy' color='white' />
      Copy
    </button>
  </div>);
}

export default CopyToClipboard;