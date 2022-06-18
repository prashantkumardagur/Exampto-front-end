import React from "react";

const Textarea = (props) => {
  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  }

  return (<section>
    <label htmlFor={props.id}>{props.label}</label>
    <textarea 
      name={props.name} 
      id={props.id} 
      onChange={props.onChange} 
      onInput={autoResize} 

      defaultValue={props.value}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      placeholder={props.placeholder}
      className={props.className}
    >
    </textarea>
  </section>);
}

export default React.memo(Textarea);