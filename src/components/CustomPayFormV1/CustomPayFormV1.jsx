import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import GooglePayButton from '@google-pay/button-react';
import s from './CustomPayFormV1.module.scss';
import { publicKey } from '../../key';

const stripePromise = loadStripe(publicKey);

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      // Send the token to your server for processing the payment
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        Email
        <input type='email' placeholder='Email' required className={s.input} />
      </label>
      <label className={s.label}>
        Card number
        <CardElement className={s.cardElement} />
      </label>
      <div className={s.row}>
        <label className={s.label}>
          Expiry (MM/YY)
          <input type='text' placeholder='MM/YY' className={s.input} />
        </label>
        <label className={s.label}>
          CVV
          <input type='text' placeholder='•••' className={s.input} />
        </label>
      </div>
      <label className={s.label}>
        Name on card
        <input type='text' placeholder='Full name' className={s.input} />
      </label>
      <button type='submit' className={s.submitButton}>
        Start 7-Day Trial
      </button>
    </form>
  );
};

const CustomPayFormV1 = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <p>
          Over <strong>3548</strong> tests taken today Avg. IQ score:{' '}
          <strong>103</strong>
        </p>
        <h2>
          Try <span className={s.highlight}>IQMaze</span> for 7 days
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
          <del>$42.99</del> $2.99{' '}
          <span className={s.discount}>You save 85%</span>
        </p>
      </div>
      <p>
        Your 7-day trial will cost only $2.99. Afterwards, it will be
        $56.99/week.
      </p>
      <p className={s.noCommitment}>No commitment. Cancel anytime.</p>
      <p className={s.moneyBackGuarantee}>30-Day Money-Back Guarantee.</p>
      <div className={s.paymentMethods}>
        <GooglePayButton
          environment='TEST'
          buttonColor='black'
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '12345678901234567890',
              merchantName: 'Demo Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: '2.99',
              currencyCode: 'USD',
              countryCode: 'US',
            },
          }}
          onLoadPaymentData={paymentRequest => {
            console.log('load payment data', paymentRequest);
            // Send the payment request to your server for processing the payment
          }}
        />
        <p>or</p>
        <p>Pay with your credit card </p>
        <Elements stripe={stripePromise}>
          <CardForm />
        </Elements>
      </div>
    </div>
  );
};

export default CustomPayFormV1;
