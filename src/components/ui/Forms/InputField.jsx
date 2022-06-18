import React from "react";

const InputField = React.forwardRef((props, ref) => {
  return (<section>
    <label htmlFor={props.id}>{props.label}</label>
    <input 
      type={props.type} 
      name={props.name} 
      id={props.id} 
      defaultValue={props.value}
      onChange={props.onChange} 
      ref={ref}

      min={props.min}
      max={props.max}
      step={props.step}
      minLength={props.minLength}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      required={props.required}
    />
  </section>);
})

InputField.defaultProps = {
  type: "text",
  onChange: () => {},
  value: "",
  name: "",
  id: "",
  label: "Label",
  min: '',
  max: '',
  step: '',
  minLength: '',
  maxLength: '',
  placeholder: ''
}

export default React.memo(InputField);