import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Section from '../../components/dashboard/Section';
import FileAccess from '../dashboard/FileAccess';
import DataItem from '../ui/DataItem';
import PageLoader from '../../components/ui/PageLoader';

import { getResultAPI } from '../../api/user';
import AuthContext from '../../store/AuthContext';
import ContentList from '../dashboard/ContentList';




const ViewResults = (props) => {

  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [exam, setExam] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  
  // Effect to get result from API
  useEffect(() => {
    const getResult = async () => {
      const response = await getResultAPI(token, id);
      if (response.status !== 'success') {
        console.log(response.message);
        return;
      }

      setExam(response.data.exam);
      setResult(response.data.result);
      setIsLoading(false);
    }

    getResult();
  }, [id, token]);





  if(isLoading) return <PageLoader />;

  return (<>
    <Section heading='View Results'>
      <div className="grid-2 gap-2">
        <DataItem heading='Marks Scored' value='0' />
        <DataItem heading='Average Score' value='0' />
        <DataItem heading='Rank' value='0' />
        <DataItem heading='Percentile' value='0' />
      </div>
      <FileAccess text='Solution PDF (25.6 MB)' icon='download' className='mt-4' btnText='Download' />
    </Section>

    <Section heading='Your Responses and Answers'>
      <ContentList contents={exam.contents} answers={exam.answers} responses={result.responses} />
    </Section>
  </>);
}

export default ViewResults;