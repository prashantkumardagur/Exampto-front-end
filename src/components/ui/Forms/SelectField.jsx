import React from "react";

const SelectField = (props) => {

  return (
  <section>
    <label htmlFor={props.id}>{props.label}</label>
    <select name={props.name} id={props.id} onChange={props.onChange} defaultValue={props.defaultValue} >
      {props.children}
    </select>
  </section>);
}

export default React.memo(SelectField);