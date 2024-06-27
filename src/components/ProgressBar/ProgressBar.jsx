/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import style from './ProgressBar.module.scss';
import mainLogo from '../../img/iq_logo.png';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const ProgressBar = ({ percentage, stepBack }) => {
  const [timer, setTimer] = useState(40 * 60);
  const customNavigate = useCustomNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          customNavigate('/paywall');
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={style.wrapper}>
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
      <div className={style.time}>Remaining Time: {formatTime(timer)}</div>
    </div>
  );
};

export default ProgressBar;
