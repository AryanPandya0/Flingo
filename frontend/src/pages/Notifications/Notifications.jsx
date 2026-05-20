import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { cn } from '../../utils/cn';

const NotificationSkeleton = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    className="glass-card p-4 flex gap-4 relative overflow-hidden"
  >
    <div className="relative shrink-0 mt-1">
      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
      <div className="w-3/4 h-3.5 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
      <div className="w-1/4 h-3 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
    </div>
  </motion.div>
);

const Notifications = () => {
  const isLoading = true; // Simulating loading state without mock data
  const hasNotifications = false;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 pb-24 lg:pb-8 h-full overflow-y-auto hide-scrollbar">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white shadow-md shrink-0">
            <Bell size={20} className="fill-current" />
          </div>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <button className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          [1, 2, 3, 4].map((item, index) => (
            <NotificationSkeleton key={item} delay={index * 0.05} />
          ))
        ) : !hasNotifications ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full mt-12 flex flex-col items-center justify-center text-center p-8 glass-card border-dashed border-2 border-border-light dark:border-border-dark"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <Bell size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">No notifications yet</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm">
              When someone interacts with your posts or follows you, you'll see it here.
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default Notifications;
