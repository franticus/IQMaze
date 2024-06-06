import React, { useEffect, useState } from 'react';
import s from './Analyzing.module.scss';
import CheckList from '../../components/CheckList/CheckList';

const Analyzing = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(oldStep => {
        if (oldStep >= totalSteps) {
          clearInterval(stepInterval);
          return totalSteps;
        }
        return oldStep + 1;
      });
    }, 2000);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className={s.analyzing}>
      <h1 className={s.mainHeading}>Analyzing Your Results</h1>
      <p className={s.description}>
        Please wait while we analyze your IQ test results.
      </p>
      <div className={s.progressContainer}>
        <div className={s.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <p className={s.progressText}>{Math.round(progress)}%</p>
      <CheckList currentStep={currentStep} />
    </div>
  );
};

export default Analyzing;
