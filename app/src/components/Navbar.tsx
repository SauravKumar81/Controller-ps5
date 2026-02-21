import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">PlayStation</div>
      
      <ul className="nav-links">
        <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Overview</li>
        <li onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>Features</li>
        <li onClick={() => document.getElementById('haptics')?.scrollIntoView({ behavior: 'smooth' })}>Haptics</li>
        <li onClick={() => document.getElementById('triggers')?.scrollIntoView({ behavior: 'smooth' })}>Triggers</li>
        <li onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}>Games</li>
      </ul>

      <button className="btn-cta" onClick={() => document.getElementById('buy-now')?.scrollIntoView({ behavior: 'smooth' })}>Experience DualSense</button>
    </nav>
  );
};

export default Navbar;
