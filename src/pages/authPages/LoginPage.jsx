import { useContext } from "react";

import AuthContext from "../../store/AuthContext";

const LoginPage = () => {
    const authContext = useContext(AuthContext);

    const user = {
        email: 'panditprajjawal@gmail.com',
        name: 'Prajjawal Pandit',
        role: 'user',
        wallet: 0
    }

    const login = (role) => {
        user.role = role;
        authContext.login(user);
    }

    return (<>
        <h2>This is Login Page</h2>
        <button className="p-2 btn primary m-2" onClick={ () => { login('user') } }>User Login</button>
        <button className="p-2 btn primary m-2" onClick={ () => { login('admin') } }>Admin Login</button>
        <button className="p-2 btn primary m-2" onClick={ () => { login('coordinator')} }>Coordinator Login</button>
        <button className="p-2 btn primary m-2" onClick={ authContext.logout }>Logout</button>
    </>)
}

export default LoginPage;