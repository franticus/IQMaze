/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Paywall.module.scss';
import certificate from '../../img/certificate.png';
import { iqTable } from './iqTable.js';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import cn from 'classnames';

const url = 'https://iqmazestripe-myfirst27.amvera.io';
const publicKey =
  'pk_live_51Huk90BbDeRYiB9tviB7TIaYaMB0uYOyK7wIPE6Q4LNOhuSyJTY7rxW9M30YFkIOp2RDOngiLmGnp5uBh00EirHF00tQNCRo3i';

const stripePromise = loadStripe(publicKey);

const Paywall = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
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

    const stripe = await stripePromise;

    try {
      const response = await fetch(`${url}/get-api-key`, { method: 'GET' });

      if (!response.ok) {
        console.error('Failed to get API key');
        return;
      }

      const { apiKey } = await response.json();

      const sessionResponse = await fetch(`${url}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
        },
        body: JSON.stringify({ name, email, iqValue }),
      });

      const session = await sessionResponse.json();

      if (sessionResponse.ok) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } else {
        console.error('Error creating checkout session:', session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
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
            <img src={certificate} alt='certificate' className={s.heroImage} />
          </li>
          <li className={s.list_item}>
            This certificate is unique and will be created specifically for you,
            reflecting your IQ score and ranking amongst over 5 million people
            worldwide.
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
  );
};

export default Paywall;
