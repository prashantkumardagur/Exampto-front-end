import { useState } from "react";

import IconButton from "../ui/IconButton";

const NotificationCard = (props) => {
  return(
    <div className={`${props.visibility ? 'show' : ''} notificationCard bg1 p-fixed p-3 t-2`}>
      <h3 className="d-flex justify-between align-center">
        Notifications 
        <IconButton icon='close' fontSize='24px' onClick={props.close} />
      </h3>
    </div>
  )
}

const Notifications = () => {
  const [visibility, setVisibility] = useState(false);

  return (<>
    <IconButton icon='notifications' onClick={() => setVisibility(!visibility)} />
    <NotificationCard visibility={visibility} close={ () => {setVisibility(false)} } />
  </>);
}

export default Notifications;