import { Link } from "react-router-dom";



const ResultList = (props) => {
  const { results } = props;


  return (
  <div className="result-list">
    <div className="t-head d-grid">
      <p>Exam Name</p>
      <p>Score</p>
      <p>Rank</p>
      <p>Percentile</p>
    </div>
    {results && results.map((result, index) => 
      <Link to={`/user/viewexam/${result.exam._id}/view-results`} className="d-grid" key={index}>
        <p>{result.exam.name}</p>
        <p>{result.marksAllocated}</p>
        <p>{result.rank}</p>
        <p>{result.percentile}</p>
      </Link>
    )}
  </div>)
}

export default ResultList;