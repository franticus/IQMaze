import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCoqb88RnmD69ADEJSm9XnzBRP1OTyebmE',
  authDomain: 'stripeiqmaze.firebaseapp.com',
  projectId: 'stripeiqmaze',
  storageBucket: 'stripeiqmaze.appspot.com',
  messagingSenderId: '155045822041',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
