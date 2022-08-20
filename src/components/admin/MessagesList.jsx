import { useContext, useState } from "react";



import AppContext from "../../store/AppContext"
import AuthContext from "../../store/AuthContext"
import { toggleResolveAPI, deleteMessageAPI } from "../../api/admin";



const MessagesList = (props) => {

  const { setModel, showAlert } = useContext(AppContext)
  const { token } = useContext(AuthContext)
  const [messages, setMessages] = useState(props.messages);



  const deleteMessage = async (id) => {
    const response = await deleteMessageAPI(token, id)
    if(response.status !== 'success') { console.log(response.message); return; }
    setMessages((prevState) => prevState.filter(message => message._id !== id))
    showAlert('Message deleted successfully')
  }


  const deleteHandler = (id) => {
    setModel({
      heading: "Delete Message?",
      text: "Are you sure you want to delete this message?",
      onContinue: () => { deleteMessage(id) },
    })
  }

  const resolveHandler = async (id) => {
    const response = await toggleResolveAPI(token, id);
    if(response.status !== 'success'){ console.log(response.message); return; }
    let mIndex = messages.findIndex(message => message._id === id)
    setMessages((prevState) => {
      let newState = [...prevState]
      newState[mIndex].isResolved = !newState[mIndex].isResolved
      return newState;
    })
  }




  return (<>
    { messages.length === 0 && <p>No messages yet</p> }
    { messages.map((message, index) => (
        <div className="recieved-message py-3 px-2" key={"message"+index} style={message.isResolved ? {backgroundColor: 'var(--green-bg)'} : {}}>
          <h6 className="accent1 mb-1">Email</h6>
          <p>{message.email}</p>
          <h6 className="accent1 mt-3 mb-1">Messages</h6>
          <p>{message.message}</p>
          <button className="btn primary small mt-3" onClick={() => {resolveHandler(message._id)}}>
            { message.isResolved ? 'Unresolve' : 'Resolve' }
          </button>
          <button className="btn primary small ml-2" onClick={() => {deleteHandler(message._id)}}>Delete</button>
        </div>
      )) }
  </>);
}

export default MessagesList;