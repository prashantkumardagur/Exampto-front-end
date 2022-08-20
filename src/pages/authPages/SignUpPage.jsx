import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BtnLink from "../../components/ui/Buttons/BtnLink";
import DataBox from "../../components/ui/DataBox";
import Form from "../../components/ui/Forms/Form";
import InputField from "../../components/ui/Forms/InputField";
import LoadingIcon from "../../components/ui/LoadingIcon";

import { signUpAPI } from "../../api/auth";
import SelectField from "../../components/ui/Forms/SelectField";




const SignUpPage = () => {

    const [state, setState] = useState(null);
    const navigate = useNavigate()



    // handles the signup form submit
    const submitHandler = async (e) => {
        setState({msg:<span><LoadingIcon /> Signing you up</span>, color:"accent"})
        const formData = new FormData(e.target);

        const password2 = formData.get("password2");
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            program: formData.get("program")
        };

        if(data.password !== password2) {
            setState({msg:"Passwords do not match", color:"red"});
            return;
        }

        const response = await signUpAPI(data);
        if(response.status !== 'success'){
            setState({msg:response.message, color:"red"});
            return;
        }

        e.target.reset();
        setState({msg:"Successfully signed up", color:"green"});
        setTimeout(() => { navigate('/') }, 1000);
    }




    return (
    <div className="authForm m-auto my-5 p-3 border-2 rounded-2">
        <h3 className="mb-2">Sign Up</h3>
        {state && <DataBox content={state.msg} color={state.color} size='small' />}
        <Form onSubmit={submitHandler}>
            <InputField label='Name' id='name' name='name' />
            <SelectField label='Program' name='program' defaultValue='JEE' >
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value='CDS'>CDS</option>
                <option value='BANK'>BANK</option>
                <option value='NDA'>NDA</option>
                <option value='UPSC'>UPSC</option>
                <option value="GATE">GATE</option>
            </SelectField>
            <InputField label='Email' id='email' name='email' />
            <InputField label='Password' id='password' name='password' type='password' />
            <InputField label='Confirm Password' id='password2' name='password2' type='password' />
            <button className="btn primary mt-4">Sign Up</button>
            <p className="d-inline pl-2">OR <BtnLink to='/auth/login' text='Login' /> instead.</p>
        </Form>
    </div>)
}

export default SignUpPage;