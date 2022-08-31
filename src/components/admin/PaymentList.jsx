import React, { useState, useContext, useEffect, useCallback } from 'react';

import PageLoader from '../ui/PageLoader';
import PaymentOverlay from './PaymentOverlay';
import DataBox from '../ui/DataBox';

import AuthContext from '../../store/AuthContext';
import AppContext from '../../store/AppContext';
import { getPendingPaymentsAPI, rejectPaymentAPI, approvePaymentAPI, getPaymentsAPI } from '../../api/admin';



const PaymentCard = (props) => {
  const { data } = props;


  let flagColor;
  switch(data.status) {
    case 'pending': flagColor = 'accent'; break;
    case 'success': flagColor = 'green'; break;
    case 'failed': flagColor = 'red'; break;
    default: flagColor = 'accent'; break;
  }

  return (
  <div className="payment-card">
    <DataBox content={data.status.toUpperCase()} size="small" color={flagColor} />
    <p className='mt-1'>Email: {data.user.email}</p>
    { data.status === 'pending' ? <p>UPI: {data.user.wallet.withdrawDetails.id}</p> : null }
    { data.status === 'success' ? <p>Transaction ID: {data.paymentId}</p> : null }
    <p>Amount: {data.amount}</p>
    { data.status === 'pending' &&
      <div className="mt-2">
        <button className="btn primary small" onClick={props.approveHandler}>Approve</button>
        <button className="btn secondary small ml-2" onClick={props.rejectHandler}>Reject</button>
      </div>
    }
    { data.status === 'pending' && data.meta.kind === 'deposit' ?
      <p style={{color: 'red'}}>Money received but not added to wallet due to some error. It is likely that user 
        entered wrong email ID.</p>
      : null
    }
  </div>);
}



const PaymentList = (props) => {
  const { token } = useContext(AuthContext);
  const { setModel } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(null);



  let getPendingPayments = useCallback( async () => {
    let response = await getPendingPaymentsAPI(token);
    if(response.status !== 'success') { console.log(response.message); return; }
    setData(response.data);
    setLoading(false);
  }, [token]);

  let getAllPayments = useCallback( async () => {
    let response = await getPaymentsAPI(token);
    if(response.status !== 'success') { console.log(response.message); return; }
    setData(response.data);
    setLoading(false);
  } , [token]);


  useEffect(() => {
    if(props.showPendingType === '1') getPendingPayments();
    else getAllPayments();
  }, [token, getPendingPayments, getAllPayments, props.showPendingType]);



  
  const rejectPayment = async (id) => {
    let response = await rejectPaymentAPI(token, id);
    if(response.status !== 'success') { console.log(response.message); return; }
    setData((prevList) =>  prevList.filter((payment) => payment._id !== id));
  }
  const rejectHandler = (id) => {
    setModel({
      heading: 'Reject Payment',
      text: 'Are you sure you want to reject this payment?',
      onContinue: () => { rejectPayment(id) },
    });
  }



  const approveHandler = (id) => {
    const payment = data.find((payment) => payment._id === id);
    setOverlay({
      amount: payment.amount,
      upi: payment.user.wallet.withdrawDetails.id,
      pid: id,
    });
  }
  const approvePayment = async (data) => {
    let response = await approvePaymentAPI(token, data);
    if(response.status !== 'success') { console.log(response.message); return; }
    setData((prevList) =>  prevList.filter((payment) => payment._id !== data.pid));
  }





  if(loading) return <PageLoader />;

  if(data.length === 0) return <div className="loading mt-5">No pending payments</div>;

  return (
  <div className="payment-list d-grid gap-2 mt-5">
    { overlay && <PaymentOverlay hide={() => { setOverlay(null) }} data={overlay} approve={approvePayment} /> }
    {data.map((payment, index) => {
      return (<PaymentCard 
                  key={index} 
                  data={payment} 
                  rejectHandler={() => { rejectHandler(payment._id) }} 
                  approveHandler={() => { approveHandler(payment._id) }}
              />);
    })}
  </div>);
}

export default PaymentList;