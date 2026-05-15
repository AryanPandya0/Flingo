import React, { useState } from 'react';
import { Search, TrendingUp, Filter } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const TRENDING_CATEGORIES = [
  'All', 'Design', 'Photography', 'Technology', 'Travel', 'Art', 'Nature', 'Fashion', 'Architecture'
];

const SKELETON_HEIGHTS = [
  'h-[220px]', 'h-[320px]', 'h-[250px]', 'h-[280px]', 
  'h-[180px]', 'h-[350px]', 'h-[240px]', 'h-[300px]'
];

const Explore = ({ pins = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <main className="flex-1 w-full h-full overflow-y-auto hide-scrollbar relative z-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Explore</h1>

          {/* Search Bar */}
          <div className="flex items-center gap-3 w-full max-w-2xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for ideas, tags, or people..."
                className="w-full bg-white dark:bg-[#1A2235] text-text-primary-light dark:text-text-primary-dark rounded-full py-3 md:py-4 pl-12 pr-4 outline-none border border-border-light dark:border-border-dark focus:border-primary dark:focus:border-primary transition-colors text-[15px] shadow-soft placeholder:text-text-secondary-light/70 focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>
            <button aria-label="Filter" className="p-3 md:p-4 rounded-full bg-white dark:bg-[#1A2235] border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Filter size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
            </button>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="mb-8 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="font-semibold text-[16px]">Trending Now</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {TRENDING_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2 rounded-full text-[14px] font-medium whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-none",
                    isActive
                      ? "bg-text-primary-light dark:bg-text-primary-dark text-background-light dark:text-background-dark"
                      : "bg-white dark:bg-[#1A2235] text-text-secondary-light dark:text-text-secondary-dark border border-border-light dark:border-border-dark hover:border-primary/50"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {pins.length > 0 ? (
            pins.map((pin) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={pin.id}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[20px]"
              >
                <img
                  src={pin.image}
                  alt={pin.title}
                  className="w-full h-auto object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-[20px]">
                  <h3 className="text-white font-semibold text-[15px] leading-tight mb-1">{pin.title}</h3>
                  <p className="text-white/80 text-[12px]">{pin.author}</p>
                </div>
              </motion.div>
            ))
          ) : (
            SKELETON_HEIGHTS.map((height, index) => (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={`skeleton-${index}`}
                className={cn(
                  "w-full rounded-[20px] bg-black/5 dark:bg-white/5 animate-pulse break-inside-avoid",
                  height
                )}
              />
            ))
          )}
        </div>

      </div>
    </main>
  );
};

export default Explore;
