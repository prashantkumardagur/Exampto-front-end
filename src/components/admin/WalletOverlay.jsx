import { useContext } from 'react';
import ReactDOM from 'react-dom';

import IconButton from '../ui/IconButton';
import DataItem from '../ui/DataItem';
import Form from '../ui/Forms/Form';
import InputField from '../ui/Forms/InputField';
import SelectField from '../ui/Forms/SelectField';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';
import { addTransactionAPI } from '../../api/admin';




const WalletOverlay = (props) => {
  const { person } = props;
  const { token } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);



  const addTransactionHandler = async (e) => {
    const formData = new FormData(e.target);
    const data = {
      uid: person._id,
      amount: formData.get('amount'),
      type: formData.get('type'),
      description: formData.get('description')
    }

    if(data.type === 'debit' && data.amount > person.wallet.coins){
      showAlert('Insufficient Balance', 'error');
      return;
    }

    const response = await addTransactionAPI(token, data);
    if(response.status !== 'success') { showAlert(response.message, 'error'); return; }
    else showAlert('Transaction added successfully');
    props.update(data.uid, data.amount, data.type);
    props.hide();
  }




  return (<>{
    ReactDOM.createPortal(
      <div className="model-overlay">
        <div className="wallet-model p-relative">
          <IconButton icon="close" onClick={props.hide} fontSize='1.5rem' className='p-absolute' />
          <h3 className='mb-4'>Manage Wallet</h3>
          <DataItem heading="Balance" value={person.wallet.coins} />
          <Form onSubmit={addTransactionHandler}>
            <h5 className='mt-5'>New transaction</h5>
            <SelectField name="type" label="Type" defaultValue='credit' required>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </SelectField>
            <InputField type="number" name="amount" min='1' label="Amount" placeholder="Amount" autoComplete='off' required />
            <InputField name="description" label="Description" placeholder="Description" autoComplete='off' required />
            <button className='btn primary large justify-center mt-3' style={{width: '100%'}}>Add Transaction</button>
          </Form>
        </div>
      </div>
    , document.getElementById('model-root'))
  }</>);
}

export default WalletOverlay;