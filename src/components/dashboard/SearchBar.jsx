import IconHolder from "../ui/IconHolder";




const SearchBar = (props) => {


  // Search Input Change Handler
  const inputHandler = (e) => {
    if(e.keyCode === 13) searchHandler(e);
  }


  // Search Handler
  const searchHandler = (e) => {
    console.log(`Searched for ${e.target.value}`);
  }




  return (
  <div className={`search-bar align-center rounded-2 px-2 justify-between mx-2 ${props.className}`}>
    <input type='text' placeholder="Search Exampto" onKeyUp={inputHandler} />
    <IconHolder icon='search' className='cursor-default' />
  </div>);
}

export default SearchBar;