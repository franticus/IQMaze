import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutButton = () => {
  const [stripe, setStripe] = useState(null);
  const url = 'https://iqmazestripe-myfirst27.amvera.io';
  // const publicKey =
  //   'pk_live_51Huk90BbDeRYiB9tviB7TIaYaMB0uYOyK7wIPE6Q4LNOhuSyJTY7rxW9M30YFkIOp2RDOngiLmGnp5uBh00EirHF00tQNCRo3i';
  const publicKeyDEV =
    'pk_test_51PNcn6RrQfUQC5MYaOchK1YrrDtBrxRDbyzQ2rfUIw7QhiIPmOU0vLYBq17pyMSQKAw99bqVnmeYGELIq2KOncST00ysRkRCO0';

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
