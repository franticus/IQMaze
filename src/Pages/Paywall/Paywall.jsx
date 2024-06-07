/* eslint-disable no-unused-vars */
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

import { publicKey, publicKeyDEV, url, urlDEV } from '../../key.js';

const stripePromise = loadStripe(publicKeyDEV);

const Paywall = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchApiKey = async () => {
      try {
        const response = await fetch(`${urlDEV}/get-api-key`, {
          method: 'GET',
        });
        const { apiKey } = await response.json();
        setApiKey(apiKey);
      } catch (error) {
        console.error('Failed to fetch API key:', error);
      }
    };

    fetchApiKey();
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

          <form onSubmit={handleSubmit} data-aos='fade-right'>
            <label htmlFor='nameInput'>Your first and last name:</label>
            <input
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
              className={cn((!name.trim() || !email.trim()) && s.disabled)}
            >
              Get my IQ score
            </button>
          </form>

          {apiKey && (
            <PaymentForm
              name={name}
              email={email}
              amount={1900}
              apiKey={apiKey}
            />
          )}

          <h2 className={s.mainHeading} data-aos='fade-left'>
            Information on Test Results
          </h2>
          <ul className={s.list} data-aos='fade-left'>
            <li className={s.list_item}>
              After entering your details, you'll receive a personalized and
              signed certificate displaying your test results. <br /> (The photo
              is a rough sample with fictitious data)
            </li>
            <li>
              <img
                src={certificate}
                alt='certificate'
                className={s.heroImage}
              />
            </li>
            <li className={s.list_item}>
              This certificate is unique and will be created specifically for
              you, reflecting your IQ score and ranking amongst over 5 million
              people worldwide.
            </li>
            <li className={s.list_item}>
              Understand your job relevance with detailed insights from IQMaze,
              including your percentile and IQ score.
            </li>
            <li className={s.list_item}>
              Don't miss out on this opportunity to validate and celebrate your
              intellectual achievements!
            </li>
          </ul>
        </section>
      </div>
    </Elements>
  );
};

export default Paywall;
