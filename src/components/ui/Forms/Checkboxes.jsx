import { useEffect, useState } from "react";

const Checkboxes = (props) => {
  const [values, setValues] = useState(props.defaultValue);

  const changeHandler = (e) => {
    if(e.target.checked) {
      setValues([...values, e.target.value]);
    } else {
      setValues(values.filter(v => v !== e.target.value));
    }
  }

  useEffect(() => {
    props.onUpdate(values);
  }, [values, props]);

  return (<section>
    <label>{props.label}</label>
    {props.children.map((span, i) => <div key={i} className='checkbox'>
      <input
        type="checkbox"
        name={props.name}
        value={span.props.value}
        id={`${props.name}${i}`}
        checked={values.includes(span.props.value)}
        onChange={changeHandler}
      />
      <label htmlFor={`${props.name}${i}`}>{span.props.children}</label>
      </div>) }
  </section>);
}

export default Checkboxes;