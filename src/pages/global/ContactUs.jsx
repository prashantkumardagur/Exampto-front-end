import { useState } from "react";

import Form from "../../components/ui/Forms/Form";
import InputField from "../../components/ui/Forms/InputField";
import Textarea from "../../components/ui/Forms/Textarea";
import IconHolder from "../../components/ui/IconHolder";

import { hostUrl } from "../../api/runAPI";



const ContactUs = (props) => {

  const [status, setStatus] = useState(1);



  const submitHandler = async (e) => {

    const formData = new FormData(e.target);
    const data = {};
    for (let key of formData.keys()) {
      data[key] = formData.get(key);
    }
    
    const response = await fetch(`${hostUrl}/public/send-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if(response.status !== 'success'){ console.log(response.message); return;}
    setStatus(2);
    e.target.reset();
  }




  return (<div>
    <h1 className="my-5 display-heading">Contact Us</h1>

    <div className="mt-7 mb-5 grid-md-2 gap-md-5">

      <div className="contact-content">
        <h5 className="haccent">Send us a message</h5>
        <h5 className="big-heading my-3">Have any questions?<br/>Let's start to talk</h5>
        <p className="fs-4 txt2 mb-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi voluptatum minima 
          natus commodi reiciendis, autem ex unde sequi. Aperiam, quis!</p>
      </div>

      <Form className="contact-form p-3 white" onSubmit={submitHandler}>
        <h3>Write your message...</h3>
        <InputField type="email" name="email" id="contact-email" label="Email" />
        <Textarea name="message" id="message" label="Message" maxLength="1024" />
        { status === 1 ?
          <button className="hbtn htype3 d-inflex align-center mt-3">
            Send<IconHolder icon="send" className="ml-1" color="white"/>
          </button> :
          <p className="mt-2">Message sent successfully</p>
        }
      </Form>

    </div>
  </div>);
}

export default ContactUs;