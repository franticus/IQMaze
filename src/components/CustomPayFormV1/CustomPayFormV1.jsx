/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentRequestButtonElement,
  useStripe,
} from '@stripe/react-stripe-js';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import s from './CustomPayFormV1.module.scss';
import { publicKey, apiUrl } from '../../key';
import { useSubscription } from '../../context/SubscriptionContext';
import { priceId } from '../../key';

import Loader from '../Loader/Loader';
import CardForm from '../CardForm/CardForm';
import CustomPayFormHeader from './CustomPayFormHeader';

const stripePromise = loadStripe(publicKey);

const CustomPayFormV1 = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePaymentRequest, setCanMakePaymentRequest] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const stripe = useStripe();
  const hasSubscription = useSubscription();

  const emailFromStorage = localStorage.getItem('userEmail')
    ? JSON.parse(localStorage.getItem('userEmail'))
    : user?.email || '';

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

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

          pr.on('token', async ev => {
            try {
              const response = await fetch(`${apiUrl}/create-customer`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: ev.token.id,
                  email: emailFromStorage,
                  name: user ? user.name : '',
                }),
              });

              const customerResponse = await response.json();
              console.log('customerResponse:', customerResponse);

              if (customerResponse.error) {
                console.log(
                  'Customer creation failed:',
                  customerResponse.error
                );
                ev.complete('fail');
                return;
              }

              console.log('Customer created successfully:', customerResponse);

              const subscriptionResponse = await fetch(
                `${apiUrl}/create-subscription`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    customerId: customerResponse.customer.id,
                    paymentMethodId: ev.token.card.id,
                    priceId: priceId,
                  }),
                }
              ).then(r => r.json());

              if (subscriptionResponse.error) {
                console.log(
                  'Subscription creation failed:',
                  subscriptionResponse.error
                );
                ev.complete('fail');
                return;
              }

              console.log(
                'Subscription created or updated successfully:',
                subscriptionResponse
              );

              const { clientSecret } = subscriptionResponse;
              const { error: confirmError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret);

              if (confirmError) {
                console.log('Payment confirmation failed:', confirmError);
                ev.complete('fail');
                return;
              }

              if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded:', paymentIntent);
                ev.complete('success');
                customNavigate('/thanks');
              }
            } catch (error) {
              console.error('Error handling token event:', error);
              ev.complete('fail');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching subscription info:', error);
      }
    };

    fetchSubscriptionInfo();
  }, [stripe, emailFromStorage]);

  if (hasSubscription) {
    return <div>You already have an active subscription.</div>;
  }

  if (!subscriptionInfo.trialPrice) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <CustomPayFormHeader user={user} subscriptionInfo={subscriptionInfo} />
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
