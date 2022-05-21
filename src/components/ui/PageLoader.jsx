import LoadingIcon from "./LoadingIcon";

const PageLoader = (props) => {
    return (<div className="pageLoader"><LoadingIcon /> {props.text}</div>);
}

PageLoader.defaultProps = {text: "Loading..."};

export default PageLoader;