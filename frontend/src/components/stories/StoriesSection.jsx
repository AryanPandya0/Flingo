import React from 'react';

const StoriesSection = ({ stories = [] }) => {
  return (
    <div className="mb-6 shrink-0 w-full overflow-hidden">
      <h3 className="font-semibold text-[16px] mb-4 px-2 hidden md:block">Stories</h3>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-2 snap-x snap-mandatory">
        {/* Add Story Button */}
        <button 
          aria-label="Add Story"
          className="flex flex-col items-center gap-2 cursor-pointer group min-w-[72px] outline-none snap-start focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-primary transition-colors bg-white dark:bg-[#1A2235]">
            <span className="text-2xl text-primary font-light">+</span>
          </div>
          <span className="text-[12px] font-medium text-text-primary-light dark:text-text-primary-dark">Add Story</span>
        </button>
        
        {stories.map((story) => (
          <button 
            key={story.id} 
            aria-label={`View ${story.author?.name || 'User'}'s story`}
            className="flex flex-col items-center gap-2 cursor-pointer group min-w-[72px] outline-none snap-start focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
          >
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-primary via-secondary to-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full border-[3px] border-background-light dark:border-background-dark overflow-hidden bg-white dark:bg-[#1A2235]">
                {story.author?.avatar ? (
                  <img src={story.author.avatar} alt={story.author.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
              </div>
            </div>
            <span className="text-[12px] font-medium text-text-secondary-light dark:text-text-secondary-dark truncate w-[72px] text-center">
              {story.author?.name ? story.author.name.split(' ')[0] : 'User'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
