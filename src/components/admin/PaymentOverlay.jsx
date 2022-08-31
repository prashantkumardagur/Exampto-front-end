import { useContext } from 'react';
import ReactDom from 'react-dom';

import DataItem from '../ui/DataItem';
import IconHolder from '../ui/IconHolder';
import IconButton from '../ui/IconButton';
import Form from '../ui/Forms/Form';
import InputField from '../ui/Forms/InputField';

import AppContext from '../../store/AppContext';




const PaymentOverlay = (props) => {
  const { data } = props;
  const { showAlert } = useContext(AppContext);


  const copyHandler = () => {
    navigator.clipboard.writeText(data.upi);
    showAlert('UPI ID copied to clipboard');
  }


  const approveHandler = async (e) => {
    let tid = new FormData(e.target).get('tid');
    props.approve({
      tid: tid,
      pid: data.pid
    }); 
    props.hide();
  }



  return (<>
  { ReactDom.createPortal(
    <div className="model-overlay">
      <div className="payment-model p-relative">
        <IconButton icon="close" onClick={props.hide} fontSize='1.5rem' className='p-absolute' />
        <h3 className='mb-4'>Pending Request</h3>
        <DataItem heading="Amount" value={data.amount} />
        <h5 className='mt-3 d-flex align-center'>
          UPI ID 
          <IconHolder icon='content_copy' className='ml-2 cursor-pointer' color="blue" fontSize='1em' onClick={copyHandler} />
        </h5>
        <p className='fs-4 pb-3'>{data.upi}</p>
        <Form onSubmit={approveHandler}>
          <InputField type="text" name="tid" label="Transaction ID" placeholder="UPI Reference ID" autoComplete='off' required />
          <button className='btn primary large block justify-center mt-3' style={{width: '100%'}}>Approve Request</button>
        </Form>
      </div>  
    </div>
    , document.getElementById('model-root') ) 
  }</>);
}

export default PaymentOverlay;