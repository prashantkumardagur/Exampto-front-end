import { Link } from "react-router-dom";

import IconHolder from "../IconHolder";


const Hbtn = (props) => {
  return (
  <Link to={props.to} className={`hbtn d-inflex t-2 htype1 ${props.className}`}>
    {props.children} 
    <IconHolder icon="east" color="white" className="ml-2" />
  </Link>);
}

Hbtn.defaultProps = {
  to: "/",
  children: "H button",
  className: ""
}


export default Hbtn;