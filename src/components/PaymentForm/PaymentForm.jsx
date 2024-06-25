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
import { getUserId } from '../../helpers/userId';

import { apiUrl } from '../../key.js';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const PaymentForm = ({ name, email, amount }) => {
  const userId = getUserId();
  const stripe = useStripe();
  const elements = useElements();
  const customNavigate = useCustomNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailInput, setEmailInput] = useState(email);
  const [error, setError] = useState(null);

  const handleDatalayerEvent = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'try_payment',
      timestamp: new Date().toISOString(),
      userId: userId,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    handleDatalayerEvent();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount, currency: 'usd' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
        setError(result.error.message);
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          customNavigate('/thanks');
        }
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleEmailChange = event => {
    setEmailInput(event.target.value);
  };

  return (
    <>
      <div className={s.paymentFormWrapper}>
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
            {isProcessing ? 'Processing...' : 'Get my IQ score'}
          </button>
          {error && <div className={s.error}>{error}</div>}
          <div className={s.priceInfo}>
            <div className={s.priceItem}>
              <span>Previous price:</span>
              <span className={s.oldPrice}>USD 19.90</span>
            </div>
            <div className={s.priceItem}>
              <span>Your discount:</span>
              <span className={s.discount}>90%</span>
            </div>
            <div className={s.priceSeparator}></div>
            <div className={s.priceTotal}>
              <span>Total Price:</span>
              <span className={s.total}>USD 1.90</span>
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
            Please note that <strong>this is a one-time payment</strong> of USD
            1.90 to access your comprehensive IQ test results. You will not be
            enrolled in any subscription, and there are no recurring charges.
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
