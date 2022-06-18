import React from "react";


const ContentItem = (props) => {
  const {content:{question, options}, answer} = props;
  return (
  <div className="contentItem">
    <div className="ch font-1">Question {props.num}</div>
    <p className="question">{question}</p>
    {options.map((option, index) => <div key={index} className={`option ${answer === index+1 ? 'correct' : ''}`}>{option}</div> )}
  </div>);
}


const ContentList = (props) => {
  const {contents, answers} = props;
  return (
  <div className="contentList">
    {contents.map((item, index) => <ContentItem num={index+1} key={index} content={item} answer={answers[index]} /> )}
  </div>);
}

export default React.memo(ContentList);