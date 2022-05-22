import IconHolder from "../ui/IconHolder";

const MainArea = (props) => {
  const { content, current, answer, changeQuestion } = props;

  return (
    <main className={`${props.navVisibility ? '' : 'cover'} t-2`}>
      <h5 className="ch txt2 font-1">Question {current+1}</h5>
      <p className="py-2">{content.question}</p>
      <div className="options pt-2 pb-3">
        {content.options.map((option, i) => 
          <div key={i} className={`option ${answer === i+1 ? 'active' : ''}`} onClick={() => {props.onAnswerSelect(i+1)}}>{option}</div> 
        )}
      </div>

      <button className="btn primary mr-2" onClick={props.onClear}>Clear Response</button>
      <button className="btn primary" onClick={props.onFlag}>{props.flag ? 'Unflag' : 'Flag'} Question</button>

      <div className="navigationBtns pt-6 d-flex">
        <button className="btn primary large mr-2 d-inflex align-center gap-1" onClick={() => changeQuestion(current-1)}>
          <IconHolder icon='west' color='white' />
          Previous
        </button>
        <button className="btn primary large d-inflex align-center gap-1" onClick={() => changeQuestion(current+1)}>
          Next
          <IconHolder icon='east' color='white' />
        </button>
      </div>
    </main>
  );
}

export default MainArea;