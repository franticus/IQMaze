import './index.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Paywall from './Pages/Paywall/Paywall';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/iqtest' element={<Test />} />
          <Route path='/about' element={<About />} />
          <Route path='/paywall' element={<Paywall />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
