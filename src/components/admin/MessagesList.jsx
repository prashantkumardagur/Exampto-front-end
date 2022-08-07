const MessagesList = (props) => {
  const messages = props.messages;
  console.log(messages);

  return (<>
    { messages.length === 0 && <p>No messages yet</p> }
    { messages.map((message) => (<>
        <h6 className="accent1 pt-3 mb-1" style={{borderTop: "2px solid var(--shadow)"}}>Email</h6>
        <p>{message.email}</p>
        <h6 className="accent1 mt-3 mb-1">Messages</h6>
        <p className="mb-4">{message.message}</p>
    </>)) }
  </>);
}

export default MessagesList;