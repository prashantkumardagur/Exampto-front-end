import { useContext } from 'react';

import Form from '../components/ui/Forms/Form';
import InputField from '../components/ui/Forms/InputField';
import SelectField from '../components/ui/Forms/SelectField';

import AuthContext from '../store/AuthContext';
import AppContext from '../store/AppContext';
import { changePasswordAPI, updateProfileAPI } from '../api/auth';




const ProfilePage = (props) => {
  const { token, person, updatePerson } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);


  const passwordSubmitHandler = async (e) => {
    const formData = new FormData(e.target);
    const data = {
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
      email: formData.get('email')
    };

    const response = await changePasswordAPI(token, data);
    if(response.status === 'success') showAlert("Password changed successfully");
    e.target.reset();

  }


  const profileSubmitHandler = async(e) => {
    const formData = new FormData(e.target);
    const data = {
      phone: formData.get('phone'),
      name: formData.get('name'),
      gender: formData.get('gender'),
      program: formData.get('program')
    };

    const response  = await updateProfileAPI(token, data);
    if(response.status !== 'success') { console.log(response.message); return; }
    updatePerson(data);
    showAlert("Profile updated successfully");
  }



  
  return (
  <div className="profile-page">
    <h2 className='mb-5'>Profile</h2>
    
    <Form onSubmit={passwordSubmitHandler}>
      <h6 className="mb-1 accent1 ch">Account</h6>
      <InputField label="Email" id="profile-email" type="email" name="email" value={person.email} readOnly/>
      <div className="grid-md-2 gap-3">
        <InputField label="Current Password" id="profile-current-password" type="password" name="currentPassword" required/>
        <InputField label="New Password" id="profile-new-password" type="password" name="newPassword" required/>
      </div>
      <button className="btn primary mt-4">Update Password</button>
    </Form>

    <Form className="mt-6" onSubmit={profileSubmitHandler}>
      <h6 className="mb-1 accent1 ch">Personal</h6>
      <div className="grid-md-2 gap-3">
        <InputField label="Full Name" type="text" name="name" id="profile-name" value={person.name} required/>
        <SelectField label="Program" name="program" defaultValue={person.program} id="profile-program" required>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value='CDS'>CDS</option>
          <option value='BANK'>BANK</option>
          <option value='NDA'>NDA</option>
          <option value='UPSC'>UPSC</option>
          <option value="GATE">GATE</option>
        </SelectField>
      </div>
      <div className="grid-md-2 gap-3">
        <InputField label="Whatsapp Number" type="text" name="phone" id="profile-phone" value={person.phone} required/>
        <SelectField label="Gender" name="gender" defaultValue={person.gender} id="profile-gender" required>
          <option value={undefined} disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </SelectField>
      </div>
      <button className="btn primary mt-4" type='submit'>Update Profile</button>
    </Form>
    
  </div>);
}

export default ProfilePage;