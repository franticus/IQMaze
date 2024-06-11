/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
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
import { getUserId } from '../../helpers/userId';
import { publicKey, publicKeyDEV, url, urlDEV, urlLOCAL } from '../../key.js';
import ValueProposition from '../../components/ValueProposition/ValueProposition.jsx';
import TestimonialsSlider from '../../components/TestimonialsSlider/TestimonialsSlider.jsx';

const currentUrl = window.location.href;
const stripePromise = loadStripe(
  currentUrl.includes('iq-check140') ? publicKey : publicKeyDEV
);
const apiUrl = currentUrl.includes('iq-check140')
  ? url
  : currentUrl.includes('localhost')
  ? urlLOCAL
  : urlDEV;

const Paywall = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const paymentOptionsRef = useRef(null);
  const priceId = 'price_1PQBhPRrQfUQC5MYqbQ7MyWh'; // ID цены из Stripe

  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const navigate = useNavigate();
  const userId = getUserId();

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

    const storedName = JSON.parse(localStorage.getItem('userName'));
    const storedEmail = JSON.parse(localStorage.getItem('userEmail'));
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setShowPaymentOptions(true);
    }
  }, []);

  useEffect(() => {
    if (!seriesScoresLocal) navigate('/');
  }, [navigate, seriesScoresLocal]);

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

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    localStorage.setItem('userName', JSON.stringify(name));
    localStorage.setItem('userEmail', JSON.stringify(email));
    localStorage.setItem('iqScore', JSON.stringify(iqValue));
    setShowPaymentOptions(true);

    if (paymentOptionsRef.current) {
      setTimeout(() => {
        paymentOptionsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleButtonClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'show_checkout',
      timestamp: new Date().toISOString(),
      userId: userId,
    });
  };

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

  return (
    <Elements stripe={stripePromise}>
      <div className={s.paywall}>
        <section className={s.heroSection} data-aos='fade-up'>
          <h1 className={s.mainHeading}>Unlock Your IQ Potential!</h1>
          <p className={s.introText}>
            Enter your name and email <br />
            to access our comprehensive IQ test. <br />
            Discover your intellectual capabilities,
            <br /> understand your strengths and areas for improvement, <br />
            and embark on a journey of cognitive growth.
          </p>

          <form
            className={s.userForm}
            onSubmit={handleSubmit}
            data-aos='fade-right'
          >
            <label htmlFor='nameInput'>Your first and last name:</label>
            <input
              ref={paymentOptionsRef}
              id='nameInput'
              placeholder='Your first and last name'
              type='text'
              value={name}
              required
              onChange={handleNameChange}
            />
            <label htmlFor='emailInput'>Your email:</label>
            <input
              id='emailInput'
              placeholder='Email'
              type='email'
              value={email}
              required
              onChange={handleEmailChange}
            />
            <button
              type='submit'
              disabled={!name.trim() || !email.trim()}
              className={cn(
                (!name.trim() || !email.trim()) && s.disabled,
                s.paymentButton
              )}
              onClick={handleButtonClick}
            >
              Continue
            </button>
          </form>

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
