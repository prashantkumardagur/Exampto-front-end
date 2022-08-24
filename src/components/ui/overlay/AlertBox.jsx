import ReactDOM from "react-dom";

const AlertBox = (props) => {
  return (<>{ ReactDOM.createPortal(
    <div className="alert-box" style={{ backgroundColor: (props.type !== 'success' ? 'red':'var(--accent1)'  ), ...props.style}}>
      {props.text}
    </div>, document.getElementById("alert-root")) }
    </>);
}

export default AlertBox;