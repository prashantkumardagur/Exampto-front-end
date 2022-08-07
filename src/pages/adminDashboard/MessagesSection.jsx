import { useContext, useState, useEffect } from "react";

import Section from "../../components/dashboard/Section";
import PageLoader from "../../components/ui/PageLoader";
import MessagesList from "../../components/admin/MessagesList";

import AuthContext from "../../store/AuthContext";
import { getMessagesAPI } from "../../api/admin";



const MessagesSection = (props) => {

  const { token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);



  // Effect to fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessagesAPI(token);
      if(response.status !== 'success'){ console.log(response.message); return; }
      setMessages(response.data);
      setIsLoading(false);
    }

    fetchMessages();
  }, [token]);





  return (<>
    <Section heading="Messages Recieved" >
      {isLoading ? <PageLoader /> : <MessagesList messages={messages} />}
    </Section>
  </>);
}

export default MessagesSection;