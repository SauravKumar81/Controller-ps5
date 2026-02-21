import React, { useEffect, useRef } from 'react';

// Reusable hook for scroll reveal animation
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return ref;
};

const FeatureSection: React.FC<{
  title: string;
  body: string | string[];
  subline?: string;
  align?: 'left' | 'right' | 'center';
  visual?: React.ReactNode;
}> = ({ title, body, subline, align = 'center', visual }) => {
  const ref = useScrollReveal();
  const alignmentClass = `align-${align}`;

  return (
    <div ref={ref} className={`feature-chapter reveal-up ${alignmentClass}`}>
      {visual && align === 'left' && <div className="feature-visual">{visual}</div>}
      
      <div className="feature-text">
        <h3 className="feature-title">{title}</h3>
        {Array.isArray(body) ? (
          body.map((text, i) => <p key={i} className="feature-body">{text}</p>)
        ) : (
          <p className="feature-body">{body}</p>
        )}
        {subline && <p className="feature-subline">{subline}</p>}
      </div>

      {visual && align === 'right' && <div className="feature-visual">{visual}</div>}
      
      {/* For centered, visual usually goes above or below, we'll put it below for now if provided */}
      {visual && align === 'center' && <div className="feature-visual feature-visual-center">{visual}</div>}
    </div>
  );
};

const Features: React.FC = () => {
  const introRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="features-section" className="features-container">
      {/* 1. HERO FEATURE INTRO */}
      <div ref={introRef} className="feature-intro reveal-up">
        <h2 className="intro-title">Feel the next generation.</h2>
        <p className="intro-subtitle">The DualSense wireless controller transforms how you experience games.</p>
      </div>

      {/* 2. HAPTIC FEEDBACK */}
      <FeatureSection
        title="Haptic Feedback"
        body={[
          "Feel physically responsive feedback to your in-game actions.",
          "From subtle textures to explosive force."
        ]}
        subline="Every sensation. Precisely delivered."
        align="left"
        visual={
          <img 
            src="/Haptic Feedback2.png" 
            alt="DualSense Haptic Feedback Actuators" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 3. ADAPTIVE TRIGGERS */}
      <FeatureSection
        title="Adaptive Triggers"
        body={[
          "Dynamic resistance simulates tension and force.",
          "Draw a bow. Slam the brakes. Feel every action."
        ]}
        align="right"
        visual={
          <img 
            src="/Adaptive Triggers.png" 
            alt="DualSense Adaptive Triggers Mechanics" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 4. BUILT-IN MICROPHONE & AUDIO */}
      <FeatureSection
        title="Voice, built in."
        body={[
          "Chat with friends using the integrated microphone.",
          "Or plug in your headset for private immersion."
        ]}
        align="left"
        visual={
          <img 
            src="/Voice, built in..png" 
            alt="DualSense Built-in Microphone" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 5. MOTION SENSORS */}
      <FeatureSection
        title="Motion Control"
        body="Intuitive motion sensing brings natural interaction to compatible games."
        align="center"
        visual={
          <video 
            src="/motion-control.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 6. DESIGN & ERGONOMICS */}
      <FeatureSection
        title="Iconic design. Refined comfort."
        body="Precision balance and sculpted contours for extended play."
        align="left"
        visual={
          <img 
            src="/Iconic design. Refined comfort..png" 
            alt="DualSense Design and Comfort" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 7. BATTERY & CONNECTIVITY */}
      <FeatureSection
        title="Power your play."
        body={[
          "Rechargeable battery with USB-C connectivity.",
          "Play longer. Charge faster."
        ]}
        align="right"
        visual={
          <img 
            src="/power.png" 
            alt="DualSense Battery and USB-C" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 8. ECOSYSTEM / PS5 INTEGRATION */}
      <FeatureSection
        title="Built for PlayStation 5"
        body="Seamlessly integrated with PS5 hardware and features."
        align="center"
        visual={
          <img 
            src="/Built for PlayStation 5.png" 
            alt="PlayStation 5 Ecosystem" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }}
          />
        }
      />

      {/* 9. FINAL CTA SECTION */}
      <div ref={ctaRef} className="feature-cta reveal-up">
        <h2 className="cta-title">Experience a new dimension of control.</h2>
        <div className="cta-group">
          <button className="btn-cta">Buy DualSense</button>
          <button className="btn-secondary">View full specs</button>
        </div>
      </div>
    </section>
  );
};

export default Features;
