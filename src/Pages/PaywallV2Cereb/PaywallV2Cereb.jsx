/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import s from './PaywallV2Cereb.module.scss';
import { iqTable } from './iqTable.js';
import useCustomNavigate from '../../hooks/useCustomNavigate.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import cn from 'classnames';
import { publicKey } from '../../key.js';
import { checkSubscription } from '../../helpers/stripeHelpers.js';
import 'react-loading-skeleton/dist/skeleton.css';
import CustomPayFormV1 from '../../components/CustomPayFormV1/CustomPayFormV1.jsx';
import TestimonialsSlider from '../../components/TestimonialsSlider/TestimonialsSlider.jsx';
import WhyTrustUs from '../../components/WhyTrustUs/WhyTrustUs.jsx';
import HowImprovingScore from '../../components/HowImprovingScore/HowImprovingScore.jsx';
import FAQ from '../../components/FAQ/FAQ.jsx';
import heroImg from '../../img/about_1.jpg';
import LatestResults from '../../components/LatestResults/LatestResults.jsx';
const stripePromise = loadStripe(publicKey);

const PaywallV2Cereb = ({ user, userId }) => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [iqValue, setIqValue] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const currentUrl = window.location.href;
  const isV30q = currentUrl.includes('V30q');
  const isV20q = currentUrl.includes('V20q');

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const customNavigate = useCustomNavigate();
  const paymentButtonRef = useRef(null);
  const payFormRef = useRef(null);

  useEffect(() => {
    if (!seriesScoresLocal) customNavigate('/home');
  }, [customNavigate, seriesScoresLocal]);

  useEffect(() => {
    const verifySubscription = async () => {
      if (user) {
        const { hasSubscription } = await checkSubscription(user.email);
        setHasSubscription(hasSubscription);
        sessionStorage.setItem(
          'hasSubscription',
          JSON.stringify(hasSubscription)
        );
      } else {
        setHasSubscription(false);
        sessionStorage.setItem('hasSubscription', JSON.stringify(false));
      }
    };

    verifySubscription();
  }, [user]);

  const calculateAndSetIQ = () => {
    if (!seriesScoresLocal) {
      console.log('No quiz data found.');
      return;
    }

    let totalCorrectAnswers = Object.values(seriesScoresLocal).reduce(
      (total, num) => total + num,
      0
    );

    if (isV30q) {
      totalCorrectAnswers *= 2;
    }

    if (isV20q) {
      totalCorrectAnswers *= 3;
    }

    let iq = iqTable[totalCorrectAnswers] || '62';
    const storedIQ = localStorage.getItem('iqScore');
    if (storedIQ !== iq.toString()) {
      localStorage.setItem('iqScore', iq);
      setIqValue(iq);
    }
  };

  useEffect(() => {
    calculateAndSetIQ();
    console.log('iqValue:', iqValue);
  }, [seriesScoresLocal, isV30q, isV20q]);

  const handleShowResults = () => {
    customNavigate('/thanks');
  };

  const handleScrollToPayForm = () => {
    if (payFormRef.current) {
      payFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (paymentButtonRef.current) {
        const rect = paymentButtonRef.current.getBoundingClientRect();
        setIsButtonVisible(rect.bottom < 0 || rect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className={s.PaywallV2Cereb}>
        <div className={s.discountNotification} onClick={handleScrollToPayForm}>
          Special Welcome Offer! Get &nbsp;<strong>85%</strong>&nbsp; Discount
          Today!
        </div>
        <section className={s.heroSection}>
          <h1 className={s.mainHeading}>
            Your <span className={s.mainHeading_marked}>IQ score</span> is
            ready!
          </h1>
          <div className={s.hero_container}>
            <div className={s.left}>
              <ul className={s.heroList}>
                <li className={s.heroList_item}>
                  <span>✔</span> Find out how intelligent you are
                </li>
                <li className={s.heroList_item}>
                  <span>✔</span> Learn where you stand compared to others
                </li>
                <li className={s.heroList_item}>
                  <span>✔</span> Explore your strengths and weaknesses
                </li>
              </ul>
              <button
                ref={paymentButtonRef}
                className={cn(s.paymentButtonBlick, s.paymentButtonBlick_card)}
                onClick={
                  hasSubscription ? handleShowResults : handleScrollToPayForm
                }
              >
                {hasSubscription ? 'Show my result' : 'Get My IQ Score Now!'}
              </button>
            </div>
            <div className={s.right}>
              <img className={s.heroImage} src={heroImg} alt='preview' />
            </div>
          </div>
        </section>
      </div>

      {!hasSubscription && (
        <div
          className={cn(s.paymentButtonFixed_container, {
            [s.paymentButtonFixed_container_visible]: isButtonVisible,
          })}
        >
          <button
            className={cn(s.paymentButtonBlick, s.paymentButtonFixed)}
            onClick={
              hasSubscription ? handleShowResults : handleScrollToPayForm
            }
          >
            {hasSubscription ? 'Show my result' : 'Get My IQ Score Now!'}
          </button>
        </div>
      )}

      <div ref={payFormRef}>{!hasSubscription && <CustomPayFormV1 />}</div>

      <WhyTrustUs />
      <HowImprovingScore />
      <div className={s.containerWidth}>
        <TestimonialsSlider />
      </div>
      <FAQ />
      <LatestResults />
    </Elements>
  );
};

export default PaywallV2Cereb;
