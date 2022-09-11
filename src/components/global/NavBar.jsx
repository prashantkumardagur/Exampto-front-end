import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import IconHolder from '../ui/IconHolder';

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
	const [isOpen, setIsOpen] = useState(false);

	window.addEventListener('scroll', () => {
		if(window.scrollY < 100 && !isOpen) setType(2);
		else setType(1);
	})


	const mobMenuHandler = (e) => {
		setIsOpen((prevState) => {
			if(window.scrollY < 100 && prevState) setType(2);
			else setType(1)
			return !prevState
		});
	}




	
	return (<nav className={`navbar w-100vw p-fixed d-flex align-center t-2 px-5vw ${type === 1 ? '' : 'dissolve-nav'}`}>
		<div className="leadingName h3"><Link to={'/'}>
			<img src={type === 2 && props.home ? '/images/full_logo.png' : '/images/b_full_logo.png'} alt='Exampto' />
		</Link></div>
		<ul className="nav-links ml-auto d-none d-md-flex gap-4 align-center">
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
		<div className={`d-block d-md-none ml-auto menu-icon ${props.home ? 'home-nav-icon' : ''}`} onClick={mobMenuHandler}>
			<IconHolder color='inherit' icon='menu' fontSize="1.6rem" />
		</div>
		<ul className="nav-links-mob bg-white d-flex d-md-none gap-3 p-absolute p-3" 
			style={isOpen ? null : {display: 'none'}}
			onClick={mobMenuHandler}
			>

			<NavLink to="/">Home</NavLink>
			<NavLink to="/contact-us">Contact Us</NavLink>
			{authContext.isLoggedIn ? <>
				<NavLink to={dashboardLink}>Dashboard</NavLink>
				<button onClick={authContext.logout} className='cursor-pointer hbtn htype1 mt-4 text-center'>Logout</button>
			</> : <>
				<NavLink to="/auth/login">Login</NavLink>
				<NavLink to="/auth/signup" className="hbtn htype1 mt-4 text-center">Register</NavLink>
			</>}
		</ul>
	</nav>);
}

export default React.memo(NavBar);