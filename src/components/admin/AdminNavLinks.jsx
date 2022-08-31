import { NavLink } from "react-router-dom";

import IconHolder from "../ui/IconHolder";

const AdminNavLinks = () => {
  const checkActive = ({isActive}) => isActive ? 'active' : '';

  return (
    <>
      <li>
        <NavLink to='/admin/analytics' className={checkActive}>
          <IconHolder icon='analytics' color='#16cb00' /> 
          Analytics
        </NavLink>
      </li>
      <li>
        <NavLink to='/admin/users' className={checkActive}>
          <IconHolder icon='group' color='var(--accent1)' /> 
          Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/admin/coordinators' className={checkActive}>
          <IconHolder icon='manage_accounts' color='#f00' /> 
          Coordinators
        </NavLink>
      </li>
      <li>
        <NavLink to='/admin/payments' className={checkActive}>
          <IconHolder icon='account_balance_wallet' color='#16dd00' /> 
          Payments
        </NavLink>
      </li>
      <li>
        <NavLink to='/admin/messages' className={checkActive}>
          <IconHolder icon='chat' color='#0652dd' /> 
          Messages
        </NavLink>
      </li>
    </>
  );
}

export default AdminNavLinks;