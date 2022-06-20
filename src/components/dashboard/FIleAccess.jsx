import IconHolder from "../ui/IconHolder";

const FileAccess = (props) => {

  return (
  <div className={`file-access d-flex bg3 w500 overflow-hidden justify-between ${props.className}`}>
    <p className='p-2'>{props.text}</p>
    <button onClick={props.action} className='d-flex align-center px-2 fs-2'>
      <IconHolder icon={props.icon} color='white' />
      <span>{props.btnText}</span>
    </button>
  </div>);
}

export default FileAccess;