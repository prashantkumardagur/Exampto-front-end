import { NavLink } from "react-router-dom";

import IconHolder from "../ui/IconHolder";

const CoordinatorNavLinks = () => {
  const checkActive = ({isActive}) => isActive ? 'active' : '';

  return (
    <ul>
      <li>
        <NavLink to='/coordinator/analytics' className={checkActive}>
          <IconHolder icon='analytics' color='#f00' /> 
          Analytics
        </NavLink>
      </li>
      <li>
        <NavLink to='/coordinator/mytests' className={checkActive}>
          <IconHolder icon='file_copy' color='#16cb00' /> 
          My Tests
        </NavLink>
      </li>
      <li>
        <NavLink to='/coordinator/newtest' className={checkActive}>
          <IconHolder icon='add_circle' color='var(--accent1)' /> 
          New Test
        </NavLink>
      </li>
    </ul>
  );
}

export default CoordinatorNavLinks;