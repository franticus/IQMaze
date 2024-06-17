/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Paywall.module.scss';
import certificate from '../../img/certificate.png';
import { iqTable } from './iqTable.js';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import cn from 'classnames';
import { publicKey, publicKeyDEV, url, urlDEV, urlLOCAL } from '../../key.js';
import ValueProposition from '../../components/ValueProposition/ValueProposition.jsx';
import TestimonialsSlider from '../../components/TestimonialsSlider/TestimonialsSlider.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

const currentUrl = window.location.href;
const stripePromise = loadStripe(
  currentUrl.includes('iq-check140') ? publicKey : publicKeyDEV
);
const apiUrl = currentUrl.includes('iq-check140')
  ? url
  : currentUrl.includes('localhost')
  ? urlLOCAL
  : urlDEV;

const Paywall = ({ user, userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const priceId = 'price_1PQBhPRrQfUQC5MYqbQ7MyWh'; // ID цены из Stripe

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchApiKey = async () => {
      try {
        const response = await fetch(`${apiUrl}/get-api-key`, {
          method: 'GET',
        });
        const { apiKey } = await response.json();
        setApiKey(apiKey);
      } catch (error) {
        console.error('Failed to fetch API key:', error);
      }
    };

    fetchApiKey();

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
    if (!seriesScoresLocal) navigate('/');
  }, [navigate, seriesScoresLocal]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (user && email) {
        try {
          const response = await fetch(`${apiUrl}/check-subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          const { hasSubscription } = await response.json();
          if (hasSubscription) {
            navigate('/thanks');
          }
        } catch (error) {
          console.error('Error checking subscription status:', error);
        }
      }
    };

    checkSubscription();
  }, [user, email]);

  const calculateIQ = () => {
    if (!seriesScoresLocal) {
      console.log('No quiz data found.');
      return;
    }

    let totalCorrectAnswers = Object.values(seriesScoresLocal).reduce(
      (total, num) => total + num,
      0
    );

    const iq = iqTable[totalCorrectAnswers] || '62';

    setIqValue(iq);
  };

  useEffect(() => {
    calculateIQ();
  }, []);

  const handlePaymentMethodSelection = async method => {
    if (method === 'card') {
      setShowPaymentForm(true);
    } else {
      try {
        const response = await fetch(`${apiUrl}/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email: email,
            userId: userId,
            priceId: priceId,
            iqValue: iqValue,
            userName: name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const session = await response.json();
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

          {showPaymentOptions && (
            <div className={s.paymentOptions}>
              <div className={s.price}>Total price: $1.90</div>
              <button
                className={cn(s.paymentButtonBlick, s.paymentButtonBlick_card)}
                onClick={() => handlePaymentMethodSelection('gpay_applepay')}
              >
                Get your test result for $1.90
              </button>
            </div>
          )}

          {showPaymentForm && apiKey && (
            <div className={s.paymentFormWrapper}>
              <PaymentForm
                name={name}
                email={email}
                amount={190}
                apiKey={apiKey}
              />
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
                  <img
                    src={certificate}
                    alt='certificate'
                    className={s.heroImage}
                  />
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
    </Elements>
  );
};

export default Paywall;
