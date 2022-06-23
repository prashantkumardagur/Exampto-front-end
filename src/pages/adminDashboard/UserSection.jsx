import { useState, useEffect, useContext } from "react";

import Section from "../../components/dashboard/Section";
import PeopleList from "../../components/admin/PeopleList";
import PageLoader from "../../components/ui/PageLoader";

import AuthContext from "../../store/AuthContext";
import { getUsersAPI } from "../../api/admin";



const UserSection = () => {

  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  // Effect to fetch users
  useEffect(() => {
    const getUsers = async () => {
      const response = await getUsersAPI(token);
      if(response.status !== 'success'){ console.log(response.message); return; }

      setUsers(response.data);
      setIsLoading(false);
    }

    getUsers();
  }, [token]);




  return (<>
    <Section heading="User List" >
      {isLoading ? <PageLoader /> : <PeopleList people={users} />}
    </Section>
  </>);
}

export default UserSection;