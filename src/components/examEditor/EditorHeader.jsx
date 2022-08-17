import React, { useContext } from "react";
import { Link } from "react-router-dom";

import IconButton from "../ui/IconButton";
import Notifications from "../dashboard/Notifications";
import UserIcon from "../ui/UserIcon";

import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";




const EditorHeader = (props) => {

  const { person, logout } = useContext(AuthContext);
  const appContext = useContext(AppContext);

  

  return (
  <header className="d-flex align-center justify-between bg1 p-fixed p-2 pl-md-3 pr-md-4 w-100vw">
    <div className="d-flex align-center">
      <IconButton icon='menu' onClick={props.toggleNav} />
      <h1 className="d-inline ml-2 h3"><Link to='/' className='txt1'>Exampto</Link></h1>
    </div>

    <aside className="d-flex align-center gap-1 gap-md-2">
      <IconButton style={{display: "none"}} icon='brightness_6' onClick={appContext.toggleDarkMode} />
      <Notifications />
      <UserIcon text={person.name} />
      <IconButton icon='logout' color='var(--red)' className='d-mob-none' onClick={logout} />
    </aside>
  </header>
);
}

export default React.memo(EditorHeader);