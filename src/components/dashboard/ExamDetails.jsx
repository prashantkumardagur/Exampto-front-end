import DataBox from "../ui/DataBox";

const ExamDetails = (props) => {
  const { exam, sideBtns } = props;

  
  if(!exam) return(<></>);

  return (<div className="exam-details mb-6">
    <DataBox content={exam.category.map((category, i) => `${i ===0 ? '' : ' / '}${category}`)} />
    <DataBox icon='group' content={exam.meta.studentsEnrolled} className='enroll-count' />
    <h2 className="my-3">{exam.name}</h2>
    <p>Number of questions : {exam.totalQuestions} </p>
    <p className="mb-2">Duration : {exam.duration} minutes</p>
    <p>Maximum Marks : {exam.totalQuestions * exam.marking.positive}</p>
    <p className="mb-2">Positive : +{exam.marking.positive} | Negative : -{exam.marking.negative}</p>
    <DataBox color='black' icon='event' content={new Date(exam.startTime).toLocaleString()} /><br />
    <DataBox color='black' icon='wallet' content={`Price : ${exam.price}`} className='mt-5' size='large' />

    <div className="side-btns p-lg-absolute">
      {sideBtns}
    </div>

  </div>);
}

export default ExamDetails;