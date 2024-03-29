import { NavLink } from "react-router-dom";

import IconHolder from "../ui/IconHolder";

const UserNavLinks = () => {
  const checkActive = ({isActive}) => isActive ? 'active' : '';

  return (
    <>
      <li>
        <NavLink to='/user/exams' className={checkActive}>
          <IconHolder icon='backup_table' color='#f00' /> 
          Contests
        </NavLink>
      </li>
      <li>
        <NavLink to='/user/practice' className={checkActive}>
          <IconHolder icon='edit_note' color='var(--accent1)' /> 
          Practice
        </NavLink>
      </li>
      <li>
        <NavLink to='/user/results' className={checkActive}>
          <IconHolder icon='auto_graph' color='#fe0' /> 
          Results
        </NavLink>
      </li>
      <li>
        <NavLink to='/user/wallet' className={checkActive}>
          <IconHolder icon='wallet' color='#16cb00' /> 
          Wallet
        </NavLink>
      </li>
    </>
  );
}

export default UserNavLinks;