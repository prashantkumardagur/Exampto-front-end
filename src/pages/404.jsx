import { Link } from 'react-router-dom';


const NotFound = (props) => {
  return (
    <div className="not-found text-center my-5">
      <img src="/svg/404.svg" alt="404! Page not found." className="m-auto" />
      <h1 className="text-center font-1 mt-6 mb-3">404! Page not found.</h1>
      <Link to={props.home} className="btn primary large">Back to home</Link>
    </div>
  );
}

NotFound.defaultProps = {
  home: '/'
}

export default NotFound;