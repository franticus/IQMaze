import React, { useEffect, useState, Suspense, lazy } from 'react';
import './index.css';
import './fonts.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { SubscriptionProvider } from './context/SubscriptionContext';
import PreStart from './Pages/PreStart/PreStart';

const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/PrivacyPolicy'));
const Terms = lazy(() => import('./Pages/Terms/Terms'));
const Home = lazy(() => import('./Pages/Home/Home'));
const HomeV2Cereb = lazy(() => import('./Pages/HomeV2Cereb/HomeV2Cereb'));
const Test = lazy(() => import('./Pages/Test/Test'));
const Analyzing = lazy(() => import('./Pages/Analyzing/Analyzing'));
const Paywall = lazy(() => import('./Pages/Paywall/Paywall'));
const PaywallV2Cereb = lazy(() =>
  import('./Pages/PaywallV2Cereb/PaywallV2Cereb')
);
const EnterEmail = lazy(() => import('./Pages/EnterEmail/EnterEmail'));
const Thanks = lazy(() => import('./Pages/Thanks/Thanks'));

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const currentUrl = window.location.href;
  const isHomeV2Cereb = currentUrl.includes('homeV2Cereb');
  const isPaywallV2Cereb = currentUrl.includes('paywallV2Cereb');

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
        // localStorage.removeItem('userName');
        // localStorage.removeItem('userEmail');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SubscriptionProvider user={user}>
      <ScrollToTop />
      <Navbar user={user} />
      <div className='app'>
        <div className='wrapper'>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path='/'
                  element={
                    isHomeV2Cereb ? (
                      <HomeV2Cereb user={user} userId={userId} />
                    ) : (
                      <Home user={user} userId={userId} />
                    )
                  }
                />
                <Route
                  path='/home'
                  element={
                    isHomeV2Cereb ? (
                      <HomeV2Cereb user={user} userId={userId} />
                    ) : (
                      <Home user={user} userId={userId} />
                    )
                  }
                />
                <Route
                  path='/prestart'
                  element={<PreStart user={user} userId={userId} />}
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
                  path='/email'
                  element={<EnterEmail user={user} userId={userId} />}
                />
                <Route
                  path='/paywall'
                  element={
                    isPaywallV2Cereb ? (
                      <PaywallV2Cereb user={user} userId={userId} />
                    ) : (
                      <Paywall user={user} userId={userId} />
                    )
                  }
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
    </SubscriptionProvider>
  );
}

export default App;
