import React from "react";


// Content Item Component
const ContentItem = (props) => {
  const {content:{question, options}, answer, response} = props;

  return (
  <div className="contentItem">
    <div className="ch font-1">Question {props.num}</div>
    <p className="question">{question}</p>
    {options.map((option, index) => 
      <div 
          key={index} 
          className={`option ${answer === index+1 ? 'correct' : ''} ${response === index+1 ? 'selected' : ''}`}
      >{option}</div> 
    )}
  </div>);
}



// Content List Component
const ContentList = (props) => {
  const {contents, answers, responses} = props;

  return (
  <div className="contentList">
    {contents.map((item, index) => 
        <ContentItem num={index+1} key={index} content={item} answer={answers[index]} response={ responses ? responses[index]: null} /> 
    )}
  </div>);
}

export default React.memo(ContentList);