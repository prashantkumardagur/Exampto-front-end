import { useState, useEffect, useCallback } from 'react';
import './EditorPage.css';

import EditorHeader from '../components/examEditor/EditorHeader';
import EditorNav from '../components/examEditor/EditorNav';

import ExamDetails from '../components/examEditor/ExamDetails';
import ViewAllQuestions from "../components/examEditor/ViewAllQuestions";
import NewQuestionForm from "../components/examEditor/NewQuestionForm";
import ViewQuestion from '../components/examEditor/ViewQuestion';

import { EditorContextProvider } from '../store/EditorContext';

const EditorPage = () => {

	const [page, setPage] = useState(1);
	const [navVisibility, setNavVisibility] = useState(true);

	const toggleNav = useCallback(() => { setNavVisibility(!navVisibility) }, [navVisibility]);

  useEffect(() => {
    if(window.innerWidth < 768) setNavVisibility(false);
  }, []);



	let mainPage = 1;
	switch(page) {
		case 1: mainPage = <ExamDetails />; break;
		case 2: mainPage = <ViewAllQuestions />; break;
		case 3: mainPage = <NewQuestionForm />; break;
		case 4: mainPage = <ViewQuestion />; break;
		default: mainPage = <ExamDetails />; break;
	}



	return (<EditorContextProvider setPage={setPage} page={page}>
		<EditorHeader toggleNav={toggleNav} />
		<EditorNav navVisibility={navVisibility} toggleNav={toggleNav} />
		<main className={`${navVisibility ? '' : 'cover'} t-2`}>
			{mainPage}
		</main>
	</EditorContextProvider>);
}

export default EditorPage;