import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UniqueIDContext = createContext();
export const UniqueIDProvider = ({ children }) => {
  const [uniqueVisitorId, setUniqueVisitorId] = useState(null);

  useEffect(() => {
    axios
      .get('/check.php')
      .then(response => {
        const id = response.data.uniqueVisitorId;
        setUniqueVisitorId(id);
      })
      .catch(error => {
        console.error('Произошла ошибка при получении уникального ID: ', error);
      });
  }, []);

  return (
    <UniqueIDContext.Provider value={uniqueVisitorId}>
      {children}
    </UniqueIDContext.Provider>
  );
};

export const useUniqueID = () => {
  return useContext(UniqueIDContext);
};
