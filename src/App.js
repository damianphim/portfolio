// src/App.js
import React, { Suspense, lazy } from 'react';
import GalaxyAnimation from './components/GalaxyAnimation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import { useEffect } from 'react'

const Home = lazy(() => import('./components/Home'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event('resize'));
    };
    handleResize(); // Trigger resize on initial load
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyles />
      <GalaxyAnimation />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;