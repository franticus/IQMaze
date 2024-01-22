import React from 'react';
import style from './ProgressBar.module.scss';
import mainLogo from '../../img/iq_logo.png';

const ProgressBar = ({ percentage, stepBack }) => {
  return (
    <div className={style.progress_container}>
      <button className={style.progress__arrow} onClick={stepBack}>
        Back
      </button>
      <div className={style.progress}>
        <div
          style={{ width: `${percentage}%` }}
          className={style.progress__inner}
        ></div>
      </div>
      <div className={style.progress__logo}>
        <img src={mainLogo} alt='logo' />
      </div>
    </div>
  );
};

export default ProgressBar;
