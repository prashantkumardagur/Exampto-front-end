import { useContext } from 'react';
import { Link } from 'react-router-dom';

import IconButton from "../ui/IconButton";
import IconHolder from "../ui/IconHolder";

import Notifications from './Notifications';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';

const Header = (props) => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  return (
    <header className="d-flex align-center justify-between bg1 p-fixed pl-3 pr-4 w-100vw">
      <div className="d-flex align-center">
        <IconButton icon='menu' onClick={props.toggleNav} />
        <h1 className="d-inline ml-2 h3"><Link to='/' className='txt1'>Exampto</Link></h1>
      </div>

      <aside className="d-flex align-center gap-2">
        <IconButton icon='brightness_6' onClick={appContext.toggleDarkMode} />
        <Notifications />

        <Link to='#' className="userIcon d-flex align-center pl-1 pr-3 rounded-5">
          <IconHolder icon='person' fontSize='32px' />
          <span className="pl-1 txt1">{authContext.user.name}</span>
        </Link>
        
        <IconButton icon='logout' color='var(--red)' />
      </aside>
    </header>
  );
}

export default Header;