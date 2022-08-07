import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';




const NavBar = (props) => {
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



	const [type, setType] = useState( props.home ? 2 : 1 );

	window.addEventListener('scroll', () => {
		if(window.scrollY < 100) setType(2);
		else setType(1);
	})



	
	return (<nav className={`navbar w-100vw p-fixed d-flex align-center t-2 px-5vw ${type === 1 ? '' : 'dissolve-nav'}`}>
		<div className="leadingName h3">Exampto</div>
		<ul className="nav-links ml-auto d-flex gap-4 align-center">
			<NavLink to="/">Home</NavLink>
			<NavLink to="/contact-us">Contact Us</NavLink>
			{authContext.isLoggedIn ? <>
				<NavLink to={dashboardLink}>Dashboard</NavLink>
				<button onClick={authContext.logout} className='cursor-pointer'>Logout</button>
			</> : <>
				<NavLink to="/auth/login">Login</NavLink>
				<NavLink to="/auth/signup" className="hbtn htype1">Register</NavLink>
			</>}
		</ul>
	</nav>);
}

export default React.memo(NavBar);