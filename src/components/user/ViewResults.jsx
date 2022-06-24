import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Section from '../../components/dashboard/Section';
import FileAccess from '../dashboard/Fileaccess';
import DataItem from '../ui/DataItem';
import PageLoader from '../../components/ui/PageLoader';

import { getResultAPI, downloadSolutionAPI } from '../../api/user';
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




  let size = 0;
  let unit = 'KB';
  if(exam && exam.solutions > 0){
    size = exam.solutions / 1024;
    if(size > 100) { size = size / 1024; unit = 'MB'; }

    size = size.toFixed(2) + ' ' + unit;
  }




  if(isLoading) return <PageLoader />;

  return (<>
    <Section heading='View Results'>
      <div className="grid-2 gap-2">
        <DataItem heading='Marks Scored' value='0' />
        <DataItem heading='Average Score' value='0' />
        <DataItem heading='Rank' value='0' />
        <DataItem heading='Percentile' value='0' />
      </div>
      { exam.solutions > 0 
        ? <FileAccess text={`Solution PDF (${size})`} className='mt-4' api={downloadSolutionAPI} data={exam._id} fileName='solution.pdf' />
        : <FileAccess text='No Solution PDF available' className='mt-4' disabled />
      }
    </Section>

    <Section heading='Your Responses and Answers'>
      <ContentList contents={exam.contents} answers={exam.answers} responses={result.responses} />
    </Section>
  </>);
}

export default ViewResults;