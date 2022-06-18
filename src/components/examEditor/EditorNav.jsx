import { useContext } from "react";
import { Link } from "react-router-dom";
import IconHolder from "../ui/IconHolder";

import EditorContext from "../../store/EditorContext";

const EditorNav = (props) => {
  const { page, setPage, currentQuestion, changeQuestion, exam } = useContext(EditorContext);
  const answers = exam.answers;

  let isMobile = window.innerWidth < 768;

  return (
  <nav className={`${props.navVisibility ? 'show' : ''} sideNav bg1 p-fixed pt-4 t-2 z-5`} onClick={isMobile ? props.toggleNav : null}>
    <button className={`sideTab ${page === 1? 'active': ''}`} onClick={() => {setPage(1)}}>
      <IconHolder icon='ballot' color="var(--accent1)" />
      Test Details
    </button>
    <button className={`sideTab ${page === 2? 'active': ''}`} onClick={() => {setPage(2)}}>
      <IconHolder icon='view_list' color='#ff4f7b' />
      View all questions
    </button>
    <button className={`sideTab mb-3 ${page === 3? 'active': ''}`} onClick={() => {setPage(3)}}>
      <IconHolder icon='add_circle' color='#0c0' />
      Add question
    </button>

    <div className="Qbtns d-flex flex-wrap align-start px-3 overflow-y-scroll">
      {answers.map((answer, i) => {
        return (
          <button
            key={i}
            className={`Qbtn ${i === currentQuestion && page === 4 ? 'active' : ''}`}
            onClick={() => {changeQuestion(i)}}
          >
            {i + 1}
          </button>
        );
      })}
    </div>

    <Link to='/coordinator/newtest' className="submitBtn p-absolute">Save and exit</Link>
  </nav>
  );
}

export default EditorNav;