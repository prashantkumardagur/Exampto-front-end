import { useState, useContext, useEffect } from "react";

import Section from "../../components/dashboard/Section";
import PeopleList from "../../components/admin/PeopleList";
import PageLoader from "../../components/ui/PageLoader";
import NewAdminForm from "../../components/admin/NewAdminForm";

import AuthContext from "../../store/AuthContext";
import { getCoordinatorsAPI } from "../../api/admin";




const CoordinatorSection = () => {

  const { token } = useContext(AuthContext);
  
  const [coordinators, setCoordinators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  // Effect to fetch coordinators
  useEffect(() => {
    const getCoordinators = async () => {
      const response = await getCoordinatorsAPI(token);
      if(response.status !== 'success'){ console.log(response.message); return; }

      setCoordinators(response.data);
      setIsLoading(false);
    }

    getCoordinators();
  }, [token]);




  return (<>
    <Section heading="Add new coordinator" >
      <NewAdminForm />
    </Section>
    <Section heading="Coordinator List">
      {isLoading ? <PageLoader /> : <PeopleList people={coordinators} />}
    </Section>
  </>);
}

export default CoordinatorSection;