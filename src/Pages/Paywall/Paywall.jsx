import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Paywall.module.scss';
import certificate from '../../img/certificate.png';
import { iqTable } from './iqTable.js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import cn from 'classnames';
import { publicKey, priceId } from '../../key.js';
import ValueProposition from '../../components/ValueProposition/ValueProposition.jsx';
import TestimonialsSlider from '../../components/TestimonialsSlider/TestimonialsSlider.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import {
  checkSubscription,
  createCheckoutSession,
} from '../../helpers/stripeHelpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const stripePromise = loadStripe(publicKey);

const Paywall = ({ user, userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUrl = window.location.href;
  const isV30q = currentUrl.includes('V30q');
  const isV20q = currentUrl.includes('V20q');

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const customNavigate = useCustomNavigate();
  const paymentButtonRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const savedParams = localStorage.getItem('savedParams');
    if (savedParams) {
      const newUrl = `${window.location.pathname}${savedParams}`;
      window.history.replaceState(null, '', newUrl);
    }

    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
      setShowPaymentOptions(true);
    } else {
      const storedName = JSON.parse(localStorage.getItem('userName'));
      const storedEmail = JSON.parse(localStorage.getItem('userEmail'));
      if (storedName && storedEmail) {
        setName(storedName);
        setEmail(storedEmail);
        setShowPaymentOptions(true);
      }
    }

    setLoading(false); // Симуляция завершения загрузки данных
  }, [user]);

  useEffect(() => {
    if (!seriesScoresLocal) customNavigate('/');
  }, [customNavigate, seriesScoresLocal]);

  useEffect(() => {
    const verifySubscription = async () => {
      if (user && email) {
        const { hasSubscription } = await checkSubscription(email);
        if (hasSubscription) {
          const totalCorrectAnswers = Object.values(seriesScoresLocal).reduce(
            (total, num) => total + num,
            0
          );
          const iq = iqTable[totalCorrectAnswers] || '62';
          localStorage.setItem('iqScore', iq);
          customNavigate('/thanks');
        }
      }
    };

    verifySubscription();
  }, [user, email, customNavigate, seriesScoresLocal]);

  const calculateAndSetIQ = () => {
    if (!seriesScoresLocal) {
      console.log('No quiz data found.');
      return;
    }

    let totalCorrectAnswers = Object.values(seriesScoresLocal).reduce(
      (total, num) => total + num,
      0
    );

    let iq;
    if (isV30q) {
      totalCorrectAnswers *= 2;
    }

    if (isV20q) {
      totalCorrectAnswers *= 3;
    }

    iq = iqTable[totalCorrectAnswers] || '62';
    setIqValue(iq);
    localStorage.setItem('iqScore', iq);
  };

  useEffect(() => {
    calculateAndSetIQ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesScoresLocal]);

  const handlePaymentMethodSelection = async method => {
    if (method === 'card') {
      setShowPaymentForm(true);
    } else {
      try {
        const session = await createCheckoutSession(
          email,
          userId,
          priceId,
          iqValue,
          name
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
    }
  };

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (paymentButtonRef.current) {
        const rect = paymentButtonRef.current.getBoundingClientRect();
        setIsButtonVisible(rect.bottom < 0 || rect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверить видимость сразу после монтирования

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className={s.paywall}>
        <section className={s.heroSection} data-aos='fade-up'>
          <h1 className={s.mainHeading}>Unlock Your IQ Potential!</h1>
          {!showPaymentOptions && (
            <p className={s.introText}>
              Please sign up with your email <br />
              to create a new account and access our comprehensive IQ test.{' '}
              <br />
              Discover your intellectual capabilities, <br />
              understand your strengths and areas for improvement, <br />
              and embark on a journey of cognitive growth.
            </p>
          )}

          {!showPaymentOptions &&
            (isLogin ? (
              <LoginForm switchToSignUp={switchToSignUp} />
            ) : (
              <SignUpForm switchToLogin={switchToLogin} />
            ))}

          {showPaymentOptions && (
            <div>
              <div className={s.paymentOptions} style={{ margin: '20px 0 0' }}>
                <button
                  ref={paymentButtonRef}
                  className={cn(
                    s.paymentButtonBlick,
                    s.paymentButtonBlick_card
                  )}
                  onClick={() => handlePaymentMethodSelection('gpay_applepay')}
                >
                  Get your test result for $1.90
                </button>
              </div>
            </div>
          )}

          {showPaymentOptions && <ValueProposition />}

          {showPaymentForm && (
            <div className={s.paymentFormWrapper}>
              <PaymentForm name={name} email={email} amount={190} />
            </div>
          )}

          {showPaymentOptions && (
            <div className={s.slider_wrapper}>
              <TestimonialsSlider />
            </div>
          )}

          {!showPaymentOptions && (
            <>
              <h2 className={s.mainHeading}>Information on Test Results</h2>
              <ul className={s.list}>
                <li className={s.list_item}>
                  After entering your details, you'll receive a personalized and
                  signed certificate displaying your test results. <br /> (The
                  photo is a rough sample with fictitious data)
                </li>
                <li>
                  {loading ? (
                    <Skeleton height={300} width={600} />
                  ) : (
                    <img
                      src={certificate}
                      alt='certificate'
                      className={s.heroImage}
                    />
                  )}
                </li>
                <li className={s.list_item}>
                  This certificate is unique and will be created specifically
                  for you, reflecting your IQ score and ranking amongst over 5
                  million people worldwide.
                </li>
                <li className={s.list_item}>
                  Understand your job relevance with detailed insights from
                  IQMaze, including your percentile and IQ score.
                </li>
                <li className={s.list_item}>
                  Don't miss out on this opportunity to validate and celebrate
                  your intellectual achievements!
                </li>
              </ul>
            </>
          )}
        </section>
      </div>

      <div
        className={cn(s.paymentButtonFixed_container, {
          [s.paymentButtonFixed_container_visible]: isButtonVisible,
        })}
      >
        <button
          className={cn(s.paymentButtonBlick, s.paymentButtonFixed)}
          onClick={() => handlePaymentMethodSelection('gpay_applepay')}
        >
          Get your test result for $1.90
        </button>
      </div>
    </Elements>
  );
};

export default Paywall;
