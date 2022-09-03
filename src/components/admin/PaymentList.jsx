import React, { useState, useContext, useEffect, useCallback } from 'react';

import PageLoader from '../ui/PageLoader';
import PaymentOverlay from './PaymentOverlay';
import DataBox from '../ui/DataBox';
import Form from '../ui/Forms/Form';
import InputField from '../ui/Forms/InputField';


import AuthContext from '../../store/AuthContext';
import AppContext from '../../store/AppContext';
import { getPendingPaymentsAPI, rejectPaymentAPI, approvePaymentAPI, getPaymentsAPI, changeTransactionEmailAPI } from '../../api/admin';



const PaymentCard = (props) => {
  const { data } = props;
  const [error, setError] = useState('Something went wrong');


  const emailChangeHandler = async (e) => {
    let fd = new FormData(e.target);
    let email = fd.get('newEmail');
    setError(await props.emailChangeHandler(email, data._id));
  }



  let flagColor;
  switch(data.status) {
    case 'pending': flagColor = 'accent'; break;
    case 'success': flagColor = 'green'; break;
    case 'failed': flagColor = 'red'; break;
    default: flagColor = 'accent'; break;
  }

  return (
  <div className="payment-card">
    <DataBox content={`${data.meta.kind.toUpperCase()} - ${data.status.toUpperCase()}`} size="small" color={flagColor} />
    { data.user && <p className='mt-1'>Email: {data.user.email}</p>}
    { data.status === 'pending' && data.user ? <p>UPI: {data.user.wallet.withdrawDetails.id}</p> : null }
    { !data.user && <p className='mt-1'>Email: {data.razorpayEntity.email}</p>}
    { data.status === 'success' ? <p>Transaction ID: {data.paymentId}</p> : null }
    <p>Amount: {data.amount}</p>
    { data.status === 'pending' && data.user ?
      <div className="mt-2">
        <button className="btn primary small" onClick={props.approveHandler}>Approve</button>
        <button className="btn secondary small ml-2" onClick={props.rejectHandler}>Reject</button>
      </div> : null
    }
    { data.status === 'pending' && data.meta.kind === 'deposit' ?
      <p className='fs-2' style={{color: 'red'}}>Money received but not added to wallet due to some error. It is likely that user 
        entered wrong email ID.</p>
      : null
    }
    {
      !data.user && <div>
        <Form onSubmit={emailChangeHandler}>
          <InputField label="Change Email to" name="newEmail" type="email" placeholder="Enter new email." required />
          {error && <p className='fs-2' style={{color: 'red'}}>{error}</p>}
          <button className='btn primary small mt-2'>Change email</button>
        </Form>
      </div>
    }
  </div>);
}



const PaymentList = (props) => {
  const { token } = useContext(AuthContext);
  const { setModel, showAlert } = useContext(AppContext);

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
    setData(response.data.reverse());
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



  const emailChangeHandler = async (email, id) => {
    let response = await changeTransactionEmailAPI(token, {email, id});
    if(response.status !== 'success') { return response.message; }
    setData((prevList) => prevList.filter((payment) => payment._id !== id));
    showAlert('Email changed successfully.');
    return null;
  };





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
                  emailChangeHandler={emailChangeHandler}
              />);
    })}
  </div>);
}

export default PaymentList;