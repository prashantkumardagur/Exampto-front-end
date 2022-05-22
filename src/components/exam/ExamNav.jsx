import { Link } from "react-router-dom";

const ExamNav = (props) => {
  const { flags, marked, current, changeQuestion } = props;
  let isMobile = window.innerWidth < 768;
  return (   
    <nav className={`${props.navVisibility ? 'show' : ''} sideNav bg1 p-fixed pt-4 t-2 z-5`} onClick={isMobile ? props.toggleNav : null}>
      <h3 className="h5 px-3 pb-3">{props.examName}</h3>
      <div className="Qbtns">
        {flags.map((flag, i) => {
          return (
            <button 
              key={i} 
              className={`Qbtn ${i === current ? 'active' : ''} ${flag === true ? 'flagged' : ''} ${marked[i] ? 'marked' : ''}`}
              onClick={() => changeQuestion(i)}
            >
              {i+1}
            </button>)
        })}
      </div>
      <Link to='/' className="submitBtn p-absolute">Submit Exam</Link>
    </nav>
  );
}

export default ExamNav;