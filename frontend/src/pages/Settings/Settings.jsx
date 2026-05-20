import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Bell, Palette, HelpCircle, ChevronRight, Moon, Sun, ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

const SETTINGS_TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'privacy', label: 'Privacy & Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'display', label: 'Display', icon: Palette },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Profile Information</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">Update your display name and bio.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Display Name</label>
                  <input type="text" defaultValue="Aryan Pandya" className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-[15px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Username</label>
                  <input type="text" defaultValue="@aryan_pandya" className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-[15px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Bio</label>
                  <textarea rows={3} placeholder="Write something about yourself..." className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all resize-none text-[15px]"></textarea>
                </div>
                <button className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border-light dark:border-border-dark">
              <h3 className="text-lg font-semibold text-red-500 mb-1">Danger Zone</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">Permanently delete or deactivate your account.</p>
              <button className="px-6 py-2.5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium rounded-xl transition-colors">
                Deactivate Account
              </button>
            </div>
          </div>
        );
      
      case 'display':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Appearance</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-6">Customize how Flingo looks on your device.</p>
              
              <div className="flex items-center justify-between p-4 glass-card hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={toggleTheme}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">Easier on the eyes in low light.</p>
                  </div>
                </div>
                
                {/* Custom Toggle Switch */}
                <div 
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative pointer-events-none",
                    theme === 'dark' ? "bg-rose-500" : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  <motion.div 
                    layout
                    initial={false}
                    animate={{ x: theme === 'dark' ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
      case 'notifications':
      case 'help':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-xs">
              This settings panel is currently under development.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Left Pane - Sidebar Menu */}
      <div className={cn(
        "w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col border-r border-border-light dark:border-border-dark bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm",
        !isMobileMenuOpen ? "hidden lg:flex" : "flex"
      )}>
        <div className="p-4 sm:p-6 border-b border-border-light dark:border-border-dark">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 hide-scrollbar">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors",
                  isActive 
                    ? "bg-rose-500/10 text-rose-500 font-medium" 
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-text-primary-light dark:text-text-primary-dark"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? "text-rose-500" : "text-text-secondary-light dark:text-text-secondary-dark"} />
                  <span className="text-[15px]">{tab.label}</span>
                </div>
                <ChevronRight size={18} className={isActive ? "opacity-100" : "opacity-0"} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane - Settings Content */}
      <div className={cn(
        "flex-1 flex flex-col bg-background-light dark:bg-background-dark relative",
        isMobileMenuOpen ? "hidden lg:flex" : "flex"
      )}>
        <div className="h-16 sm:h-20 border-b border-border-light dark:border-border-dark flex items-center px-4 sm:px-6 shrink-0 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
          <button 
            className="lg:hidden p-2 -ml-2 mr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">
            {SETTINGS_TABS.find(t => t.id === activeTab)?.label}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24 lg:pb-8 hide-scrollbar">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
