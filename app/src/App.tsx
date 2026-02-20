import React from 'react';
import Navbar from './components/Navbar';
import Scrollytelling from './components/Scrollytelling';
import Features from './components/Features';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Scrollytelling />
        
        <Features />

       
      </main>
    </div>
  );
}

export default App;
