import { useState, useRef, useEffect, useContext, useCallback } from "react";

import IconHolder from "../ui/IconHolder";
import ExamList from "./ExamList";

import AuthContext from "../../store/AuthContext";
import { searchExams } from "../../api/runAPI";




const SearchResults = (props) => {
  return (
  <div className="search-results p-absolute p-2 rounded-1">
    {props.exams.length === 0 ? <>
      <img src="/svg/search.svg" alt="" />
      <p className="fs-2 txt2 mt-3 text-center"> Search functionality is currently under maintainance. Stay tuned...</p>
    </> : <>
      <ExamList list={props.exams} linkTo={`/${props.role}/viewexam/`} />
    </>}
  </div>)
}




const SearchBar = (props) => {

  const {token, role} = useContext(AuthContext);
  const searchInput = useRef();


  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(false);




  // Input Focus Handler
  const focusHandler = () => {
    setVisible(true);
  }

  // Input Blur Handler
  const blurHandler = () => {
    setTimeout(() => {
      searchInput.current.blur();
      setVisible(false);
    }, 400);
    
  }


  // Search Input Change Handler
  const inputHandler = (e) => {
    setSearch(e.target.value);
    if(e.keyCode === 13) searchHandler();
  }


  // Search Handler
  const searchHandler = useCallback(async () => {
    if(search.length === 0) { setResults([]); return;}
    let response = await searchExams(token, role, search);
    if(response.status !== "success") { console.log(response.message); return;}
    setResults(response.data);
  }, [search, role, token]);



  // Effect to search for exams
  useEffect(() => {
    const searchTimer = setTimeout( searchHandler, 1000 );

    return () => clearTimeout(searchTimer);
  }, [search, searchHandler]);





  return (<div className="p-relative" onClick={() => {searchInput.current.focus();}}>
    <div className={`search-bar align-center rounded-1 px-2 justify-between mx-2 ${props.className}`}>
      <input type='text' 
            placeholder="Search Exampto" 
            onKeyUp={inputHandler} 
            onFocus={focusHandler} 
            onBlur={blurHandler}
            ref={searchInput}
      />
      <IconHolder icon='search' className='cursor-default' />
    </div>
    {visible && <SearchResults exams={results} role={role} />}
  </div>);
}

export default SearchBar;