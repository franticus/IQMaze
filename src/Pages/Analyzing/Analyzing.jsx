import React, { useEffect, useState } from 'react';
import s from './Analyzing.module.scss';
import CheckList from '../../components/CheckList/CheckList';
import TestimonialsSlider from '../../components/TestimonialsSlider/TestimonialsSlider';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { useSubscription } from '../../context/SubscriptionContext';

const Analyzing = ({ user }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const hasSubscription = useSubscription();
  const currentUrl = window.location.href;
  const isPaywallV2Cereb = currentUrl.includes('paywallV2Cereb');
  const customNavigate = useCustomNavigate();
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
    }, 1800);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        customNavigate('/email');
      }, 2000);
    }
  }, [progress, hasSubscription, isPaywallV2Cereb, customNavigate]);

  return (
    <div className={s.analyzingContainer}>
      <div className={s.analyzing}>
        <h1 className={s.mainHeading}>
          Calculating your <br />
          <span>IQ score...</span>
        </h1>
        <p className={s.description}>
          Hang tight while our Al brain analyses your answers against the 5 key
          measures of intelligence...
        </p>
        <div className={s.progressContainer}>
          <div className={s.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <p className={s.progressText}>{Math.round(progress)}%</p>
        <CheckList currentStep={currentStep} />
      </div>
      <div className={s.sliderContainer}>
        <TestimonialsSlider />
      </div>
    </div>
  );
};

export default Analyzing;
