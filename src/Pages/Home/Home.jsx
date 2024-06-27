import React, { useEffect, useState } from 'react';
import s from './Home.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Testimonials from '../../components/Testimonials/Testimonials';
import { checkSubscription } from '../../helpers/stripeHelpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroSection from '../../components/HeroSection/HeroSection'; // Импортируем новый компонент
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection'; // Импортируем новый компонент

import about_5 from '../../img/about_5.jpg';

const Home = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const [showLastResults, setShowLastResults] = useState(false);
  const [hasStartedTest, setHasStartedTest] = useState(false);
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
    const verifySubscription = async () => {
      if (user) {
        const { hasSubscription } = await checkSubscription(user.email);
        setShowLastResults(hasSubscription);
      } else {
        setShowLastResults(false);
      }
      setLoading(false);
    };

    verifySubscription();

    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && parseInt(currentStep, 10) > 0) {
      setHasStartedTest(true);
    }
  }, [user]);

  const handleStartTest = () => {
    !hasStartedTest &&
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
    !hasStartedTest && localStorage.setItem('answers', JSON.stringify([]));
    !hasStartedTest && localStorage.setItem('currentStep', JSON.stringify(0));
    customNavigate('/iqtest');
  };

  const handleShowLastResults = () => {
    customNavigate('/thanks');
  };

  return (
    <div className={s.home}>
      <HeroSection
        loading={loading}
        hasStartedTest={hasStartedTest}
        showLastResults={showLastResults}
        handleStartTest={handleStartTest}
        handleShowLastResults={handleShowLastResults}
      />

      <FeaturesSection loading={loading} />

      <Testimonials />

      <section className={s.communitySection}>
        <h2 className={s.sectionHeading}>Join the IQMaze Community</h2>
        <p className={s.sectionText}>
          Connect with like-minded individuals, share your results, and
          participate in engaging discussions about intelligence and cognitive
          health. Our community is here to support your journey toward unlocking
          your full cognitive potential.
        </p>
        {loading ? (
          <Skeleton height={300} width={300} />
        ) : (
          <img
            src={about_5}
            alt='A diverse group of people from the IQMaze community'
            className={s.communityImage}
            loading='lazy'
          />
        )}
      </section>

      <section className={s.ctaSection}>
        <h2 className={s.sectionHeading}>Get Started with IQMaze</h2>
        <p className={s.sectionText}>
          Ready to discover your cognitive strengths? Take our scientifically
          validated IQ test today and start your journey towards personal and
          professional growth.
        </p>
        <button className={s.button} onClick={handleStartTest}>
          {hasStartedTest ? 'Continue IQ test' : 'Start IQ test'}
        </button>
      </section>
    </div>
  );
};

export default Home;
