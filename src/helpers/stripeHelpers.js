import { apiUrl } from '../key';

const fetchApiKey = async () => {
  const response = await fetch(`${apiUrl}/get-api-key`);
  const { apiKey } = await response.json();
  return apiKey;
};

const checkSubscription = async email => {
  try {
    const response = await fetch(`${apiUrl}/check-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { hasSubscription: false };
  }
};

const createCheckoutSession = async (
  email,
  userId,
  priceId,
  iqValue,
  name,
  urlParams
) => {
  try {
    const apiKey = await fetchApiKey();
    const response = await fetch(`${apiUrl}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: email.replace(/['"]+/g, ''),
        userId,
        priceId,
        iqValue,
        userName: name,
        urlParams: urlParams.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating checkout session: ', error);
    throw error;
  }
};

const createBillingPortalSession = async email => {
  try {
    const apiKey = await fetchApiKey();
    const response = await fetch(`${apiUrl}/create-billing-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email: email.replace(/['"]+/g, '') }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error creating billing portal session: ', error);
    throw error;
  }
};

const cancelSubscription = async email => {
  try {
    const apiKey = await fetchApiKey();
    const response = await fetch(`${apiUrl}/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email: email.replace(/['"]+/g, '') }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error cancelling subscription: ', error);
    throw error;
  }
};

export {
  checkSubscription,
  createCheckoutSession,
  createBillingPortalSession,
  cancelSubscription,
};
