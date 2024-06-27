/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useRef,
  lazy,
  Suspense,
  useCallback,
} from 'react';
import s from './Paywall.module.scss';
import { iqTable } from './iqTable.js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import cn from 'classnames';
import { publicKey, priceId } from '../../key.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  checkSubscription,
  createCheckoutSession,
} from '../../helpers/stripeHelpers';
import TestResultsInfo from '../../components/TestResultsInfo/TestResultsInfo.jsx';

const ValueProposition = lazy(() =>
  import('../../components/ValueProposition/ValueProposition.jsx')
);
const TestimonialsSlider = lazy(() =>
  import('../../components/TestimonialsSlider/TestimonialsSlider.jsx')
);
const SignUpForm = lazy(() => import('../../components/SignUpForm/SignUpForm'));
const LoginForm = lazy(() => import('../../components/LoginForm/LoginForm'));

const stripePromise = loadStripe(publicKey);

const Paywall = ({ user, userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const currentUrl = window.location.href;
  const isV30q = currentUrl.includes('V30q');
  const isV20q = currentUrl.includes('V20q');

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const customNavigate = useCustomNavigate();
  const paymentButtonRef = useRef(null);

  useEffect(() => {
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
  }, [user]);

  useEffect(() => {
    if (!seriesScoresLocal) customNavigate('/home');
  }, [customNavigate, seriesScoresLocal]);

  const verifySubscription = useCallback(async () => {
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
  }, [user, email, seriesScoresLocal, customNavigate]);

  useEffect(() => {
    verifySubscription();
  }, [verifySubscription]);

  const calculateAndSetIQ = useCallback(() => {
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
  }, [seriesScoresLocal, isV30q, isV20q]);

  useEffect(() => {
    calculateAndSetIQ();
  }, [calculateAndSetIQ]);

  const handlePaymentMethodSelection = useCallback(
    async method => {
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
    },
    [email, userId, iqValue, name]
  );

  const switchToSignUp = useCallback(() => {
    setIsLogin(false);
  }, []);

  const switchToLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

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
              <Suspense fallback={<Skeleton height={200} width={600} />}>
                <LoginForm switchToSignUp={switchToSignUp} />
              </Suspense>
            ) : (
              <Suspense fallback={<Skeleton height={200} width={600} />}>
                <SignUpForm switchToLogin={switchToLogin} />
              </Suspense>
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

          {showPaymentOptions && (
            <Suspense fallback={<Skeleton height={200} width={600} />}>
              <ValueProposition />
            </Suspense>
          )}

          {showPaymentOptions && (
            <div className={s.slider_wrapper}>
              <Suspense fallback={<Skeleton height={200} width={600} />}>
                <TestimonialsSlider />
              </Suspense>
            </div>
          )}

          {!showPaymentOptions && <TestResultsInfo />}
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
