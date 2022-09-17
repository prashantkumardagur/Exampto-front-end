const ExamInstructions = (props) => {

  let content = '';

  if(props.type === 'user') content = 
  <ul className="mt-3">
    <li>The Player should login into the portal at least 10 minutes before the commencement of the Test.</li>
    <li>Charge the Laptop / Smart Phone / Tablet well in advance to last for at least 2 hours.</li>
    <li>The device should have continuous internet connectivity.</li>
    <li>Do NOT switch tabs during the Test. System would watch such unwanted activities. If found doing such activities, 
      it will be treated as malpractice.</li>
    <li>The rank / percentile will be based on students marks and the time at which student started the exam. (no student will
      be allocated with the same rank and same percentile.</li>
  </ul>

  else content = 
  <ul className="mt-3">
    <li>The Player should login into the portal at least 10 minutes before the commencement of the Test.</li>
    <li>Charge the Laptop / Smart Phone / Tablet well in advance to last for at least 2 hours.</li>
    <li>The device should have continuous internet connectivity.</li>
    <li>Do NOT switch tabs during the Test. System would watch such unwanted activities. If found doing such activities, 
      it will be treated as malpractice.</li>
    <li>The rank / percentile will be based on students marks and the time at which student started the exam. (no student will
      be allocated with the same rank and same percentile.</li>
  </ul>



  return (<div className="exam-instructions mt-6">
    <h2>Instructions and Guidelines</h2>
    {content}
  </div>);
}

export default ExamInstructions;