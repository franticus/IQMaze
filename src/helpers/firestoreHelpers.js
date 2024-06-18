import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig'; // Импортируйте вашу конфигурацию Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Сохранение данных пользователя в Firestore при регистрации
export const saveUserData = async (userId, email, displayName) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      email,
      displayName,
      createdAt: new Date(),
    });
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Обновление данных пользователя в Firestore после покупки
export const updateUserPurchaseData = async (
  userId,
  iqValue,
  subscriptionData
) => {
  try {
    await setDoc(
      doc(db, 'users', userId),
      {
        iqValue,
        subscriptionData,
        updatedAt: new Date(),
      },
      { merge: true }
    );
    console.log('User purchase data updated successfully.');
  } catch (error) {
    console.error('Error updating user purchase data:', error);
    throw error;
  }
};
