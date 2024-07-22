/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import s from './CustomPayFormV1.module.scss';
import { publicKey, apiUrl } from '../../key';
import { useSubscription } from '../../context/SubscriptionContext';
import { priceId } from '../../key';

import cancelAnytime from '../../img/cancelAnytime.svg';
import guarantee from '../../img/guarantee.svg';
import Loader from '../Loader/Loader';

const stripePromise = loadStripe(publicKey);

const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const CardForm = ({
  subscriptionInfo,
  isLoading,
  setLoading,
  user,
  email,
  priceId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const customNavigate = useCustomNavigate();

  useEffect(() => {
    emailRef.current.value = email;
  }, [email]);

  const handleSubmit = async event => {
    event.preventDefault();

    const email = emailRef.current.value;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: email,
        name: nameRef.current.value,
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
    } else {
      console.log(result.paymentMethod);

      const response = await fetch(`${apiUrl}/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: result.paymentMethod.id,
          email: emailRef.current.value,
          name: nameRef.current.value,
          priceId: priceId,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        console.log('Subscription succeeded:', data);
        localStorage.setItem('userName', JSON.stringify(nameRef.current.value));
        customNavigate('/thanks');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        Email
        <input
          type='email'
          placeholder='Email'
          required
          className={s.input}
          ref={emailRef}
        />
      </label>
      <label className={s.label}>
        Card number
        <CardNumberElement className={s.cardElement} />
      </label>
      <div className={s.row}>
        <label className={s.label}>
          Expiry (MM/YY)
          <CardExpiryElement className={s.cardElement} />
        </label>
        <label className={s.label}>
          CVV
          <CardCvcElement className={s.cardElement} />
        </label>
      </div>
      <label className={s.label}>
        Name on card
        <input
          type='text'
          placeholder='Full name'
          required
          className={s.input}
          ref={nameRef}
        />
      </label>
      {!isLoading && (
        <button type='submit' className={s.submitButton}>
          Start 1 Month Trial for $
          {(subscriptionInfo.trialPrice / 100).toFixed(2)}
        </button>
      )}
    </form>
  );
};

const CustomPayFormV1 = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePaymentRequest, setCanMakePaymentRequest] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const [testsTaken, setTestsTaken] = useState(3548);
  const [isLoading, setLoading] = useState(false);
  const stripe = useStripe();
  const hasSubscription = useSubscription();

  const verifySubscriptionStatus = async () => {
    try {
      const response = await fetch(`${apiUrl}/check-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailFromStorage,
        }),
      });
      const data = await response.json();
      if (!data.hasSubscription) {
        console.log('No active subscription found.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error verifying subscription:', error);
      return false;
    }
  };

  const emailFromStorage = localStorage.getItem('userEmail')
    ? JSON.parse(localStorage.getItem('userEmail'))
    : user?.email || '';

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}/subscription-info`, {
          headers: {
            Origin: window.location.origin,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data:', data);
        setSubscriptionInfo(data);

        if (stripe && data.trialPrice) {
          console.log('subscriptionInfo:', data.trialPrice);
          const pr = stripe.paymentRequest({
            country: 'US',
            currency: data.currency,
            total: {
              label: 'Total',
              amount: data.trialPrice,
            },
            requestPayerName: true,
            requestPayerEmail: true,
            paymentMethodTypes: ['card', 'google_pay', 'apple_pay'],
          });

          pr.canMakePayment()
            .then(result => {
              if (result) {
                setPaymentRequest(pr);
                setCanMakePaymentRequest(true);
              } else {
                console.log('CannotMakePaymentRequest');
                setCanMakePaymentRequest(false);
              }
            })
            .catch(error => {
              console.error('Error checking PaymentRequest:', error);
            });

          pr.on('paymentmethod', async ev => {
            const { clientSecret, error: backendError } = await fetch(
              `${apiUrl}/create-payment-intent`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: emailFromStorage,
                  paymentMethodId: ev.paymentMethod.id,
                }),
              }
            ).then(r => r.json());

            if (backendError) {
              console.log(backendError.message);
              ev.complete('fail');
              return;
            }

            const { error: confirmError, paymentIntent } =
              await stripe.confirmCardPayment(clientSecret, {
                payment_method: ev.paymentMethod.id,
              });

            if (confirmError) {
              console.log(confirmError.message);
              ev.complete('fail');
              return;
            }

            if (paymentIntent.status === 'requires_action') {
              const { error } = await stripe.confirmCardPayment(clientSecret);
              if (error) {
                console.log(error.message);
                ev.complete('fail');
                return;
              }
            }

            if (paymentIntent.status === 'succeeded') {
              ev.complete('success');
              console.log('Payment succeeded:', paymentIntent);
              const isSubscribed = await verifySubscriptionStatus();
              if (isSubscribed) {
                console.log(
                  'Subscription verified, navigating to thanks page.'
                );
                customNavigate('/thanks');
              } else {
                console.log(
                  'Subscription verification failed, not navigating.'
                );
              }
            }
          });
        }
      } catch (error) {
        console.error('Error fetching subscription info:', error);
      }
    };

    fetchSubscriptionInfo();
  }, [stripe, emailFromStorage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestsTaken(prevTestsTaken => prevTestsTaken + 1);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(interval);
  }, []);

  if (hasSubscription) {
    return <div>You already have an active subscription.</div>;
  }

  if (!subscriptionInfo.trialPrice) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <p className={s.description_over}>
          Over <strong>{testsTaken}</strong> tests taken today Avg. IQ score:
          103
        </p>
        <h2>
          Try <span className={s.highlight}>IQMaze</span> for 1 month
        </h2>
      </div>
      <ul className={s.benefits}>
        <li>
          ✔ Get your precise IQ score with our scientifically-validated
          assessment
        </li>
        <li>✔ Know where you stand compared to the general population</li>
        <li>✔ Identify your cognitive strengths and weaknesses</li>
        <li>
          ✔ Evidence-based personalized training to boost IQ by up to 37% in 4
          weeks
        </li>
      </ul>
      <div className={s.totalDue}>
        <p>Total due today:</p>
        <p className={s.price}>
          <del>${(subscriptionInfo.regularPrice / 100).toFixed(2)}</del> $
          {(subscriptionInfo.trialPrice / 100).toFixed(2)} <br />
          <span className={s.discount}>You save 85%</span>
        </p>
      </div>
      <p className={s.afterwards}>
        Your 1 month trial will cost only $
        {(subscriptionInfo.trialPrice / 100).toFixed(2)}. Afterwards, it will be
        ${(subscriptionInfo.regularPrice / 100).toFixed(2)}/month.
      </p>
      <p className={s.noCommitment}>
        <img
          className={s.guaranteeImg}
          src={cancelAnytime}
          alt='cancel anytime'
        />
        No commitment. Cancel anytime.
      </p>
      <p className={s.moneyBackGuarantee}>
        <img
          className={s.guaranteeImg}
          src={guarantee}
          alt='money back guarantee'
        />
        30-Day Money-Back Guarantee.
      </p>
      <div className={s.paymentMethods}>
        {canMakePaymentRequest && (
          <>
            <p>Pay with</p>
            <PaymentRequestButtonElement
              options={{ paymentRequest }}
              className={s.paymentRequestButton}
            />
            <p>or</p>
          </>
        )}
        <p>Pay with your credit card</p>
        <Elements stripe={stripePromise}>
          <CardForm
            subscriptionInfo={subscriptionInfo}
            isLoading={isLoading}
            setLoading={setLoading}
            user={user}
            email={emailFromStorage}
            priceId={priceId}
          />
        </Elements>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default CustomPayFormV1;
