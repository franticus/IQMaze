// authHelpers.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { saveUserData } from './firestoreHelpers';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Регистрация пользователя в Firebase
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Сохранение данных пользователя в Firestore
    await saveUserData(user.uid, user.email, displayName);

    // Сохранение данных пользователя в LocalStorage
    localStorage.setItem('userName', JSON.stringify(displayName));
    localStorage.setItem('userEmail', JSON.stringify(email));

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Вход пользователя в Firebase
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};

// Вход пользователя через Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Сохранение данных пользователя в Firestore (при необходимости)
    await saveUserData(user.uid, user.email, user.displayName);

    // Сохранение данных пользователя в LocalStorage
    localStorage.setItem('userName', JSON.stringify(user.displayName));
    localStorage.setItem('userEmail', JSON.stringify(user.email));

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};
