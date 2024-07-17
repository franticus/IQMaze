import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSubscription } from '../helpers/stripeHelpers';

const SubscriptionContext = createContext();

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ user, children }) => {
  const [hasSubscription, setHasSubscription] = useState(() => {
    const savedHasSubscription = sessionStorage.getItem('hasSubscription');
    return savedHasSubscription ? JSON.parse(savedHasSubscription) : false;
  });

  useEffect(() => {
    const verifySubscription = async () => {
      if (!user || !user.email) {
        setHasSubscription(false);
        return;
      }

      const email = user.email;
      console.log('Email to check:', email);

      const { hasSubscription: subscriptionStatus } = await checkSubscription(
        email
      );
      console.log(`Subscription status for ${email}:`, subscriptionStatus);

      setHasSubscription(subscriptionStatus);
      sessionStorage.setItem(
        'hasSubscription',
        JSON.stringify(subscriptionStatus)
      );
    };

    verifySubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={hasSubscription}>
      {children}
    </SubscriptionContext.Provider>
  );
};
