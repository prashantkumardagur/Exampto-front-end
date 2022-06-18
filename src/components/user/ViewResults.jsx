import Section from '../../components/dashboard/Section';
import FileAccess from '../dashboard/FIleAccess';
import DataItem from '../ui/DataItem';

const ViewResults = (props) => {
  return (<>
    <Section heading='View Results'>
      <div className="grid-2 gap-2">
        <DataItem heading='Marks Scored' value='0' />
        <DataItem heading='Average Score' value='0' />
        <DataItem heading='Rank' value='0' />
        <DataItem heading='Percentile' value='0' />
      </div>
      <FileAccess text='Solution PDF (25.6 MB)' icon='download' className='mt-4' />
    </Section>
  </>);
}

export default ViewResults;