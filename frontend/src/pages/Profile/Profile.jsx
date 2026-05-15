import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Settings, MapPin, Link as LinkIcon, Calendar, User } from 'lucide-react';

const PROFILE_TABS = ['Posts', 'Replies', 'Media', 'Likes'];

const Profile = ({ posts = [] }) => {
  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <main className="flex-1 w-full max-w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] h-full overflow-y-auto hide-scrollbar md:border-r border-border-light dark:border-border-dark relative z-0">

      <div className="px-4 sm:px-6 py-8 pb-24 md:pb-8">

        {/* Profile Info Header */}
        <div className="relative flex justify-between items-start mb-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background-light dark:border-background-dark overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <User className="w-12 h-12 md:w-16 md:h-16 text-text-secondary-light dark:text-text-secondary-dark opacity-50" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3 mt-2">
            <button aria-label="Settings" className="p-2 rounded-full border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Settings size={20} />
            </button>
            <button className="px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[13px] md:text-[14px] font-semibold border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">Aryan Pandya</h1>
          <p className="text-[14px] md:text-[15px] text-text-secondary-light dark:text-text-secondary-dark mb-4">@aryan_pandya</p>

          <div className="flex flex-wrap items-center gap-4 text-[13px] text-text-secondary-light dark:text-text-secondary-dark mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>Ahmedabad, India</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <LinkIcon size={16} />
              <a href="#" className="hover:underline">portfolio.dev</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>Joined May 2026</span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark mb-6">
          {PROFILE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 pb-3 md:pb-4 text-[14px] md:text-[15px] font-medium transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-md",
                activeTab === tab
                  ? "text-primary"
                  : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className={posts.length > 0 ? "grid grid-cols-3 gap-1 md:gap-2" : "w-full"}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={post.id}
                className="aspect-square relative group cursor-pointer overflow-hidden bg-gray-200 dark:bg-gray-800"
              >
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <span className="text-white font-semibold text-[14px] md:text-[16px] flex items-center gap-1.5">
                    ♥ {post.likes}
                  </span>
                  <span className="text-white font-semibold text-[14px] md:text-[16px] flex items-center gap-1.5">
                    💬 {post.comments}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border-light dark:border-border-dark flex items-center justify-center mb-4">
                <Settings className="text-text-secondary-light dark:text-text-secondary-dark opacity-50" size={24} />
              </div>
              <h3 className="text-[18px] font-semibold mb-2">No Posts Yet</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-[14px] max-w-[250px]">
                When you share photos or thoughts, they will appear on your profile.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default Profile;
