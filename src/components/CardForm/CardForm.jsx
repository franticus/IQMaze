/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import s from './CardForm.module.scss';
import { apiUrl } from '../../key';

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
        email: emailRef.current.value,
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

      if (data.success) {
        const { clientSecret } = data;
        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          console.log('Payment confirmation failed:', confirmError);
          setLoading(false);
          alert('Payment confirmation failed');
        } else if (paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded:', paymentIntent);
          localStorage.setItem(
            'userName',
            JSON.stringify(nameRef.current.value)
          );
          customNavigate('/thanks');
        } else {
          console.log('Payment status:', paymentIntent.status);
          setLoading(false);
        }
      } else {
        console.log('Subscription creation failed:', data.error);
        setLoading(false);
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

export default CardForm;
