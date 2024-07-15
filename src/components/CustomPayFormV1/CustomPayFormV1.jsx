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
import s from './CustomPayFormV1.module.scss';
import { publicKey, apiUrl } from '../../key';

const stripePromise = loadStripe(publicKey);

const CardForm = ({ subscriptionInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const result = await stripe.createToken(cardNumberElement);

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);

      const response = await fetch(`${apiUrl}/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: result.token.id,
          email: emailRef.current.value,
          name: nameRef.current.value,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
      } else {
        console.log('Subscription succeeded:', data);
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
      <button type='submit' className={s.submitButton}>
        Start 1 Month Trial for ${subscriptionInfo.trialPrice / 100}
      </button>
    </form>
  );
};

const CustomPayFormV1 = () => {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakeGooglePay, setCanMakeGooglePay] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const stripe = useStripe();

  useEffect(() => {
    const fetchSubscriptionInfo = async () => {
      const response = await fetch(`${apiUrl}/subscription-info`);
      const data = await response.json();
      setSubscriptionInfo(data);
    };

    fetchSubscriptionInfo();
  }, []);

  useEffect(() => {
    if (stripe && subscriptionInfo.trialPrice) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: subscriptionInfo.currency,
        total: {
          label: 'Total',
          amount: subscriptionInfo.trialPrice,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPaymentMethod: {
          type: 'google_pay',
        },
      });

      pr.canMakePayment().then(result => {
        if (result && result.paymentMethodType === 'google_pay') {
          setPaymentRequest(pr);
          setCanMakeGooglePay(true);
        } else {
          setCanMakeGooglePay(false);
        }
      });
    }
  }, [stripe, subscriptionInfo]);

  if (!subscriptionInfo.trialPrice) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <p>
          Over <strong>3548</strong> tests taken today Avg. IQ score:{' '}
          <strong>103</strong>
        </p>
        <h2>
          Try <span className={s.highlight}>IQMaze</span> for 1 month
        </h2>
      </div>
      <ul className={s.benefits}>
        <li>
          Get your precise IQ score with our scientifically-validated assessment
        </li>
        <li>Know where you stand compared to the general population</li>
        <li>Identify your cognitive strengths and weaknesses</li>
        <li>
          Evidence-based personalized training to boost IQ by up to 37% in 4
          weeks
        </li>
      </ul>
      <div className={s.totalDue}>
        <p>Total due today:</p>
        <p className={s.price}>
          <del>${subscriptionInfo.regularPrice / 100}</del> $
          {subscriptionInfo.trialPrice / 100}{' '}
          <span className={s.discount}>You save 85%</span>
        </p>
      </div>
      <p>
        Your 1 month trial will cost only ${subscriptionInfo.trialPrice / 100}.
        Afterwards, it will be ${subscriptionInfo.regularPrice / 100}/month.
      </p>
      <p className={s.noCommitment}>No commitment. Cancel anytime.</p>
      <p className={s.moneyBackGuarantee}>30-Day Money-Back Guarantee.</p>
      <div className={s.paymentMethods}>
        {canMakeGooglePay && (
          <>
            <p>Pay with Google Pay</p>
            <PaymentRequestButtonElement
              options={{ paymentRequest }}
              className={s.googlePayButton}
            />
            <p>or</p>
          </>
        )}
        <p>Pay with your credit card</p>
        <Elements stripe={stripePromise}>
          <CardForm subscriptionInfo={subscriptionInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default CustomPayFormV1;
