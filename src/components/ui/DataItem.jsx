const DataItem = (props) => {
  return (<div className="data-item">
    <h6>{props.heading}</h6>
    <p>{props.value}</p>
  </div>);
}

export default DataItem;