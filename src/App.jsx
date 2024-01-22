import './App.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/iqtest' element={<Test />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
