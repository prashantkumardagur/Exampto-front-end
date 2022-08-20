import { useContext, useState } from "react";



import AppContext from "../../store/AppContext"



const MessagesList = (props) => {

  const { setModel } = useContext(AppContext)
  const [messages, setMessages] = useState(props.messages);




  const deleteHandler = (id) => {
    setModel({
      heading: "Delete Message?",
      text: "Are you sure you want to delete this message?"
    })
  }

  const resolveHandler = (id) => {
    console.log('Resolve message')
  }




  return (<>
    { messages.length === 0 && <p>No messages yet</p> }
    { messages.map((message) => (
        <div className="recieved-message py-3" style={message.isResolved ? {backgroundColor: 'var(--green-bg)'} : {}}>
          <h6 className="accent1 mb-1">Email</h6>
          <p>{message.email}</p>
          <h6 className="accent1 mt-3 mb-1">Messages</h6>
          <p>{message.message}</p>
          <button className="btn primary small mt-3" onClick={() => {resolveHandler(message._id)}}>Resolve</button>
          <button className="btn primary small ml-2" onClick={() => {deleteHandler(message._id)}}>Delete</button>
        </div>
      )) }
  </>);
}

export default MessagesList;