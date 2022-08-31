import React, {useState} from "react";
import IconHolder from "../IconHolder";




const InputField = React.forwardRef((props, ref) => {
  const [inputType, setInputType] = useState(props.type)
  const [visibilityIcon, setVisibilityIcon] = useState('visibility');



  const visibilityHandler = (e) => {
    if(inputType === 'password'){
      setInputType('text');
      setVisibilityIcon('visibility_off');
    } else {
      setInputType('password');
      setVisibilityIcon('visibility');
    }
  }




  return (<section className="p-relative">
    <label htmlFor={props.id}>{props.label}</label>
    <input 
      type={inputType} 
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
      disabled={props.disabled}
      readOnly={props.readOnly}
      autoComplete={props.autoComplete}
      
      style={props.type === "password" ? {paddingRight: '30px'} : {}}
    />
    <IconHolder 
      className='password-visibility-icon p-absolute cursor-pointer'
      icon={visibilityIcon} 
      style={ props.type === "password" ? {} : {display: 'none'} }
      onClick={visibilityHandler}
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
  placeholder: '',
  disabled: false,
  readOnly: false,
  autoComplete: 'on',
}

export default React.memo(InputField);