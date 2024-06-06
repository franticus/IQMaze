import React, { useEffect } from 'react';
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
import { getUserId } from './helpers/userId';

function App() {
  useEffect(() => {
    const userId = getUserId();
    console.log('userId:', userId);

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'appLoad',
        timestamp: new Date().toISOString(),
        userId: userId,
      });
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className='app'>
        <div className='wrapper'>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/iqtest' element={<Test />} />
              <Route path='/privacy' element={<PrivacyPolicy />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/analyzing' element={<Analyzing />} />
              <Route path='/paywall' element={<Paywall />} />
              <Route path='/thanks' element={<Thanks />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
