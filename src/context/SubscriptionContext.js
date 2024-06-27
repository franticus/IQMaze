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
      if (user) {
        const { hasSubscription } = await checkSubscription(user.email);
        setHasSubscription(hasSubscription);
        sessionStorage.setItem(
          'hasSubscription',
          JSON.stringify(hasSubscription)
        );
      } else {
        setHasSubscription(false);
        sessionStorage.setItem('hasSubscription', JSON.stringify(false));
      }
    };

    verifySubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={hasSubscription}>
      {children}
    </SubscriptionContext.Provider>
  );
};
