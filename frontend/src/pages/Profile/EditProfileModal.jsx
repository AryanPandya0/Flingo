import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin, Link as LinkIcon, User } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData || {
    name: 'Aryan Pandya',
    username: 'aryan_pandya',
    bio: '',
    location: 'Ahmedabad, India',
    website: 'portfolio.dev'
  });

  // Reset form when opened with initial data
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  };

  // Stop propagation for clicks inside the modal to prevent closing when clicking on backdrop
  const handleModalClick = (e) => e.stopPropagation();

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={handleModalClick}
            className="relative w-full max-w-xl bg-white dark:bg-[#1A2235] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] sm:h-auto sm:max-h-[85vh]"
          >
            {/* Mobile Pull Indicator */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden absolute top-0 z-30 pointer-events-none">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 pt-6 sm:pt-3 border-b border-border-light dark:border-border-dark sticky top-0 bg-white/90 dark:bg-[#1A2235]/90 backdrop-blur-md z-20">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={onClose}
                  className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X size={20} className="text-text-primary-light dark:text-text-primary-dark" />
                </button>
                <h2 className="text-[18px] sm:text-xl font-bold">Edit profile</h2>
              </div>
              <button
                onClick={handleSubmit}
                className="px-5 py-1.5 bg-text-primary-light dark:bg-text-primary-dark text-background-light dark:text-background-dark font-semibold rounded-full hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-[14px] sm:text-[15px]"
              >
                Save
              </button>
            </div>

            {/* Content Container - scrollable */}
            <div className="overflow-y-auto hide-scrollbar flex-1 pb-10">
              {/* Cover Image Section */}
              <div className="h-32 md:h-48 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center group cursor-pointer border-b border-border-light dark:border-border-dark">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="p-3 bg-black/50 rounded-full backdrop-blur-sm text-white hover:bg-black/70 transition-colors">
                       <Camera size={22} />
                    </div>
                </div>
              </div>

              {/* Avatar Section */}
              <div className="relative px-4 md:px-6 -mt-10 md:-mt-14 mb-6">
                <div className="relative inline-block group cursor-pointer z-10">
                   <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white dark:border-[#1A2235] bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center relative">
                      <User className="w-10 h-10 md:w-12 md:h-12 text-text-secondary-light dark:text-text-secondary-dark opacity-50" />
                      {/* Avatar Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Camera className="text-white/90" size={24} />
                      </div>
                   </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="px-4 md:px-6 space-y-6 max-w-full">
                
                {/* Name */}
                <div className="relative group">
                  <div className="absolute -top-2 left-3 bg-white dark:bg-[#1A2235] px-1 text-[12px] text-text-secondary-light dark:text-text-secondary-dark z-10 font-medium group-focus-within:text-primary transition-colors">
                    Name
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-border-light dark:border-border-dark rounded-xl px-4 py-3.5 pt-4 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-[15px] group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  />
                </div>

                {/* Bio */}
                <div className="relative group">
                  <div className="absolute -top-2 left-3 bg-white dark:bg-[#1A2235] px-1 text-[12px] text-text-secondary-light dark:text-text-secondary-dark z-10 font-medium group-focus-within:text-primary transition-colors">
                    Bio
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border border-border-light dark:border-border-dark rounded-xl px-4 py-3 pt-4 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-[15px] resize-none group-hover:border-gray-400 dark:group-hover:border-gray-500"
                    placeholder="Add a bio to your profile..."
                  />
                </div>

                {/* Location */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full bg-transparent border border-border-light dark:border-border-dark rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-[15px] group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  />
                </div>

                {/* Website */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                    <LinkIcon size={18} />
                  </div>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website"
                    className="w-full bg-transparent border border-border-light dark:border-border-dark rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-[15px] group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  />
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
