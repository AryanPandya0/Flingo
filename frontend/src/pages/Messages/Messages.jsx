import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit, MoreVertical, Send, Phone, Video, ArrowLeft, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const ChatSkeleton = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
    className="p-3 rounded-2xl flex items-center gap-3 mb-1"
  >
    <div className="relative shrink-0">
      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
    </div>
    <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center py-1">
      <div className="w-1/2 h-3.5 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
      <div className="w-3/4 h-3 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
    </div>
  </motion.div>
);

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const isLoading = true; // Simulating loading state
  const hasChats = false;

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Pane - Chat List */}
      <div className={cn(
        "w-full lg:w-[380px] flex-shrink-0 flex flex-col border-r border-border-light dark:border-border-dark bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm",
        activeChat !== null ? "hidden lg:flex" : "flex"
      )}>
        <div className="p-4 sm:p-6 border-b border-border-light dark:border-border-dark flex items-center justify-between">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center hover:bg-rose-500/20 transition-colors">
            <Edit size={20} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-black/5 dark:bg-white/5 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-[15px]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-2 sm:p-4">
          {isLoading ? (
            [1, 2, 3, 4, 5].map((item, index) => (
              <ChatSkeleton key={item} delay={index * 0.05} />
            ))
          ) : !hasChats ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark mb-3">
                <MessageCircle size={24} />
              </div>
              <p className="text-sm font-medium">No messages found</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Right Pane - Active Chat */}
      <div className={cn(
        "flex-1 flex flex-col bg-background-light dark:bg-background-dark relative",
        activeChat === null ? "hidden lg:flex" : "flex"
      )}>
        {activeChat ? (
          <>
            <div className="h-20 border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 sm:px-6 shrink-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <button 
                  className="lg:hidden p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark"
                  onClick={() => setActiveChat(null)}
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 shrink-0" />
                <div>
                  <h2 className="font-semibold leading-tight">Chat User</h2>
                  <p className="text-xs text-green-500 font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-rose-500 transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-rose-500 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark transition-colors hidden sm:block">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col">
               <div className="mt-auto flex flex-col gap-4 pb-20 lg:pb-0">
                 {/* Empty for now as mock data is removed */}
               </div>
            </div>

            <div className="p-4 sm:p-6 pb-24 lg:pb-6 border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark absolute bottom-0 left-0 right-0 lg:static">
              <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-full p-2 pl-4">
                <input 
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-[15px]"
                />
                <button className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 hover:bg-rose-600 transition-colors shadow-sm">
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 h-full">
            <div className="w-24 h-24 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
              <MessageCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm">
              Select a conversation from the sidebar or start a new chat to connect with your flock.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
