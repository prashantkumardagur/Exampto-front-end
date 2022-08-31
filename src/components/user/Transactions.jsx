import DataBox from '../ui/DataBox';


const Transaction = (props) => {
  const data = props.data;

  const symbol = data.meta.kind === 'deposit' || data.meta.kind === 'credit' ? '+' : '-';
  let color = 'green';
  switch(data.meta.kind) {
    case 'deposit': color = 'blue'; break;
    case 'withdrawal': color = 'accent'; break;
    case 'credit': color = 'green'; break;
    case 'debit': color = 'red'; break;
    default: color = 'accent'; break;
  }

  if(data.status === 'failed') color = 'grey';


  return (
  <div className="transaction d-grid py-2">
    <div>
    <p className='fs-4 w600 pb-1'>{data.meta.title}</p>
    <p className='txt2 fs-2'>
      {data.meta.description} <br/>
      {new Date(data.timeStamp).toLocaleString()}
    </p>
    </div>
    <DataBox 
      content={`${symbol} ₹${data.amount}`} 
      size="large" 
      color={color}
      className="justify-center" 
      style={{height: 'fit-content'}} 
    />
  </div>);
}



const Transactions = (props) => {

  let transactions = props.data;
  transactions.reverse();


  if(transactions.length === 0) 
  return(<p>No transactions found.</p>)

  return (
  <div className="transactions">
    {transactions.map((item, index) => {
      return <Transaction data={item} key={'transaction'+index} />
    })}
  </div>);
}

export default Transactions;