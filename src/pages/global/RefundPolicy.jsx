import { Link } from "react-router-dom";


const RefundPolicy = (props) => {
  return (<div>
  <h1 className="display-heading my-5">Refund Policy</h1>
  <p className="mb-6">
    Please read the <Link to={'/terms-and-conditions'}>terms and conditions</Link> conditions carefully before 
    enrolling to any of the contests, as once you have enrolled you cannot change, cancel your enrollment. 
    Once you enroll and make the required payment, it shall be final and there cannot be 
    any changes or modifications to the same and neither will there be any refund.
  </p>
  </div>);
}

export default RefundPolicy;