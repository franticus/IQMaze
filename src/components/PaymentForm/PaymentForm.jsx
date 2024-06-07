/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import s from './PaymentForm.module.scss';
import cn from 'classnames';

import { publicKey, publicKeyDEV, url, urlDEV } from '../../key.js';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ name, email, amount, apiKey }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailInput, setEmailInput] = useState(email);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(`${urlDEV}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
        },
        body: JSON.stringify({ amount: amount, currency: 'usd' }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: name,
            email: emailInput,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          alert('Payment Successful!');
        }
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
    }
  };

  const handleEmailChange = event => {
    setEmailInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={s.paymentForm}>
      <div className={s.cardDetails}>
        <label>Card number</label>
        <CardNumberElement className={s.cardElement} />
        <div className={s.cardInfo}>
          <div className={s.cardExpiry}>
            <label>Card expires</label>
            <CardExpiryElement className={s.cardElement} />
          </div>
          <div className={s.cardCvc}>
            <label>Security number</label>
            <CardCvcElement className={s.cardElement} />
          </div>
        </div>
        <div className={s.emailField}>
          <label>Email</label>
          <input
            type='email'
            value={emailInput}
            onChange={handleEmailChange}
            placeholder='Enter your email'
            required
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={isProcessing}
        className={cn(s.submitButton, isProcessing && s.disabled)}
      >
        {isProcessing ? 'Processing...' : 'GET MY PLAN'}
      </button>
      <div className={s.priceInfo}>
        <div className={s.priceItem}>
          <span>Price without discount:</span>
          <del>USD 9.90</del>
        </div>
        <div className={s.priceItem}>
          <span>Your discount:</span>
          <span className={s.discount}>90%</span>
        </div>
        <div className={s.priceSeparator}></div>
        <div className={s.priceTotal}>
          <span>Total Price:</span>
          <span>USD 1.90</span>
        </div>
      </div>
      <div className={s.terms}>
        <span>
          By continuing, you agree with the{' '}
          <a href='#/terms' target='_blank' rel='noreferrer'>
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href='#/privacy' target='_blank' rel='noreferrer'>
            Privacy Policy.
          </a>
        </span>
      </div>
      <div className={s.warning}>
        Please note that this is a one-time payment of USD 1.90 to access your
        comprehensive IQ test results. You will not be enrolled in any
        subscription, and there are no recurring charges.
      </div>
    </form>
  );
};

export default PaymentForm;
