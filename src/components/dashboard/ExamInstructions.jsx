const ExamInstructions = (props) => {

  let content = '';

  if(props.type === 'user') content = 
  <ul className="mt-3">
    <li>The Player should login into the portal at least 10 minutes before the commencement of the Test.</li>
    <li>Charge the Laptop / Smart Phone / Tablet well in advance to last for at least 2 hours.</li>
    <li>The device should have continuous internet connectivity.</li>
    <li>Do NOT switch tabs during the Test. System would watch such unwanted activities. If found doing such activities, 
      it will be treated as malpractice.</li>
  </ul>

  else content = 
  <ul className="mt-3">
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt magnam quasi nihil! Repudiandae omnis 
      impedit iure facilis voluptatibus quod ea, error excepturi. Consectetur aliquam ratione quam, veniam error 
      provident ipsa esse, neque voluptatum pariatur magnam sed quibusdam ab iure eligendi ea excepturi atque? Expedita 
      amet delectus, tempore voluptatibus qui error?</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, deleniti?</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quos quod doloribus laborum praesentium 
      explicabo dolorem fugiat? Quos, ad esse?</li>
    <li>This is an instruction.</li>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. At laboriosam ea dolores quos cupiditate natus in. 
      Aperiam magni architecto quis assumenda inventore a, iusto tempora?</li>
  </ul>



  return (<div className="exam-instructions mt-6">
    <h2>Instructions and Guidelines</h2>
    {content}
  </div>);
}

export default ExamInstructions;