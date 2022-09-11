import { useEffect, useState, useContext } from "react";

import Transactions from "../../components/user/Transactions";
import Section from "../../components/dashboard/Section";
import DataItem from "../../components/ui/DataItem";
import Form from "../../components/ui/Forms/Form";
import InputField from "../../components/ui/Forms/InputField";
import IconHolder from "../../components/ui/IconHolder";

import AuthContext from "../../store/AuthContext";
import AppContext from "../../store/AppContext";
import { getWalletAPI, updateWithdrawDetailsAPI, requestWithdrawAPI } from "../../api/user";




const WalletSection = () => {
  const { token } = useContext(AuthContext);
  const { showAlert, setModel } = useContext(AppContext);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [withdrawId, setWithdrawId] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadScript = async (src, btnId) => {
    return new Promise((resolve, reject) => {

      const script = document.createElement("script");

      script.src = src;
      script.dataset.payment_button_id = btnId;
      script.async = true;

      script.onload = resolve;
      script.onerror = reject;

      document.getElementById("paymentBtnHolder").innerHTML = '';
      document.getElementById("paymentBtnHolder").appendChild(script);
    });
  }

  
  useEffect(() => {
    const loadPaymentButton = async () => {
      await loadScript("https://checkout.razorpay.com/v1/payment-button.js", "pl_K9q9p6w5myKguu"); // Test version
      // await loadScript("https://checkout.razorpay.com/v1/payment-button.js", "pl_KCKrFBhFiAGDNx"); // Live version
    }

    const getWallet = async () => {
      let response = await getWalletAPI(token);
      if(response.status !== 'success'){ console.log(response.message); return; }
      setBalance(response.data.coins);
      setTransactions(response.data.transactions);
      setWithdrawId(response.data.withdrawDetails.id);
      setLoading(false);
    }


    loadPaymentButton();
    getWallet();
  }, [token]);




  const updateHandler = async (e) => {
    let formdata = new FormData(e.target);
    let data = {upiId: formdata.get('upiId')};
    if(data.upiId.length < 5 || data.upiId.indexOf('@') === -1) { showAlert('Invalid UPI ID', 'error'); return; } 
    let response = await updateWithdrawDetailsAPI(token, data);
    if(response.status !== 'success'){ console.log(response.message); return; }
    showAlert('UPI ID updated successfully');
  }


  const requestWithdraw = async (amount) => {
    let response = await requestWithdrawAPI(token, {amount: amount});
    if(response.status !== 'success'){ showAlert(response.message, 'error'); return; }
    showAlert('Withdraw request sent successfully');
  }
  const withdrawHandler = (e) => {
    let formdata = new FormData(e.target);
    let amount = formdata.get('withdrawAmount');
    if(amount < 100) { showAlert('Minimum amount to withdraw is 100', 'error'); return; }
    else if(amount > balance) { showAlert('Insufficient balance', 'error'); return; }
    setModel({
      heading: "Withdraw money",
      text: `Are you sure you want to withdraw ${amount} coins?`,
      onContinue: () => { requestWithdraw(amount); }
    });
  }





  return (<>
    <Section heading="Exampto Wallet">
      <DataItem heading="Balance" value={`₹ ${balance}`} />
      <div className="mt-4">
        <form id="paymentBtnHolder">
          <button className="btn primary">Loading</button>
        </form>
      </div>
    </Section>

    <Section heading="Money Withdrawal" >
      <Form onSubmit={updateHandler}>
        <div className="grid-md-2 gap-3">
          <InputField label="UPI ID" name="upiId" type="text" placeholder="Enter your VPA ID here." value={withdrawId} />
          <p className="fs-2 pt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi placeat ipsa laudantium eos at earum tempore.</p>
        </div>
        <button className="btn primary small mt-1">Update</button>
      </Form>
      <Form onSubmit={withdrawHandler}>
        <div className="grid-md-2 gap-3 mt-2">
          <InputField label="Amount" name="withdrawAmount" type="number" placeholder="Enter amount to withdraw." />
          <p className="fs-2 pt-4">It may take upto 7 days under process.</p>
        </div>
        <button className="btn primary d-inflex align-center gap-1 mt-3">
          <IconHolder icon="savings" color="white" fontSize="1.2em" />
          Request Withdraw
        </button>
      </Form>
    </Section>

    { loading ||
    <Section heading="Transaction History" >
      <Transactions data={transactions} />
    </Section>
    }
  </>);
}

export default WalletSection;