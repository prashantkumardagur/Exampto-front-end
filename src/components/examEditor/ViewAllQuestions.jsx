import { useContext } from "react";

import ContentList from "../dashboard/ContentList";

import EditorContext from "../../store/EditorContext";

const ViewAllQuestions = () => {
  const { exam } = useContext(EditorContext);

  return (<>
  <h2 className="mb-5">View All Questions</h2>
  { exam.answers.length > 0 ? 
    <ContentList contents={exam.contents} answers={exam.answers} />
    : 
    <p className="mt-5">No questions yet</p>
  }
  </>);
}

export default ViewAllQuestions;