import React, { useEffect, useState, Suspense, lazy } from 'react';
import './index.css';
import './fonts.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/PrivacyPolicy'));
const Terms = lazy(() => import('./Pages/Terms/Terms'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Test = lazy(() => import('./Pages/Test/Test'));
const Analyzing = lazy(() => import('./Pages/Analyzing/Analyzing'));
const Paywall = lazy(() => import('./Pages/Paywall/Paywall'));
const Thanks = lazy(() => import('./Pages/Thanks/Thanks'));

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User is signed in:', user);
        setUser(user);
        setUserId(user.uid);
      } else {
        console.log('No user is signed in');
        setUser(null);
        setUserId(null);
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar user={user} />
      <div className='app'>
        <div className='wrapper'>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path='/'
                  element={<Home user={user} userId={userId} />}
                />
                <Route
                  path='/home'
                  element={<Home user={user} userId={userId} />}
                />
                <Route
                  path='/iqtest'
                  element={<Test user={user} userId={userId} />}
                />
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='/terms' element={<Terms />} />
                <Route
                  path='/analyzing'
                  element={<Analyzing user={user} userId={userId} />}
                />
                <Route
                  path='/paywall'
                  element={<Paywall user={user} userId={userId} />}
                />
                <Route
                  path='/thanks'
                  element={<Thanks user={user} userId={userId} />}
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
