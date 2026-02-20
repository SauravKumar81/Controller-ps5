import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
  `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const Scrollytelling: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload Images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current[i] = img;
      }
    };
    preloadImages();

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Initially set the canvas to match first frame dimensions upon first load
        const img = new Image();
        img.src = currentFrame(1);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        };
      }
    }
  }, []);

  // Handle Scroll and Canvas Rendering
  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollY = -containerRect.top;
      const scrollHeight = containerRect.height - window.innerHeight;
      
      let progress = scrollY / scrollHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      targetProgress = progress;
    };

    const renderLoop = () => {
      // Lerp for smooth buttery scroll
      currentProgress += (targetProgress - currentProgress) * 0.08;
      
      // Update react state for text section transitions
      setScrollProgress(currentProgress);

      const frameIndex = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.floor(currentProgress * FRAME_COUNT) + 1)
      );

      const context = canvasRef.current?.getContext('2d');
      const img = imagesRef.current[frameIndex];
      if (context && img && canvasRef.current) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    renderLoop(); // Start the loop

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getSectionClass = (start: number, end: number) => {
    return scrollProgress >= start && scrollProgress < end ? 'active' : '';
  };

  return (
    <div className="scrolly-container" ref={containerRef}>
      <div className="sticky-wrapper">
        <div className="canvas-container">
          <canvas ref={canvasRef} className="sequence-image" />
        </div>

        <div className="scroll-content">
          {/* Section 1: Hero (0-15%) */}
          <div className={`story-section align-center ${getSectionClass(0, 0.15)}`}>
            <h1 className="hero-title">DualSense Wireless Controller</h1>
            <h2 className="hero-subtitle">Feel the game.</h2>
            <p className="hero-support">Next-generation immersion, engineered for PlayStation 5.</p>
          </div>

          {/* Section 2: Design & Ergonomics (15-35%) */}
          <div className={`story-section align-left ${getSectionClass(0.15, 0.35)}`}>
            <h2 className="section-title">Iconic design.<br/>Refined comfort.</h2>
            <p className="section-body">Sculpted contours and precision balance deliver effortless control.</p>
            <p className="section-body">Designed for hours of uninterrupted play.</p>
          </div>

          {/* Section 3: Haptic Feedback (35-55%) */}
          <div className={`story-section align-right ${getSectionClass(0.35, 0.55)}`}>
            <h2 className="section-title">Haptic feedback</h2>
            <p className="section-body">Feel every impact, texture, and movement.</p>
            <p className="section-body">Dynamic vibrations respond to your actions in real time.</p>
          </div>

          {/* Section 4: Adaptive Triggers (55-75%) */}
          <div className={`story-section align-left ${getSectionClass(0.55, 0.75)}`}>
            <h2 className="section-title">Adaptive triggers</h2>
            <p className="section-body">Experience varying force and tension.</p>
            <p className="section-body">From drawing a bowstring to braking at high speed.</p>
          </div>

          {/* Section 5: Audio & Sensors (75-85%) */}
          <div className={`story-section align-right ${getSectionClass(0.75, 0.85)}`}>
            <h2 className="section-title">Integrated intelligence</h2>
            <p className="section-body">Built-in microphone and speaker.</p>
            <p className="section-body">Motion sensors and touchpad expand gameplay possibilities.</p>
          </div>

          {/* Section 6: Reassembly & CTA (85-100%) */}
          <div className={`story-section align-center ${getSectionClass(0.85, 1.01)}`}>
            <h2 className="section-title">Play beyond boundaries.</h2>
            <p className="hero-subtitle">DualSense. A new dimension of control.</p>
            <div className="cta-group">
              <button className="btn-cta">Experience DualSense</button>
              <button className="btn-secondary">View full specs</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scrollytelling;
