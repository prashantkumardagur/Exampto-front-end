import { useContext, useState, useEffect } from "react";

import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";
import { toggleBanAPI } from "../../api/admin";




const PeopleList = (props) => {
  const { people } = props;
  const { token } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);


  const [banStatus, setBanStatus] = useState([]);


  useEffect(() => {
    setBanStatus(people.map((person) => person.meta.isBanned));
  }, [people]);




  // Toggle ban status of a user
  const toggleBan = async (id,index) => {
    const response = await toggleBanAPI(token, id);
    showAlert(response.message);
    if(response.status !== 'success') return;

    const newBanStatus = [...banStatus];
    newBanStatus[index] = !newBanStatus[index];
    setBanStatus(newBanStatus);
  }





  return (<div className="people-list">
    <div className="d-grid">
      <p className="t-head">S.No.</p>
      <p className="t-head">Name</p>
      <p className="t-head">Email</p>
      <p className="t-head">Action</p>
    </div>
    {people.map((person, index) => 
      <div key={person._id} className="d-grid align-center">
        <p>{index + 1}</p>
        <p>{person.name}</p>
        <p>{person.email}</p>
        <p>
          <button className="btn small primary" onClick={() => {toggleBan(person._id, index)}}>
            {banStatus[index] ? 'Unban' : 'Ban'}
          </button>
        </p>
      </div>
    )}
  </div>);
}

export default PeopleList;