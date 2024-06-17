import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import s from './LoginForm.module.scss';
import googleLogo from '../../img/logo_google.svg';

const LoginForm = ({ switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('User logged in with Google');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>Login</h2>
      {error && <p className={s.error}>{error}</p>}
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={s.LoginInput}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className={s.LoginInput}
      />
      <button className={s.LoginButton} type='submit'>
        Login
      </button>
      <button
        type='button'
        onClick={handleGoogleLogin}
        className={s.googleButton}
      >
        <img src={googleLogo} alt='Google logo' />
        Login with Google
      </button>
      <p>
        Don't have an account?{' '}
        <span className={s.switchLink} onClick={switchToSignUp}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
