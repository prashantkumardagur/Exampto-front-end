import ReactDOM from 'react-dom';

const Model = (props) => {
  return (<>
    { ReactDOM.createPortal(
      <div className="model-overlay">
        <div className="model">
          <h6>{props.content.heading}</h6>
          <p>{props.content.text}</p>
          <button className="btn primary small" onClick={props.onContinue}>Continue</button>
          <button className="btn secondary small ml-2" onClick={props.onCancel}>Cancel</button>
        </div>
      </div>, document.getElementById('model-root') )
  }</>);
}

Model.defaultProps = {
  content: {
    heading: 'Model Heading',
    text: 'Model Content lorem ipsum des content.'
  },
  onContinue: () => { console.log('Continue') },
  onCancel: () => { console.log('Cancel') }
}

export default Model;