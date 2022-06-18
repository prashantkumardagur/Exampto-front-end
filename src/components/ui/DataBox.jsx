import React from "react";

import IconHolder from "./IconHolder";

const DataBox = (props) => {
  let color = 'var(--accent1)';
  let bgColor = 'var(--accent2)';

  switch(props.color) {
    case "red": color = 'var(--red)'; bgColor = 'var(--red-bg)'; break;
    case "accent": color = 'var(--accent1)'; bgColor = 'var(--accent2)'; break;
    default: color = 'black'; bgColor = 'var(--accent2)'; break;
  }

  return (
  <div className={`${props.size} data-box d-inflex align-center ${props.className}`} style={{color, backgroundColor: bgColor}}>
    {props.icon && <IconHolder color={props.color} icon={props.icon} className='pr-1' />}
    {props.content}
  </div>);
}

DataBox.defaultProps = {
  content: 'DataBox',
  size: 'medium',
  color: 'accent',
  className: '',
  icon: null
}

export default React.memo(DataBox);