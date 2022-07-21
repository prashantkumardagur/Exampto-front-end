import React, { useContext } from 'react';

import AppContext from '../../store/AppContext';
import AuthContext from '../../store/AuthContext';
import ExamContext from '../../store/ExamPageContext';

import DataBox from '../ui/DataBox';
import IconButton from "../ui/IconButton";
import UserIcon from '../ui/UserIcon';
import Timer from './Timer';




const ExamHeader = (props) => {
  const { toggleDarkMode } = useContext(AppContext);
  const { person } = useContext(AuthContext);
  const { initialRemainingTime, examType } = useContext(ExamContext);

  

  return (
    <header className="d-flex align-center justify-between bg1 p-fixed p-2 pl-md-3 pr-md-4 w-100vw">
      <div className="d-flex align-center">
        <IconButton icon='menu' onClick={props.toggleNav} />
        <h1 className="d-none d-md-inline mx-2 h3">Exampto</h1>
        <DataBox color={examType === "Live" ? 'red' : 'accent'} content={`${examType} exam`} icon='radio_button_checked' />
      </div>

      <aside className="d-flex align-center gap-1 gap-md-2">
        <IconButton icon='brightness_6' onClick={toggleDarkMode} />
        <UserIcon text={person.name} />
        <Timer remainingTime={initialRemainingTime} />
      </aside>
    </header>
  );
}

export default React.memo(ExamHeader);