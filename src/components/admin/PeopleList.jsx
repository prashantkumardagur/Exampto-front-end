const PeopleList = (props) => {
  const { people } = props;

  return (<div className="people-list">
    <div className="d-grid">
      <p className="t-head">S.No.</p>
      <p className="t-head">Name</p>
      <p className="t-head">Email</p>
    </div>
    {people.map((person, index) => 
      <div key={person._id} className="d-grid">
        <p>{index + 1}</p>
        <p>{person.name}</p>
        <p>{person.email}</p>
      </div>
    )}
  </div>);
}

export default PeopleList;