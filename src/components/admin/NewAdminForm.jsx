import { useState, useContext } from 'react';

import Form from '../ui/Forms/Form';
import InputField from '../ui/Forms/InputField';
import LoadingIcon from '../ui/LoadingIcon';

import { createCoordinatorAPI } from '../../api/admin';
import AuthContext from '../../store/AuthContext';



const NewAdminForm = (props) => {

  const { token } = useContext(AuthContext);

  const [sideBtn, setSideBtn] = useState('');



  // handles form onchange
  const changeHandler = (e) => {
    setSideBtn('');
  }


  // Handles form submit
  const submitHandler = async (e) => {
    setSideBtn(<span><LoadingIcon /> Creating coordinator</span>);

    let formdata = new FormData(e.target);
    let data = {
      name: formdata.get('name'),
      email: formdata.get('email'),
      password: formdata.get('password')
    }
    let password2 = formdata.get('confirmPassword');

    if (data.password !== password2) {
      setSideBtn('Passwords do not match');
      return;
    }

    const response = await createCoordinatorAPI(token, data);
    if(response.status !== 'success'){ setSideBtn(response.message); return; }
    setSideBtn('Coordinator created successfully');
    e.target.reset();

  }




  return (<Form onSubmit={submitHandler} onChange={changeHandler}>
    <section className='grid-md-2 gap-md-2'>
      <InputField label="Name" name="name" type="text" id="newCoordinatorName" />
      <InputField label="Email" name="email" type="email" id="newCoordinatorEmail" />
    </section>
    <section className='grid-md-2 gap-md-2'>
      <InputField label="Password" name="password" type="password" id="newCoordinatorPassword" />
      <InputField label="Confirm Password" name="confirmPassword" type="password" id="newCoordinatorConfirmPassword" />
    </section>
    <div className='d-md-flex mt-4 align-center'>
      <button className='btn primary large'>Create new coordinator</button>
      <p className='pl-md-2'>{sideBtn}</p>
    </div>
  </Form>);
}

export default NewAdminForm;