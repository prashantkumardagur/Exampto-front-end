import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import BtnLink from "../../components/ui/Buttons/BtnLink";
import InputField from "../../components/ui/Forms/InputField";
import Form from "../../components/ui/Forms/Form";
import DataBox from "../../components/ui/DataBox";
import LoadingIcon from "../../components/ui/LoadingIcon";

import AuthContext from "../../store/AuthContext";

const LoginPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [state, setState] = useState(null);

    const submitHandler = async (e) => {
        setState({ msg: <span><LoadingIcon /> Trying to login</span>, color: "accent" });
        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const response = await authContext.login(data);
        if (response !== "Login Successful") {
            setState({ msg: response, color: "red" });
            return;
        }

        e.target.reset();
        setState({ msg: "Successfully logged in", color: "green" });
        setTimeout(() => { navigate("/") }, 1000);
    }

    return (<div className="authForm m-auto my-5 p-3 border-2 rounded-2">
    <h3 className="mb-2">Login to Exampto</h3>
    {state && <DataBox content={state.msg} color={state.color} size='small' />}
    <Form onSubmit={submitHandler}>
        <InputField label='Email' id='email' name='email' />
        <InputField label='Password' id='password' name='password' type='password' />
        <button className="btn primary mt-4">Login</button>
        <p className="d-inline pl-2">OR <BtnLink to='/auth/signup' text='SignUp' /> instead.</p>
    </Form>
</div>)
}

export default LoginPage;