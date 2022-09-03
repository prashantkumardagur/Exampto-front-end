import { useContext, useState, useEffect } from "react";

import WalletOverlay from "./WalletOverlay";

import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";
import { toggleBanAPI } from "../../api/admin";




const PeopleList = (props) => {
  const { people } = props;
  const { token } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);


  const [banStatus, setBanStatus] = useState([]);
  const [walletState, setWalletState] = useState(null);


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




  const balanceUpdate = (uid, amount, type) => {
    people.forEach((person) => {
      if(person._id === uid){
        if(type === 'credit') person.wallet.coins += parseInt(amount);
        else person.wallet.coins -= parseInt(amount);
      }
    })
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
          { person.role === 'user' &&
            <button className="btn small primary mr-1" onClick={() => { setWalletState(person) }}>Wallet</button>
          }
          <button className="btn small primary" onClick={() => {toggleBan(person._id, index)}}>
            {banStatus[index] ? 'Unban' : 'Ban'}
          </button>
        </p>
      </div>
    )}
    { walletState && <WalletOverlay hide={() => setWalletState(null)} person={walletState} update={balanceUpdate} /> }
  </div>);
}

export default PeopleList;