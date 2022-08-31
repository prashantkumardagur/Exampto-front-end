import { useState } from 'react';

import Form from '../../ui/Forms/Form';
import IconHolder from '../../ui/IconHolder';

import { hostUrl } from '../../../api/runAPI';



const NewsletterForm = (props) => {

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(1);


  let statusOutput = '';
  switch (status) {
    case 1: statusOutput = <button className={`hbtn d-inflex t-2 htype1 mt-2`} style={{border: 'none'}}>
                            Subscribe to Newletter
                            <IconHolder icon="east" color="white" className="ml-2" />
                          </button>
                          break;
    case 2: statusOutput = <p>Subscribed successfully</p>
                          break;
    case 3: statusOutput = <p>Already subscribed</p>
                          break;
    case 4: statusOutput = <p>Something went wrong</p>
                          break;
    default: statusOutput =<p>Something went wrong</p>
                          break;
  }


  const submitHandler = async (e) => {
    if(!email) return;
    const response = await fetch(`${hostUrl}/public/subscribe-newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(res => res.json());

    if(response.status !== 'success'){ setStatus(4); console.log(response.message);return; }
    setStatus(response.data.subscribed);
  }

  const changeHandler = (e) => {
    setEmail(e.target.value);
  }


  return (
    <Form className="newsletter-form m-auto" onSubmit={submitHandler}>
      <input
        readOnly={ status !== 1 }
        className='mt-2 mx-auto text-center'
        style={{maxWidth: '500px', width:"80vw", backgroundColor: '#eee', borderRadius: '50px'}}
        value={email}
        type="email" 
        maxLength="64" 
        required 
        placeholder="Enter your email" 
        name="newsletterEmail" 
        onChange={changeHandler}
      />
      {statusOutput}
    </Form>
  );
}

export default NewsletterForm;