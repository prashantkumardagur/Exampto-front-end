import React from "react";

const IconHolder = (props) => {
  return (<span className={`${props.className} iconHolder d-inflex flex-center`} style={{fontSize: props.fontSize}}>
    <span className="material-symbols-outlined" style={{color: props.color, fontSize: 'inherit'}}>{props.icon}</span>
  </span>);
}

IconHolder.defaultProps = {
  className: '',
  icon: 'account_circle',
  color: 'var(--txt2)',
  fontSize: '1.2em',
}

export default React.memo(IconHolder);