import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import GlobalLoader from "../components/ui/GlobalLoader";

import AuthContext from "./AuthContext";
import { getExamAPI } from "../api/editor";


const EditorContext = React.createContext({
  exam: {},
  currentQuestion: 0,
  changeQuestion: () => {},
  page: 1,
  setPage: () => {},
  token: null,
});

export default EditorContext;




export const EditorContextProvider = (props) => {
  
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const { setPage, page } = props;

    const [isLoading, setIsLoading] = useState(true);

    const [exam, setExam] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);



    // Initialize editor
    useEffect(() => {

      const getExamData = async () => {
        let response = await getExamAPI(token, id);
        if(response.status !== 'success') { console.log(response.message); navigate('/coordinator'); return; }

        setExam(response.data);
        setCurrentQuestion(0);
        setIsLoading(false);
      }

      getExamData();

    }, [id, token, navigate]);




    // Changes current question
    const changeQuestion = (n) => {
      if(n < 0 || n >= exam.answers.length) return;
      setCurrentQuestion(n);
      setPage(4);
    }



    if(isLoading) return <GlobalLoader />;

    return (
      <EditorContext.Provider value={{token, exam, currentQuestion, changeQuestion, page, setPage, setExam}}>
        {props.children}
      </EditorContext.Provider>
    );
}