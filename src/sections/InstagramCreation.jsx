import React, { useState } from 'react';
import { motion } from 'framer-motion';

const STATIC_VIDEOS = [
  {
    id: 1,
    title: "AWS EC2 Core Concepts - Day 1",
    src: "/videos/Day-1_EC2.mp4",
  },
  {
    id: 2,
    title: "AWS EC2 Deployment - Day 1",
    src: "/videos/Day-2.mp4",
  },
  {
    id: 3,
    title: "AWS EC2 Scaling - Day 1",
    src: "/videos/Day-3.mp4",
  },
  {
    id: 4,
    title: "AWS EC2 Pricing Models - Day 1",
    src: "/videos/Day-4.mp4",
  },
  {
    id: 5,
    title: "AWS EC2 Security Groups - Day 1",
    src: "/videos/Day-5.mp4",
  }
];

export default function InstagramCreation({ dbVideos }) {
  const instagramVideos = dbVideos && dbVideos.length > 0
    ? dbVideos.map((v, i) => ({ id: v.id || i, title: v.title, src: v.video_url }))
    : STATIC_VIDEOS;

  const videoCount = instagramVideos.length;

  // Manage muted states for all 2 * N cards in the marquee (N original + N copies)
  const [mutedStates, setMutedStates] = useState(() => new Array(2 * videoCount).fill(true));
  
  // Double the array to make the infinite loop scroll seamlessly
  const marqueeVideos = [...instagramVideos, ...instagramVideos];

  const handleToggleMute = (e, index) => {
    e.stopPropagation();
    
    // Synchronize both copies of the video in the marquee to avoid sound popping when scrolling snaps
    const originalIndex = index % videoCount;
    const siblingIndex = originalIndex === index ? index + videoCount : originalIndex;
    
    const nextMutedStates = [...mutedStates];
    const targetMuted = !mutedStates[index];
    
    nextMutedStates[index] = targetMuted;
    nextMutedStates[siblingIndex] = targetMuted;
    
    setMutedStates(nextMutedStates);
    
    // Mute/Unmute the exact video elements directly in the DOM
    const videos = document.querySelectorAll('#instagram-creation video');
    if (videos[index]) {
      videos[index].muted = targetMuted;
    }
    if (videos[siblingIndex]) {
      videos[siblingIndex].muted = targetMuted;
    }
  };

  return (
    <section id="instagram-creation" className="relative overflow-hidden border-t border-slate-200/30 dark:border-slate-800/30 bg-slate-50/20 dark:bg-slate-950/20 py-12 md:py-16">
      
      {/* CSS Styles for Left to Right Infinite Marquee */}
      <style>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 40s linear infinite;
        }
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10 space-y-10 md:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3.5 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 rounded-full font-bold text-xs uppercase tracking-widest"
          >
            Instagram Creation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Bite-Sized Cloud Learning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-slate-655 dark:text-slate-455 leading-relaxed"
          >
            Explore educational cloud architecture content and quick walkthroughs designed for social media.
          </motion.p>
        </div>

        {/* Infinite Loop Slider Container */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Left/Right Glass Fading Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row */}
          <div className="animate-marquee-ltr flex gap-6">
            {marqueeVideos.map((video, index) => {
              const isCardMuted = mutedStates[index];
              return (
                <div
                  key={`${video.id}-${index}`}
                  className="w-[260px] sm:w-[300px] shrink-0 snap-center relative aspect-[9/16] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/40 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  {/* HTML5 Native Video Tag - Muted Independently */}
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isCardMuted}
                    playsInline
                    controls={false}
                  />

                  {/* Floating Speaker/Mute Button (Instagram Style) */}
                  <button
                    onClick={(e) => handleToggleMute(e, index)}
                    className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer shadow-md"
                    aria-label={isCardMuted ? "Unmute video" : "Mute video"}
                  >
                    {isCardMuted ? (
                      /* Muted Icon */
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      /* Unmuted Icon */
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </button>

                  {/* Hover Video Info Strip */}
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white text-sm font-bold truncate pr-12 w-full">
                      {video.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Instagram Explore CTA */}
        <div className="text-center pt-4">
          <a
            href="https://www.instagram.com/nepalcodeharbor"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-pink-500/20 transition-all hover:scale-102 active:scale-98 shadow-md cursor-pointer text-sm"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Explore nepalcodeharbor
          </a>
        </div>
      </div>
    </section>
  );
}
