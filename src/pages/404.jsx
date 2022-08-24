import { Link } from 'react-router-dom';


const NotFound = (props) => {
  return (
    <div className="not-found text-center mb-3">
      <img src="/images/404.png" alt="404! Page not found." className="m-auto mb-5" />
      <Link to={props.home} className="btn primary large">Back to home</Link>
    </div>
  );
}

NotFound.defaultProps = {
  home: '/'
}

export default NotFound;