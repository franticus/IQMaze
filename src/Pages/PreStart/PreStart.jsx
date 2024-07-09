import React, { useEffect, useCallback } from 'react';
import s from './PreStart.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSubscription } from '../../context/SubscriptionContext';

const PreStart = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const hasSubscription = useSubscription();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(
        'showLastResults',
        JSON.stringify(hasSubscription)
      );
    } else {
      sessionStorage.setItem('showLastResults', JSON.stringify(false));
    }

    const currentStep = localStorage.getItem('currentStep');
    if (currentStep > 0 && parseInt(currentStep, 10) > 0) {
      sessionStorage.setItem('hasStartedTest', JSON.stringify(true));
    } else {
      sessionStorage.setItem('hasStartedTest', JSON.stringify(false));
    }
  }, [user, hasSubscription]);

  const handleStartTest = useCallback(() => {
    localStorage.setItem(
      'seriesScores',
      JSON.stringify({
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
      })
    );
    localStorage.setItem('answers', JSON.stringify([]));
    localStorage.setItem('currentStep', JSON.stringify(0));
    customNavigate('/iqtest');
  }, [customNavigate]);

  return (
    <div className={s.PreStart}>
      <div className={s.title}>
        Get ready to start the
        <span className={s.title_iq}>IQ test!</span>
      </div>
      <div className={s.description_container}>
        <div className={s.description}>
          ✔️
          <p>You will get 30 questions with growing difficulty</p>
        </div>
        <div className={s.description}>
          ✔️
          <p>Select the right answer out of the 6 options</p>
        </div>
        <div className={s.description}>
          ✔️
          <p>You can skip the question and return back later</p>
        </div>
      </div>
      <button className={s.button} onClick={handleStartTest}>
        Start Certified Test
      </button>
    </div>
  );
};

export default PreStart;
