import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfigProd = {
  apiKey: 'AIzaSyDALqLjc8xKJ6ls82mJyQ3p8wuRwpbPhIE',
  authDomain: 'iq-check140com.firebaseapp.com',
  projectId: 'iq-check140com',
  storageBucket: 'iq-check140com.appspot.com',
  messagingSenderId: '794318374859',
};

export const firebaseConfigDev = {
  apiKey: 'AIzaSyCoqb88RnmD69ADEJSm9XnzBRP1OTyebmE',
  authDomain: 'stripeiqmaze.firebaseapp.com',
  projectId: 'stripeiqmaze',
  storageBucket: 'stripeiqmaze.appspot.com',
  messagingSenderId: '155045822041',
};

const currentUrl = window.location.href;
export const firebaseConfig = currentUrl.includes('iq-check140')
  ? firebaseConfigProd
  : firebaseConfigDev;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
