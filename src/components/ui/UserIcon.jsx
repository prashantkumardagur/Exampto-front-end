import React from "react";
import { Link } from "react-router-dom";

import IconHolder from "./IconHolder";

const UserIcon = (props) => {
  return (
    <Link to={props.link} className="userIcon d-none d-md-flex align-center pl-1 pr-2 rounded-5">
      <IconHolder icon={props.icon} fontSize='32px' />
      <span className="pl-1 txt1">{props.text}</span>
    </Link>
  );
}

UserIcon.defaultProps = {
  text: 'User Name',
  icon: 'person',
  link: '#'
}

export default React.memo(UserIcon);