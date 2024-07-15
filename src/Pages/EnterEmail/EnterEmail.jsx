import React, { useState } from 'react';
import s from './EnterEmail.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const EnterEmail = () => {
  const [email, setEmail] = useState('');
  const customNavigate = useCustomNavigate();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('userEmail', JSON.stringify(email));
    customNavigate('/paywall');
  };

  return (
    <div className={s.container}>
      <h1>
        Discover <span className={s.highlight}>Your IQ</span> Potential!
      </h1>
      <p className={s.description}>
        Enter your email to gain exclusive access to our detailed IQ assessment.
        Learn about your intellectual strengths and weaknesses and begin a
        journey of cognitive enhancement.
      </p>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type='email'
          value={email}
          onChange={handleChange}
          placeholder='Email'
          required
          className={s.emailInput}
        />
        <button type='submit' className={s.submitButton}>
          Continue
        </button>
      </form>
      <p className={s.disclaimer}>
        Cerebrum IQ ensures the confidentiality of your personal information. By
        clicking "Continue" below you acknowledge that you have read,
        understood, and accepted CerebrumIQ's{' '}
        <a href='/terms' className={s.link}>
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a href='/privacy' className={s.link}>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default EnterEmail;
