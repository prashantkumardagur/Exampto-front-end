import { Link } from "react-router-dom";

const Button = (props) => {
  const { type } = props;

  if(type === 'button'){
    return (
      <button className={`btn ${props.className}`} {...props}>
        {props.children}
      </button>
    )
  }

  if(type === 'link'){
    return (
      <Link to={props.to} className={`btn ${props.className}`} {...props}>
        {props.children}
      </Link>
    )
  }
}

Button.defaultProps = {
  type: 'button',
  className: '',
  to: '',
}

export default Button;