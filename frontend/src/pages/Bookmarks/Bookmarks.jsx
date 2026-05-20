import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';

const SavedPostSkeleton = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-4 sm:p-5 flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="w-24 h-3 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
        <div className="w-16 h-2 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
      </div>
      <Bookmark className="w-5 h-5 text-rose-500 fill-current" />
    </div>
    
    <div className="w-full aspect-[4/3] rounded-xl bg-black/5 dark:bg-white/5 animate-pulse" />
    
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-4 text-text-secondary-light dark:text-text-secondary-dark opacity-50">
        <Heart className="w-5 h-5" />
        <MessageCircle className="w-5 h-5" />
        <Share2 className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

const Bookmarks = () => {
  // Simulating loading state for now
  const hasBookmarks = true;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 pb-24 lg:pb-8 h-full overflow-y-auto hide-scrollbar">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md shrink-0">
          <Bookmark size={20} className="fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Saved Posts</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Your personal collection of favorite Flingo moments.
          </p>
        </div>
      </div>

      {!hasBookmarks ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full mt-12 flex flex-col items-center justify-center text-center p-8 glass-card border-dashed border-2 border-border-light dark:border-border-dark"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
            <Bookmark size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">No bookmarks yet</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm">
            When you see something you like, tap the bookmark icon to save it here for later.
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((item, index) => (
            <SavedPostSkeleton key={item} delay={index * 0.1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
