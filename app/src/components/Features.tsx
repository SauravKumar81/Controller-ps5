import { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

const FeatureSection: FC<{
  title: string;
  body: string | string[];
  subline?: string;
  align?: 'left' | 'right' | 'center';
  visual?: ReactNode;
  id?: string;
}> = ({ title, body, subline, align = 'center', visual, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const alignmentClass = `align-${align}`;

  // Variants for staggered text reveals
  const textContainerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const textItemVars: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div ref={ref} id={id} className={`feature-chapter ${alignmentClass}`}>
      
      {visual && align === 'left' && (
        <motion.div 
          className="feature-visual glass-style"
          style={{ y: yOffset, scale: scaleImage, opacity }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {visual}
        </motion.div>
      )}
      
      <motion.div 
        className="feature-text glass-panel"
        style={{ padding: '40px' }}
        variants={textContainerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h3 variants={textItemVars} className="feature-title glow-cyan">{title}</motion.h3>
        {Array.isArray(body) ? (
          body.map((text, i) => <motion.p variants={textItemVars} key={i} className="feature-body">{text}</motion.p>)
        ) : (
          <motion.p variants={textItemVars} className="feature-body">{body}</motion.p>
        )}
        {subline && <motion.p variants={textItemVars} className="feature-subline">{subline}</motion.p>}
      </motion.div>

      {visual && align === 'right' && (
         <motion.div 
          className="feature-visual glass-style"
          style={{ y: yOffset, scale: scaleImage, opacity }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {visual}
        </motion.div>
      )}
      
      {visual && align === 'center' && (
        <motion.div 
         className="feature-visual feature-visual-center glass-style"
         style={{ scale: scaleImage, opacity }}
         whileHover={{ scale: 1.03 }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
       >
         {visual}
       </motion.div>
      )}
    </div>
  );
};

const Features: FC = () => {
  return (
    <section id="features-section" className="features-container">
      {/* 1. HERO FEATURE INTRO */}
      <motion.div 
        className="feature-intro"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="intro-title">Feel the next generation.</h2>
        <p className="intro-subtitle">The DualSense wireless controller transforms how you experience games.</p>
      </motion.div>

      {/* 2. HAPTIC FEEDBACK */}
      <FeatureSection
        id="haptics"
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
            className="feature-image-asset"
          />
        }
      />

      {/* 3. ADAPTIVE TRIGGERS */}
      <FeatureSection
        id="triggers"
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
            className="feature-image-asset"
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
            className="feature-image-asset"
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
            className="feature-image-asset video-asset"
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
            className="feature-image-asset"
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
            className="feature-image-asset"
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
            src="/Whisk_58adf4930c5dd5e9adb4ee6c2e631760dr.png" 
            alt="PlayStation 5 Ecosystem" 
            className="feature-image-asset"
          />
        }
      />

      {/* 9. FINAL CTA SECTION */}
      <motion.div 
        id="buy-now"
        className="feature-cta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="cta-title">Experience a new dimension of control.</h2>
        <div className="cta-group">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-cta">Buy DualSense</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">View full specs</motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
