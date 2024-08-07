import React, { useEffect, useState, useCallback } from 'react';
import s from './HomeV2Cereb.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroSectionCereb from '../../components/HeroSectionCereb/HeroSectionCereb';
import { useSubscription } from '../../context/SubscriptionContext';
import CTASectionCereb from '../../components/CTASectionCereb/CTASectionCereb';
import CerebStatsHero from '../../components/CerebStatsHero/CerebStatsHero';
import CerebWhatProcess from '../../components/CerebWhatProcess/CerebWhatProcess';
import CognitiveSkills from '../../components/CognitiveSkills/CognitiveSkills';
import AverageIQChart from '../../components/AverageIQChart/AverageIQChart';

const HomeV2Cereb = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const hasSubscription = useSubscription();
  const [hasStartedTest, setHasStartedTest] = useState(() => {
    const savedHasStartedTest = sessionStorage.getItem('hasStartedTest');
    return savedHasStartedTest ? JSON.parse(savedHasStartedTest) : false;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];

      const isAppLoadEventRegistered = window.dataLayer.some(
        event => event.event === 'appLoad'
      );

      if (!isAppLoadEventRegistered) {
        window.dataLayer.push({
          event: 'appLoad',
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, []);

  useEffect(() => {
    // if (user) {
    //   sessionStorage.setItem(
    //     'showLastResults',
    //     JSON.stringify(hasSubscription)
    //   );
    // } else {
    //   sessionStorage.setItem('showLastResults', JSON.stringify(false));
    // }

    const currentStep = localStorage.getItem('currentStep');
    if (currentStep > 0 && parseInt(currentStep, 10) > 0) {
      setHasStartedTest(true);
      sessionStorage.setItem('hasStartedTest', JSON.stringify(true));
    } else {
      sessionStorage.setItem('hasStartedTest', JSON.stringify(false));
    }

    setLoading(false);
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
    customNavigate('/prestart');
  }, [customNavigate]);

  const handleContinueTest = useCallback(() => {
    if (hasStartedTest) {
      customNavigate('/iqtest');
    }
  }, [hasStartedTest, customNavigate]);

  // const handleShowLastResults = useCallback(() => {
  //   customNavigate('/thanks');
  // }, [customNavigate]);

  return (
    <div className={s.HomeV2Cereb}>
      <HeroSectionCereb
        loading={loading}
        hasStartedTest={hasStartedTest}
        // showLastResults={hasSubscription}
        handleStartTest={handleStartTest}
        // handleShowLastResults={handleShowLastResults}
        handleContinueTest={handleContinueTest}
      />
      <CerebStatsHero />
      <AverageIQChart />
      <CerebWhatProcess />
      <CognitiveSkills />
      <CTASectionCereb
        hasStartedTest={hasStartedTest}
        handleStartTest={handleStartTest}
      />
    </div>
  );
};

export default HomeV2Cereb;
