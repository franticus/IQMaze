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
      <div className={s.paymentMethod}>
        <button type='button' className={s.paypalButton}>
          PayPal
        </button>
        <div className={s.orSeparator}>or</div>
      </div>
      <div className={s.cardDetails}>
        <label>Card number</label>
        <CardNumberElement
          className={s.cardElement}
          options={{ style: { base: { color: '#fff' } } }}
        />
        <div className={s.cardInfo}>
          <div className={s.cardExpiry}>
            <label>Card expires</label>
            <CardExpiryElement
              className={s.cardElement}
              options={{ style: { base: { color: '#fff' } } }}
            />
          </div>
          <div className={s.cardCvc}>
            <label>Security number</label>
            <CardCvcElement
              className={s.cardElement}
              options={{ style: { base: { color: '#fff' } } }}
            />
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
          <span>Your personalized plan:</span>
          <span>USD 24.99</span>
        </div>
        <div className={s.priceItem}>
          <span>Introductory offer discount:</span>
          <span>-USD 5.00</span>
        </div>
        <div className={s.priceSeparator}></div>
        <div className={s.priceTotal}>
          <span>Total Price:</span>
          <span>USD 19.99</span>
        </div>
      </div>
      <div className={s.terms}>
        <span>
          By continuing, you agree with the{' '}
          <a href='/terms-conditions/' target='_blank' rel='noreferrer'>
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a
            href='/web-privacy-policy-jun-2023/'
            target='_blank'
            rel='noreferrer'
          >
            Privacy Policy.
          </a>
        </span>
      </div>
      <div className={s.warning}>
        By continuing, you agree that if you don’t cancel at least 24 hours
        prior to the end of the first renewal period, you will automatically be
        charged the full price of USD 19.99 every 1 month until you cancel.
      </div>
    </form>
  );
};

export default PaymentForm;
