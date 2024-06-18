import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { saveUserData } from '../../helpers/firestoreHelpers';
import s from './LoginForm.module.scss';
import googleLogo from '../../img/logo_google.svg';

const LoginForm = ({ switchToSignUp, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Сохранение данных пользователя в Firestore
      await saveUserData(user.uid, user.email, user.displayName);

      console.log('User logged in with Google');
      onSuccess();
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
