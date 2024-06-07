/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import s from './PaymentForm.module.scss';
import cn from 'classnames';
import { getUserId } from '../../helpers/userId';

import { url, urlDEV } from '../../key.js';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ name, email, amount, apiKey }) => {
  const userId = getUserId();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailInput, setEmailInput] = useState(email);
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, amount]);

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
          navigate('/thanks');
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
    <>
      <h2 className={s.formTitle}>Almost Done!</h2>
      <div className={s.paymentFormWrapper}>
        <form onSubmit={handleSubmit} className={s.paymentForm}>
          {paymentRequest && (
            <div className={s.paymentRequestWrapper}>
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </div>
          )}
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
