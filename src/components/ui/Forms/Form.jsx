import React from "react";

const Form = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  }

  return (<form onSubmit={submitHandler} onChange={props.onChange} className={props.className}>
    {props.children}
  </form>);
}

export default React.memo(Form);