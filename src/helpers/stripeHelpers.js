import { url, urlDEV, urlLOCAL } from '../key';

const currentUrl = window.location.href;

const apiUrl = currentUrl.includes('iq-check140')
  ? url
  : currentUrl.includes('localhost')
  ? urlLOCAL
  : urlDEV;

const fetchApiKey = async () => {
  const response = await fetch(`${apiUrl}/get-api-key`);
  const { apiKey } = await response.json();
  return apiKey;
};

const checkSubscription = async email => {
  try {
    const apiKey = await fetchApiKey();
    const response = await fetch(`${apiUrl}/check-subscription`, {
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
    console.error('Error checking subscription status: ', error);
    return { hasSubscription: false };
  }
};

const createCheckoutSession = async (email, userId, priceId, iqValue, name) => {
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

export { checkSubscription, createCheckoutSession, createBillingPortalSession };
