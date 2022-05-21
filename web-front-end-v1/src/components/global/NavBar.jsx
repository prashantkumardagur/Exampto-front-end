import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (<nav className='navbar w-100vw p-fixed d-flex align-center px-5vw'>
        <div className="leadingName h4">Exampto</div>
        <ul className="nav-links ml-auto d-flex gap-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/user">UserDashboard</NavLink>
            <NavLink to="/admin">AdminDashboard</NavLink>
            <NavLink to="/coordinator">CoordinatorDashboard</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
            <NavLink to="/auth/signup">SignUp</NavLink>
            <NavLink to="/auth/adminlogin">AdminLogin</NavLink>
        </ul>
    </nav>);
}

export default NavBar;