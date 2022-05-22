import { useContext } from 'react';
import { Link } from 'react-router-dom';

import IconButton from "../ui/IconButton";
import IconHolder from "../ui/IconHolder";
import UserIcon from '../ui/UserIcon';
import Notifications from './Notifications';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';

import UserNavLinks from "../user/UserNavLinks";
import AdminNavLinks from "../admin/AdminNavLinks";
import CoordinatorNavLinks from "../coordinator/CoordinatorNavLinks";


const Navigation = (props) => {

  const appContext = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const isMobile = window.innerWidth < 768;

  let navlinks = <UserNavLinks />;
  if (props.type === "admin") navlinks = <AdminNavLinks />;
  if (props.type === "coordinator") navlinks = <CoordinatorNavLinks />;


  return (<>
    <header className="d-flex align-center justify-between bg1 p-fixed p-2 pl-md-3 pr-md-4 w-100vw">
      <div className="d-flex align-center">
        <IconButton icon='menu' onClick={props.toggleNav} />
        <h1 className="d-inline ml-2 h3"><Link to='/' className='txt1'>Exampto</Link></h1>
      </div>

      <aside className="d-flex align-center gap-1 gap-md-2">
        <IconButton icon='brightness_6' onClick={appContext.toggleDarkMode} />
        <Notifications />
        <UserIcon text={user.name} />
        <IconButton icon='logout' color='var(--red)' className='d-mob-none' />
      </aside>
    </header>

    <nav className={`${props.navVisibility ? 'show' : ''} sideNav bg1 p-fixed pt-4 t-2`} onClick={isMobile ? props.toggleNav : null}>
      <ul>{navlinks}</ul>

      <div className="navFooter p-absolute d-flex align-center justify-between w-100 d-md-none">
        <Link to='#' className="userIcon align-center">
          <IconHolder icon='person' fontSize='32px' />
          <span className="txt1">{user.name}</span>
        </Link>

        <IconButton icon='logout' color='var(--red)' className='pr-3' />
      </div>

    </nav>
  </>);
}

export default Navigation;