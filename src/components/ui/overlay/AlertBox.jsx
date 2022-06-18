import ReactDOM from "react-dom";

const AlertBox = (props) => {
  return (<>{ ReactDOM.createPortal(
    <div className="alert-box" style={props.style}>
      {props.text}
    </div>, document.getElementById("alert-root")) }
    </>);
}

export default AlertBox;