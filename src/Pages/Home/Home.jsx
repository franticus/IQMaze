import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Home.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import about_1 from '../../img/about_1.jpg';
import about_2 from '../../img/about_2.jpg';
import about_3 from '../../img/about_3.jpg';
import about_4 from '../../img/about_4.jpg';
import about_5 from '../../img/about_5.jpg';
import Testimonials from '../../components/Testimonials/Testimonials';
import cn from 'classnames';
import { checkSubscription } from '../../helpers/stripeHelpers';

const Home = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const [showLastResults, setShowLastResults] = useState(false);
  const [hasStartedTest, setHasStartedTest] = useState(false);

  useEffect(() => {
    const currentUrlParams = window.location.search;
    const savedParams = localStorage.getItem('savedParams');

    if (savedParams) {
      localStorage.setItem('savedParams', savedParams);
    } else {
      localStorage.setItem('savedParams', currentUrlParams);
    }
  }, []);

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
    AOS.init({
      duration: 1000,
    });

    const verifySubscription = async () => {
      if (user) {
        const { hasSubscription } = await checkSubscription(user.email);
        setShowLastResults(hasSubscription);
      } else {
        setShowLastResults(false);
      }
    };

    verifySubscription();

    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && parseInt(currentStep, 10) > 0) {
      setHasStartedTest(true);
    }

    const seriesScores = localStorage.getItem('seriesScores');
    if (seriesScores) {
      localStorage.setItem(
        'seriesScores',
        JSON.stringify({ A: 0, B: 0, C: 0, D: 0, E: 0 })
      );
    }
  }, [user]);

  const handleStartTest = () => {
    customNavigate('/iqtest');
  };

  const handleShowLastResults = () => {
    customNavigate('/thanks');
  };

  return (
    <div className={s.home}>
      <div className={s.hero} data-aos='fade-up'>
        <div className={s.did}>12,502 people did this test last week.</div>
        <div className={s.title}>
          Test your <span className={s.title_iq}>IQ!</span>
        </div>
        <div className={s.description}>
          The IQ Test is to assess intellectual abilities formed by general
          experience, not affected by training or learning. You can figure out
          your intellectual level compared to the group of the same age.
        </div>
        <div className={s.description}>
          As it requires concentration for a given amount of time, please
          conduct the test in a quiet and comfortable place.
        </div>
        <button className={s.button} onClick={handleStartTest}>
          {hasStartedTest ? 'Continue IQ test' : 'Start IQ test'}
        </button>
        {showLastResults && (
          <button
            className={cn(s.button, s.button_last)}
            onClick={handleShowLastResults}
          >
            Show Last Results
          </button>
        )}
      </div>

      <section className={s.heroSection} data-aos='fade-down'>
        <div className={s.heroContent}>
          <h1 className={s.mainHeading}>
            Unlock Your Cognitive Potential with IQMaze
          </h1>
          <p className={s.introText}>
            Join us on an exciting journey through the realms of intelligence
            and cognitive prowess. IQMaze offers scientifically validated tests
            that unveil the intricacies of your mind, helping you discover your
            unique intellectual strengths.
          </p>
          <img
            src={about_1}
            alt='Brain maze representing the complexity of human intelligence'
            className={s.heroImage}
          />
        </div>
      </section>

      <section className={s.featuresSection} data-aos='fade-right'>
        <h2 className={s.sectionHeading}>Why Choose IQMaze?</h2>
        <div className={s.features}>
          <div className={s.featureItem}>
            <img src={about_2} alt='Feature 1' className={s.featureImage} />
            <h3 className={s.featureTitle}>Comprehensive Analysis</h3>
            <p className={s.featureText}>
              Our tests provide a thorough analysis of your cognitive abilities,
              highlighting your strengths and areas for improvement.
            </p>
          </div>
          <div className={s.featureItem}>
            <img src={about_3} alt='Feature 2' className={s.featureImage} />
            <h3 className={s.featureTitle}>Scientifically Validated</h3>
            <p className={s.featureText}>
              Developed by experts, our tests are backed by rigorous research
              and scientific validation.
            </p>
          </div>
          <div className={s.featureItem}>
            <img src={about_4} alt='Feature 3' className={s.featureImage} />
            <h3 className={s.featureTitle}>Personal Growth</h3>
            <p className={s.featureText}>
              Use your results to foster personal and professional growth,
              enhancing your cognitive skills.
            </p>
          </div>
        </div>
      </section>

      <div data-aos='fade-left'>
        <Testimonials />
      </div>

      <section className={s.communitySection} data-aos='fade-up'>
        <h2 className={s.sectionHeading}>Join the IQMaze Community</h2>
        <p className={s.sectionText}>
          Connect with like-minded individuals, share your results, and
          participate in engaging discussions about intelligence and cognitive
          health. Our community is here to support your journey toward unlocking
          your full cognitive potential.
        </p>
        <img
          src={about_5}
          alt='A diverse group of people from the IQMaze community'
          className={s.communityImage}
        />
      </section>

      <section className={s.ctaSection} data-aos='fade-up'>
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
