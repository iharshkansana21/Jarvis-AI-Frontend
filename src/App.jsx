import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Assistant from './pages/Assistant';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes with Header and Footer */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <Login />
            </>
          } />
          <Route path="/register" element={
            <>
              <Header />
              <Register />
            </>
          } />
          
          {/* Full-screen Assistant route without Header/Footer */}
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;