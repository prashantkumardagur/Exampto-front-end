import { useState, useRef } from "react";

import IconHolder from "../ui/IconHolder";




const SearchResults = (props) => {
  return (
  <div className="search-results p-absolute p-2 rounded-1 text-center">
    <img src="/svg/search.svg" alt="" />
    <p className="fs-2 txt2 mt-3"> Search functionality is currently under maintainance. Stay tuned...</p>
  </div>)
}




const SearchBar = (props) => {

  const searchInput = useRef();
  const [visible, setVisible] = useState(false);




  // Input Focus Handler
  const focusHandler = () => {
    setVisible(true);
  }

  // Input Blur Handler
  const blurHandler = () => {
    setVisible(false);
  }


  // Search Input Change Handler
  const inputHandler = (e) => {
    if(e.keyCode === 13) searchHandler(e);
  }


  // Search Handler
  const searchHandler = (e) => {
    console.log(`Searched for ${e.target.value}`);
  }




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
    {visible && <SearchResults />}
  </div>);
}

export default SearchBar;