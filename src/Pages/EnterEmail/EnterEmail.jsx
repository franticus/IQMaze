import React, { useState, useEffect, lazy, Suspense } from 'react';
import s from './EnterEmail.module.scss';
import Skeleton from 'react-loading-skeleton';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { useSubscription } from '../../context/SubscriptionContext.js';

const SignUpForm = lazy(() => import('../../components/SignUpForm/SignUpForm'));
const LoginForm = lazy(() => import('../../components/LoginForm/LoginForm'));

const EnterEmail = ({ user }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const customNavigate = useCustomNavigate();
  const hasSubscription = useSubscription();

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    if (user || hasSubscription) {
      customNavigate('/paywall');
    }
  }, [user, hasSubscription, customNavigate]);

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
      <div className={s.formContainer}>
        {!showPaymentOptions &&
          (isLogin ? (
            <Suspense fallback={<Skeleton height={200} width={600} />}>
              <LoginForm
                switchToSignUp={switchToSignUp}
                onSuccess={() => setShowPaymentOptions(true)}
              />
            </Suspense>
          ) : (
            <Suspense fallback={<Skeleton height={200} width={600} />}>
              <SignUpForm
                switchToLogin={switchToLogin}
                onSuccess={() => setShowPaymentOptions(true)}
              />
            </Suspense>
          ))}
      </div>
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
