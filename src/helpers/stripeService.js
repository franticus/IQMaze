const stripe = require('stripe')(
  'sk_test_51PNcn6RrQfUQC5MYHmijfhkmzrc3EkabCo25fq2GZckqew0Ku5ItAxpcfnuUkkhMcCsSexTLtMzXdOYPhvrJdKBM00x7WEywQB'
);

const checkSubscription = async email => {
  try {
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return { hasSubscription: false };
    }

    const customerId = customers.data[0].id;

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    if (subscriptions.data.length === 0) {
      return { hasSubscription: false };
    }

    return { hasSubscription: true };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { hasSubscription: false };
  }
};

module.exports = { checkSubscription };
