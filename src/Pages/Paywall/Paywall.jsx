/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import s from './Paywall.module.scss';
import { iqTable } from './iqTable.js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import cn from 'classnames';
import { publicKey, priceId } from '../../key.js';
import { createCheckoutSession } from '../../helpers/stripeHelpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSubscription } from '../../context/SubscriptionContext.js';

const ValueProposition = lazy(() =>
  import('../../components/ValueProposition/ValueProposition.jsx')
);
const TestimonialsSlider = lazy(() =>
  import('../../components/TestimonialsSlider/TestimonialsSlider.jsx')
);

const stripePromise = loadStripe(publicKey);

const Paywall = ({ user, userId }) => {
  const hasSubscription = useSubscription();
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const currentUrl = window.location.href;
  const isV30q = currentUrl.includes('V30q');
  const isV20q = currentUrl.includes('V20q');

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const customNavigate = useCustomNavigate();
  const paymentButtonRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    } else {
      const storedName = JSON.parse(localStorage.getItem('userName'));
      const storedEmail = JSON.parse(localStorage.getItem('userEmail'));
      if (storedName && storedEmail) {
        setName(storedName);
        setEmail(storedEmail);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!seriesScoresLocal) customNavigate('/home');
  }, [customNavigate, seriesScoresLocal]);

  useEffect(() => {
    setCheckingSubscription(false);
  }, []);

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
  }, [seriesScoresLocal, isV30q, isV20q]);

  const handlePaymentMethodSelection = async method => {
    try {
      const urlParams = new URLSearchParams(window.location.search);

      const session = await createCheckoutSession(
        email,
        userId,
        priceId,
        iqValue,
        name,
        urlParams
      );

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleShowResults = () => {
    customNavigate('/thanks');
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
      <div className={s.paywall}>
        <section className={s.heroSection}>
          <h1 className={s.mainHeading}>Unlock Your IQ Potential!</h1>
          <p className={s.introText}>
            Please sign up with your email <br />
            to create a new account and access our comprehensive IQ test. <br />
            Discover your intellectual capabilities, <br />
            understand your strengths and areas for improvement, <br />
            and embark on a journey of cognitive growth.
          </p>

          <div className={s.paymentOptions} style={{ margin: '20px 0 0' }}>
            {checkingSubscription ? (
              <Skeleton height={58} width={158} />
            ) : (
              <button
                ref={paymentButtonRef}
                className={cn(s.paymentButtonBlick, s.paymentButtonBlick_card)}
                onClick={
                  hasSubscription
                    ? handleShowResults
                    : () => handlePaymentMethodSelection('gpay_applepay')
                }
              >
                {hasSubscription
                  ? 'Show my result'
                  : 'Get your test result for $1.90'}
              </button>
            )}
          </div>
          <Suspense fallback={<Skeleton height={200} width={600} />}>
            <ValueProposition />
          </Suspense>
          <div className={s.slider_wrapper}>
            <Suspense fallback={<Skeleton height={200} width={600} />}>
              <TestimonialsSlider />
            </Suspense>
          </div>
        </section>
      </div>

      <div
        className={cn(s.paymentButtonFixed_container, {
          [s.paymentButtonFixed_container_visible]: isButtonVisible,
        })}
      >
        <button
          className={cn(s.paymentButtonBlick, s.paymentButtonFixed)}
          onClick={
            hasSubscription
              ? handleShowResults
              : () => handlePaymentMethodSelection('gpay_applepay')
          }
        >
          {hasSubscription
            ? 'Show my result'
            : 'Get your test result for $1.90'}
        </button>
      </div>
    </Elements>
  );
};

export default Paywall;
