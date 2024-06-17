import React, { useEffect, useState } from 'react';
import './index.css';
import './fonts.css';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Terms from './Pages/Terms/Terms';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Analyzing from './Pages/Analyzing/Analyzing';
import Paywall from './Pages/Paywall/Paywall';
import Thanks from './Pages/Thanks/Thanks';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'appLoad',
          timestamp: new Date().toISOString(),
          userId: userId,
        });
      }
    }
  }, [userId]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar user={user} />
      <div className='app'>
        <div className='wrapper'>
          <main>
            <Routes>
              <Route path='/' element={<Home user={user} userId={userId} />} />
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
          </main>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
