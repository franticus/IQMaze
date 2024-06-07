/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { publicKey, publicKeyDEV, url, urlDEV } from '../../key.js';

const CheckoutButton = () => {
  const [stripe, setStripe] = useState(null);

  React.useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe(publicKeyDEV);
      setStripe(stripe);
    };
    initializeStripe();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(`${url}/get-api-key`, { method: 'GET' });

      if (!response.ok) {
        console.error('Failed to get API key');
        return;
      }

      const { apiKey } = await response.json();

      const sessionResponse = await fetch(`${url}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
        },
      });

      const session = await sessionResponse.json();

      if (sessionResponse.ok) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } else {
        console.error('Error creating checkout session:', session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button id='checkout-button' onClick={handleClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
