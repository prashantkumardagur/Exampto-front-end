import { useContext } from "react";

import IconHolder from "../ui/IconHolder";

import ExamContext from "../../store/ExamPageContext";

const MainArea = (props) => {
  const { exam, currentQuestion, answers, changeQuestion, markAnswer, flags, toggleFlag} = useContext(ExamContext);

  const content = exam.contents[currentQuestion];
  const answer = answers[currentQuestion];
  const flag = flags[currentQuestion];

  return (
    <main className={`${props.navVisibility ? '' : 'cover'} t-2`}>
      <h5 className="ch txt2 font-1">Question {currentQuestion+1}</h5>
      <p className="py-2">{content.question}</p>
      <div className="options pt-2 pb-3">
        {content.options.map((option, i) => 
          <div key={i} className={`option ${answer === i+1 ? 'active' : ''}`} onClick={() => {markAnswer(i+1)}}>{option}</div> 
        )}
      </div>

      <button className="btn primary mr-2" onClick={() => {markAnswer(0)}}>Clear Response</button>
      <button className="btn primary" onClick={toggleFlag}>{flag ? 'Unflag' : 'Flag'} Question</button>

      <div className="navigationBtns pt-6 d-flex">
        <button className="btn primary large mr-2 d-inflex align-center gap-1" onClick={() => changeQuestion(currentQuestion-1)}>
          <IconHolder icon='west' color='white' />
          Previous
        </button>
        <button className="btn primary large d-inflex align-center gap-1" onClick={() => changeQuestion(currentQuestion+1)}>
          Next
          <IconHolder icon='east' color='white' />
        </button>
      </div>
    </main>
  );
}

export default MainArea;