import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  {
    id: 1,
    title: "Golden Dunes",
    location: "Morocco, Draa-Tafilalet, Merzouga",
    description: "Endless golden sand dunes offering unforgettable desert sunsets and camel tours. A unique cultural and natural experience.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "2700 M" },
      { label: "Temp", value: "37°F" },
      { label: "Rating", value: "4.72" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥1320",
    icon: "🐪"
  },
  {
    id: 2,
    title: "Crystal Bay",
    location: "Maldives, South Malé, Private Island",
    description: "A tropical paradise with turquoise waters, white sand beaches, and luxury overwater villas. Pure relaxation and ocean beauty.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "1580 M" },
      { label: "Temp", value: "29°F" },
      { label: "Rating", value: "5" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥3120",
    icon: "🏝️"
  },
  {
    id: 3,
    title: "Sunset Cliffs",
    location: "USA, California, Big Sur",
    description: "Dramatic ocean cliffs with panoramic views and iconic coastal roads. A dream destination for road trips.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "7500 M" },
      { label: "Temp", value: "18°F" },
      { label: "Rating", value: "4.95" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥1670",
    icon: "🌅"
  },
  {
    id: 4,
    title: "Emerald Highlands",
    location: "Scotland, Highlands, Glencoe",
    description: "Rolling green hills, ancient castles, and misty landscapes full of history and legends. Perfect for calm and inspiring journeys.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "2270 M" },
      { label: "Temp", value: "14°F" },
      { label: "Rating", value: "4.98" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥2150",
    icon: "⛰️"
  },
  {
    id: 5,
    title: "Azure Coast",
    location: "France, Alpes-Côte d'Azur, Nice",
    description: "Stunning Mediterranean coastline with crystal-clear waters and charming seaside towns. Perfect for relaxing vacations and scenic walks.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "1762 M" },
      { label: "Temp", value: "22°F" },
      { label: "Rating", value: "4.9" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥1195",
    icon: "🏖️"
  },
  {
    id: 6,
    title: "Skybridge",
    location: "Singapore, Marina Bay",
    description: "A futuristic architectural marvel with lush gardens, stunning city skylines, and world-class attractions. Ideal for city exploration.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "Distance", value: "4160 M" },
      { label: "Temp", value: "21°F" },
      { label: "Rating", value: "4.88" }
    ],
    priceLabel: "Total Price",
    priceValue: "¥2130",
    icon: "🏙️"
  }
];

export default function About() {
  const [currentStep, setCurrentStep] = useState(1); // Default to Crystal Bay (index 1) for center focus initial state
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % stages.length);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + stages.length) % stages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextStep, 7000);
    return () => clearInterval(timer);
  }, [nextStep, isPaused]);

  const handleCardClick = (index) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  const getCardStyle = (index) => {
    const offset = index - currentStep;
    const absOffset = Math.abs(offset);
    const zIndex = 10 - absOffset;
    
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    
    let x = 0;
    let scale = 1;
    let opacity = 1;
    
    if (isMobile) {
      x = offset * 135;
      scale = 1 - absOffset * 0.12;
      opacity = absOffset > 1 ? 0 : 1 - absOffset * 0.3;
    } else if (isTablet) {
      x = offset * 200;
      scale = 1 - absOffset * 0.08;
      opacity = absOffset > 2 ? 0 : 1;
    } else {
      // Desktop
      x = offset * 255;
      scale = 1 - absOffset * 0.08;
      opacity = absOffset > 2 ? 0 : 1;
    }
    
    return {
      x: `${x}px`,
      scale,
      zIndex,
      opacity,
      pointerEvents: 'auto'
    };
  };

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My <span className="text-blue-600">Journey</span>
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A continuous pipeline of learning, certification, and professional growth in the cloud ecosystem.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto py-12 flex flex-col items-center overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card Slider Track */}
          <motion.div
            className="relative w-full h-[540px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) {
                nextStep();
              } else if (info.offset.x > threshold) {
                prevStep();
              }
            }}
          >
            <AnimatePresence initial={false}>
              {stages.map((stage, index) => {
                const isActive = index === currentStep;
                const style = getCardStyle(index);

                // Skip rendering out-of-bounds cards to optimize DOM overhead
                const absOffset = Math.abs(index - currentStep);
                if (absOffset > 2 && windowWidth >= 640) return null;
                if (absOffset > 1 && windowWidth < 640) return null;

                return (
                  <motion.div
                    key={stage.id}
                    className="absolute w-[290px] sm:w-[320px] bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 dark:shadow-none select-none flex flex-col justify-between overflow-hidden"
                    style={{
                      height: '500px',
                      transformOrigin: 'center center',
                    }}
                    animate={style}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Dark overlay & blur filter for inactive cards to match screenshot exactly */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[0.5px] rounded-[2.5rem] z-20 transition-all duration-300 pointer-events-none" />
                    )}

                    {/* Edge-to-Edge Image at top with curved bottom */}
                    <div className="relative w-full h-[210px] overflow-hidden shrink-0">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover pointer-events-none rounded-b-[2.5rem]"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="px-6 pb-6 pt-3 flex-1 flex flex-col justify-between relative z-10">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                          {stage.title}
                        </h3>
                        
                        {/* Location */}
                        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-900 dark:text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          <span className="truncate">{stage.location}</span>
                        </p>

                        {/* Description Label */}
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-4 mb-1 block">
                          Description
                        </span>
                        
                        {/* Description Text */}
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[3.3rem]">
                          {stage.description}
                        </p>
                      </div>

                      <div>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {stage.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="flex flex-col">
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                                {stat.label}
                              </span>
                              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 truncate">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Row Divider */}
                        <div className="border-t border-slate-100 dark:border-slate-800/80 my-3" />

                        {/* Bottom Action Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                              {stage.priceLabel}
                            </span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                              {stage.priceValue}
                            </span>
                          </div>
                          
                          {/* Circular Airplane Button */}
                          <button
                            className="w-10 h-10 rounded-full bg-slate-950 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                            aria-label="Travel action"
                          >
                            <svg className="w-5 h-5 fill-current transform rotate-45" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Controls: Pagination Arrows and Dots */}
          <div className="mt-8 flex items-center justify-center gap-6 relative z-30">
            {/* Prev Button */}
            <button
              onClick={prevStep}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all active:scale-90 bg-white dark:bg-slate-900 shadow-sm cursor-pointer"
              aria-label="Previous step"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === currentStep ? 'w-8 bg-blue-600' : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextStep}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all active:scale-90 bg-white dark:bg-slate-900 shadow-sm cursor-pointer"
              aria-label="Next step"
            >
              →
            </button>
          </div>

          {/* Autoplay Status Indicator */}
          <div className="text-center mt-6 relative z-30">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              {isPaused ? (
                <><span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" /> Paused (Hovering)</>
              ) : (
                <><span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /> Auto-playing Journey</>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
