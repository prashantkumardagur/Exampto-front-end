import IconHolder from "../ui/IconHolder";

const Timer = (props) => {
  return (
    <div className="userIcon d-flex align-center pl-1 pr-2 rounded-5">
      <IconHolder icon='timer' fontSize='32px' />
      <span className="pl-1 txt1 fs-4 w500">{props.time}</span>
    </div>
  );
}

export default Timer;