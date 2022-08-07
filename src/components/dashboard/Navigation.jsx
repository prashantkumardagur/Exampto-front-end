import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import IconButton from "../ui/IconButton";
import IconHolder from "../ui/IconHolder";
import UserIcon from '../ui/UserIcon';
import Notifications from './Notifications';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';
import SearchBar from './SearchBar';


const UserNavLinks = React.lazy(() => import('../user/UserNavLinks'));
const AdminNavLinks = React.lazy(() => import('../admin/AdminNavLinks'));
const CoordinatorNavLinks = React.lazy(() => import('../coordinator/CoordinatorNavLinks'));




const Navigation = (props) => {
  const { toggleDarkMode, setModel } = useContext(AppContext);
  const { person, logout } = useContext(AuthContext);

  const isMobile = window.innerWidth < 768;

  const [navlinks, setNavlinks] = useState('');



  // Effect to set navlinks for header
  useEffect(() => {
    if(props.type === 'user') setNavlinks(<UserNavLinks />);
    else if (props.type === "admin") setNavlinks(<AdminNavLinks />);
    else setNavlinks(<CoordinatorNavLinks />);

  }, [props]);



  // Handler for logout button
  const logoutHandler = () => { 
    setModel({
      heading: 'Logout ?',
      text: 'Are you sure you want to logout ?',
      onContinue : logout
    })
   }




  return (<>
    {/* The top navigation element */}
    <header className="d-flex align-center justify-between bg1 p-fixed p-2 pl-md-3 pr-md-4 w-100vw">
      <div className="d-flex align-center">
        <IconButton icon='menu' onClick={props.toggleNav} />
        <h1 className="d-inline ml-2 h3"><Link to='/' className='txt1'>Exampto</Link></h1>
      </div>

      <SearchBar className='d-none d-lg-flex' />

      <aside className="d-flex align-center gap-1 gap-md-2">
        <IconButton icon='brightness_6' onClick={toggleDarkMode} style={{display: "none"}} />
        <Notifications />
        <UserIcon text={person.name} linkTo={'profile'} />
        <IconButton icon='logout' color='var(--red)' className='d-mob-none' onClick={logoutHandler} />
      </aside>
    </header>


    {/* Side navigation element */}
    <nav className={`${props.navVisibility ? 'show' : ''} sideNav bg1 p-fixed pt-4 t-2`} onClick={isMobile ? props.toggleNav : null}>
      <ul>{navlinks}</ul>

      <div className="navFooter p-absolute d-flex align-center justify-between w-100 d-md-none">
        <Link to='#' className="userIcon align-center">
          <IconHolder icon='person' fontSize='32px' />
          <span className="txt1">{person.name}</span>
        </Link>

        <IconButton icon='logout' color='var(--red)' className='pr-3' onClick={logoutHandler} />
      </div>

    </nav>
  </>);
}

export default Navigation;