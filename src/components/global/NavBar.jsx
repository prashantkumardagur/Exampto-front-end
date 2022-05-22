import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

const NavBar = () => {
	const authContext = useContext(AuthContext);
	let dashboardLink = '/';

	if(authContext.isLoggedIn) {
		switch(authContext.role) {
			case 'admin': dashboardLink = '/admin'; break;
			case 'user': dashboardLink = '/user'; break;
			case 'coordinator': dashboardLink = '/coordinator'; break;
			default: dashboardLink = '/';
		}
	}

	return (<nav className='navbar w-100vw p-fixed d-flex align-center px-5vw'>
		<div className="leadingName h4">Exampto</div>
		<ul className="nav-links ml-auto d-flex gap-2">
			<NavLink to="/">Home</NavLink>
			<NavLink to="/attemptexam/key">ExamPage</NavLink>
			<NavLink to="/auth/login">Login</NavLink>
			{authContext.isLoggedIn ? <>
				<NavLink to={dashboardLink}>Dashboard</NavLink>
			</> : <>
				<NavLink to="/auth/signup">SignUp</NavLink>
				<NavLink to="/auth/adminlogin">AdminLogin</NavLink>
			</>}
		</ul>
	</nav>);
}

export default NavBar;