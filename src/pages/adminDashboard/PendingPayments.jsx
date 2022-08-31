import { useState } from "react";

import PaymentList from "../../components/admin/PaymentList";
import SelectField from "../../components/ui/Forms/SelectField";




const PendingPayments = (props) => {

  const [paymentType, setPaymentType] = useState('1');


  const handleFilterChange = (e) => {
    setPaymentType(e.target.value);
  }



  return (<>
    <h2>Pending Payments</h2>
    <div className="grid-md-2">
      <SelectField label="Payment Type" name="paymentType" onChange={handleFilterChange} >
        <option value={1}>Pending Payments</option>
        <option value={2}>All Payments</option>
      </SelectField>
    </div>
    <PaymentList showPendingType={paymentType} />
  </>);
}

export default PendingPayments;