import { useState, useContext, useEffect } from "react";

import Section from "../../components/dashboard/Section";
import ResultList from "../../components/user/ResultList";
import DataItem from "../../components/ui/DataItem";

import AuthContext from "../../store/AuthContext";
import { getResultsAPI } from "../../api/user";




const ResultSection = () => {

  const { token } = useContext(AuthContext);

  const [results, setResults] = useState(null);




  // effect to get all results of a user
  useEffect(() => {
    const getResults = async () => {
      const response = await getResultsAPI(token);
      if(response.status !== 'success'){ console.log(response.message); return; }
      setResults(response.data);
    }

    getResults();

  }, [token]);




  return (<>
    <Section heading="Analytics" >
      <div className="grid-2 gap-2">
        <DataItem heading='Total Participation' value={results ? results.length : 0} />
        <DataItem heading='Total Earnings' value={0} />
      </div>
    </Section>
    <Section heading="Your results" >
      <ResultList results={results} />
    </Section>
  </>);
}

export default ResultSection;