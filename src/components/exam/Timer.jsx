import React, { useState, useEffect } from "react";

import IconHolder from "../ui/IconHolder";




const Timer = (props) => {

  const [remainingTime, setRemainingTime] = useState(props.remainingTime);


  // Effect to update remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      if(remainingTime === 0) return;
      setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [remainingTime]);


  // Calculate minutes and seconds
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;


  

  return (
    <div className="userIcon d-flex align-center pl-1 pr-2 rounded-5">
      <IconHolder icon='timer' fontSize='32px' />
      <span className="pl-1 txt1 fs-4 w500">{`${minutes} : ${seconds}`}</span>
    </div>
  );
}

export default React.memo(Timer);