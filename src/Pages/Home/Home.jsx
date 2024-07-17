import React, { useEffect, useState, useCallback, useMemo } from 'react';
import s from './Home.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Testimonials from '../../components/Testimonials/Testimonials';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import CommunitySection from '../../components/CommunitySection/CommunitySection';
import CTASection from '../../components/CTASection/CTASection';
import { useSubscription } from '../../context/SubscriptionContext';

const Home = ({ user }) => {
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
      customNavigate('/prestart');
    }
  }, [hasStartedTest, customNavigate]);

  // const handleShowLastResults = useCallback(() => {
  //   customNavigate('/thanks');
  // }, [customNavigate]);

  return (
    <div className={s.home}>
      {useMemo(
        () => (
          <HeroSection
            loading={loading}
            hasStartedTest={hasStartedTest}
            showLastResults={hasSubscription}
            handleStartTest={handleStartTest}
            // handleShowLastResults={handleShowLastResults}
            handleContinueTest={handleContinueTest}
          />
        ),
        [
          loading,
          hasStartedTest,
          hasSubscription,
          handleStartTest,
          // handleShowLastResults,
          handleContinueTest,
        ]
      )}

      {useMemo(
        () => (
          <FeaturesSection loading={loading} />
        ),
        [loading]
      )}

      <Testimonials />

      {useMemo(
        () => (
          <CommunitySection loading={loading} />
        ),
        [loading]
      )}

      <CTASection
        hasStartedTest={hasStartedTest}
        handleStartTest={handleStartTest}
      />
    </div>
  );
};

export default Home;
