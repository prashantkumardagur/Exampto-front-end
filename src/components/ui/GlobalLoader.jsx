import LoadingIcon from "./LoadingIcon";

const GlobalLoader = () => {
  return (
    <div className="text-center">
      <h1 className="py-7">Exampto</h1>
      <span style={{fontSize: '30px'}}><LoadingIcon text='' /></span>
      <p className="fs-4 w500">Loading...</p>
    </div>
  );
}

export default GlobalLoader;