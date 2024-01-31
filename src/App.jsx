import './index.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Paywall from './Pages/Paywall/Paywall';
import Thanks from './Pages/Thanks/Thanks';
import { UniqueIDProvider } from './components/UniqueIDProvider';

function App() {
  return (
    <Router>
      <Navbar />
      <UniqueIDProvider />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/iqtest' element={<Test />} />
          <Route path='/about' element={<About />} />
          <Route path='/paywall' element={<Paywall />} />
          <Route path='/thanks' element={<Thanks />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
