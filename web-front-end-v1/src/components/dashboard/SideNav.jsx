import UserNavLinks from "../user/UserNavLinks";
import AdminNavLinks from "../admin/AdminNavLinks";
import CoordinatorNavLinks from "../coordinator/CoordinatorNavLinks";

const SideNav = (props) => {
  let navlinks = <UserNavLinks />;
  if (props.type === "admin") navlinks = <AdminNavLinks />;
  if (props.type === "coordinator") navlinks = <CoordinatorNavLinks />;

  return (
    <nav className={`${props.visible ? 'show' : ''} sideNav p-fixed pt-4 t-2`}>
      {navlinks}
    </nav>
  );
}

export default SideNav;