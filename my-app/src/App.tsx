import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SignIn } from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import Contact from './views/Contact';
import Home from './views/Home';
const App = () => {
  return (
    <>
      <Router>
        <Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
          </Routes>
        </Navbar>
      </Router>
    </>
  );
};

export default App;
