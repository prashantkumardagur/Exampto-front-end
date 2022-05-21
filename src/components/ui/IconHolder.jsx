const IconHolder = (props) => {
  return (<div className={`${props.className} iconHolder d-inflex flex-center`} style={{fontSize: props.fontSize}}>
    <span className="material-symbols-outlined" style={{color: props.color, fontSize: 'inherit'}}>{props.icon}</span>
  </div>);
}

IconHolder.defaultProps = {
  className: '',
  icon: 'account_circle',
  color: 'var(--txt2)',
  fontSize: '1.2em',
}

export default IconHolder;