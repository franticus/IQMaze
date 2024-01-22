import './index.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
