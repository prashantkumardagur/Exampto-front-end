import { useContext } from 'react';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';

import DataBox from '../ui/DataBox';
import IconButton from "../ui/IconButton";
import UserIcon from '../ui/UserIcon';
import Timer from './Timer';

const ExamHeader = (props) => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  return (
    <header className="d-flex align-center justify-between bg1 p-fixed p-2 pl-md-3 pr-md-4 w-100vw">
      <div className="d-flex align-center">
        <IconButton icon='menu' onClick={props.toggleNav} />
        <h1 className="d-none d-md-inline mx-2 h3">Exampto</h1>
        <DataBox color='red' content="Live exam" icon='radio_button_checked' />
      </div>

      <aside className="d-flex align-center gap-1 gap-md-2">
        <IconButton icon='brightness_6' onClick={appContext.toggleDarkMode} />
        <UserIcon text={authContext.user.name} />
        <Timer time={'90 : 30'} />
      </aside>
    </header>
  );
}

export default ExamHeader;