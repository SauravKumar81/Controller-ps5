import { useCallback, useEffect, useState, useRef } from 'react';
import type { FC } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const GAMES = [
  {
    title: "Marvel's Spider-Man 2",
    category: "Action Adventure",
    features: ["Adaptive Triggers", "Haptic Feedback"],
    image: "/ps5-game-carousel-spider-man-3-15jan24.webp"
  },
  {
    title: "God of War Ragnarök",
    category: "Action Adventure",
    features: ["Haptic Feedback", "Adaptive Triggers"],
    image: "/god-of-war-raganok-clean-keyart-01-en-10mar22.webp"
  },
  {
    title: "Astro Bot",
    category: "Platformer",
    features: ["Haptic Feedback", "Adaptive Triggers", "Motion Control"],
    image: "/astro-bot-keyart-no-logo-01-en-7jun24.webp"
  },
  {
    title: "Gran Turismo 7",
    category: "Racing Simulation",
    features: ["Haptic Feedback", "Adaptive Triggers"],
    image: "/Gran.webp"
  },
  {
    title: "Stellar Blade",
    category: "Action RPG",
    features: ["Haptic Feedback", "Adaptive Triggers"],
    image: "/strllar Blade.webp"
  },
  {
    title: "Until Dawn",
    category: "Horror",
    features: ["Haptic Feedback", "Motion Control"],
    image: "/until Dawn.webp"
  },
  {
    title: "Days Gone Remastered",
    category: "Action Adventure",
    features: ["Haptic Feedback", "Adaptive Triggers"],
    image: "/Days-Gone-Remastered-hero-mobile-01-en-07feb25.webp"
  },
  {
    title: "Ratchet & Clank: Rift Apart",
    category: "Action Platformer",
    features: ["Adaptive Triggers", "Haptic Feedback"],
    image: "/ps5-games-ratchet-and-clank-rift-apart-image-block-en-26aug22.webp"
  }
];

const GameCarousel: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="games-section" ref={sectionRef} className="carousel-section reveal-up">
      <div className="carousel-header">
        <h2 className="carousel-title">Supported Games</h2>
        <p className="carousel-subtitle">Experience next-level immersion in your favorite titles.</p>
      </div>

      <div className="carousel-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {GAMES.map((game, index) => (
              <div 
                className={`embla__slide ${index === selectedIndex ? 'is-active' : ''}`}
                key={index}
              >
                <div className="game-card">
                  <div className="game-image-wrapper">
                    <img src={game.image} alt={game.title} className="game-image" />
                    <div className="game-overlay"></div>
                  </div>
                  
                  <div className="game-info">
                    <span className="game-category">{game.category}</span>
                    <h3 className="game-title">{game.title}</h3>
                    <ul className="game-features">
                      {game.features.map((feature, i) => (
                        <li key={i}><span className="feature-dot"></span>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="carousel-controls">
        <button className="carousel-btn prev-btn" onClick={scrollPrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="carousel-dots">
          {GAMES.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === selectedIndex ? 'is-active' : ''}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="carousel-btn next-btn" onClick={scrollNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default GameCarousel;
