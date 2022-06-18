import React from "react";
import { Link } from "react-router-dom";

const BtnLink = (props) => {
  return (<Link to={props.to} className={`btn-link ${props.className}`}>{props.text}</Link>);
}

export default React.memo(BtnLink);