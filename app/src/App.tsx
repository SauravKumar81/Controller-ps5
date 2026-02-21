import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Scrollytelling from './components/Scrollytelling';
import Features from './components/Features';
import GameCarousel from './components/GameCarousel';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Scrollytelling />
        <Features />
        <GameCarousel />
        <Footer />
      </main>
    </div>
  );
}

export default App;
