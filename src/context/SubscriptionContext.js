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
      const localStorageEmail = localStorage.getItem('userEmail');
      console.log('localStorageEmail:', localStorageEmail);
      const emailsToCheck = new Set();

      if (user && user.email) {
        emailsToCheck.add(user.email);
      }

      if (localStorageEmail) {
        emailsToCheck.add(JSON.parse(localStorageEmail));
      }

      console.log('Emails to check:', emailsToCheck);

      let hasSubscription = false;

      for (const email of emailsToCheck) {
        const { hasSubscription: subscriptionStatus } = await checkSubscription(
          email
        );
        console.log(`Subscription status for ${email}:`, subscriptionStatus);
        if (subscriptionStatus) {
          hasSubscription = true;
          break;
        }
      }

      setHasSubscription(hasSubscription);
      sessionStorage.setItem(
        'hasSubscription',
        JSON.stringify(hasSubscription)
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
