import React, { useState } from 'react';
import { registerUser, loginWithGoogle } from '../../helpers/authHelpers.js';
import s from './SignUpForm.module.scss';
import googleLogo from '../../img/logo_google.svg';

const SignUpForm = ({ switchToLogin, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await registerUser(email, password, name);
      console.log('User created successfully');
      window.scrollTo(0, 0);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      console.log('User signed up with Google');
      window.scrollTo(0, 0);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>Sign Up</h2>
      {error && <p className={s.error}>{error}</p>}
      <input
        type='text'
        placeholder='Name and Surname'
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className={s.SignUpInput}
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={s.SignUpInput}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className={s.SignUpInput}
      />
      <button className={s.SignUpButton} type='submit'>
        Sign Up
      </button>
      <button
        type='button'
        onClick={handleGoogleSignUp}
        className={s.googleButton}
      >
        <img src={googleLogo} alt='Google logo' />
        Sign Up with Google
      </button>
      <p>
        Already have an account?{' '}
        <span className={s.switchLink} onClick={switchToLogin}>
          Log In
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
