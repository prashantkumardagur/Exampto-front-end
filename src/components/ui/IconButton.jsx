const IconButton = (props) => {

  return (
    <button 
      className={`btn iconBtn rounded-50 d-flex flex-center ${props.className}`}
      style={{ fontSize: props.fontSize }}
      onClick={props.onClick}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 'inherit', color: props.color }}>{props.icon}</span>
    </button>
  );

}

IconButton.defaultProps = {
  icon: 'notifications',
  color: 'var(--txt2)',
  fontSize: '28px',
  className: '',
  onClick: () => { console.log('clicked') }
}

export default IconButton;