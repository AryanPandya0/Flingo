import React, { useState } from 'react';
import { Image, Video, Smile, Globe, MoreHorizontal, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { cn } from '../../utils/cn';
import StoriesSection from '../stories/StoriesSection';

const TABS = ['Recent', 'Friends', 'Trending'];

const CreatePost = () => {
  return (
    <div className="bg-white dark:bg-[#1A2235] p-4 md:p-5 rounded-[24px] shadow-soft border border-border-light dark:border-border-dark mb-6 md:mb-8 transition-colors">
      <div className="flex gap-3 md:gap-4 mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0 overflow-hidden">
           {/* Placeholder for user avatar */}
        </div>
        <textarea 
          aria-label="Write a new post"
          placeholder="What's happening?"
          className="w-full bg-transparent resize-none outline-none text-[15px] md:text-[16px] text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark pt-2 md:pt-3 min-h-[60px]"
        />
      </div>
      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border-light dark:border-border-dark">
        <div className="flex items-center gap-1 md:gap-2 text-primary">
          <button aria-label="Upload Image" className="p-2 rounded-full hover:bg-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none">
            <Image size={20} className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button aria-label="Upload Video" className="p-2 rounded-full hover:bg-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none hidden sm:block">
            <Video size={20} className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button aria-label="Add Emoji" className="p-2 rounded-full hover:bg-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none">
            <Smile size={20} className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button aria-label="Select Audience" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none">
            <Globe size={16} />
            Public
          </button>
          <button className="px-5 py-2 md:px-6 rounded-full text-white font-medium text-[13px] md:text-[14px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md focus-visible:ring-2 focus-visible:ring-primary outline-none">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  return (
    <article className="bg-white dark:bg-[#1A2235] p-4 md:p-5 rounded-[24px] shadow-soft border border-border-light dark:border-border-dark mb-4 md:mb-6 transition-transform hover:shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-[14px] md:text-[15px] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              {post.author?.name || 'Unknown User'}
            </h3>
            <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-[13px] text-text-secondary-light dark:text-text-secondary-dark">
              <span>{post.author?.username || '@user'}</span>
              <span>•</span>
              <time>{post.timeAgo || 'Just now'}</time>
            </div>
          </div>
        </div>
        <button aria-label="More options" className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <p className="text-[14px] md:text-[15px] leading-relaxed mb-3 md:mb-4 whitespace-pre-wrap">{post.content}</p>
      
      {/* Media */}
      {post.image && (
        <div className="rounded-[16px] overflow-hidden mb-3 md:mb-4 border border-border-light dark:border-border-dark">
          <img src={post.image} alt="Post media" className="w-full h-auto object-cover max-h-[400px] md:max-h-[500px]" loading="lazy" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 md:pt-2">
        <div className="flex items-center gap-2 md:gap-6">
          <button 
            aria-label={post.isLiked ? "Unlike post" : "Like post"}
            className={cn("flex items-center gap-1.5 md:gap-2 group transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-full", post.isLiked ? "text-red-500" : "text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500")}
          >
            <div className="p-1.5 md:p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
              <Heart size={20} className={cn("w-5 h-5", post.isLiked && "fill-current")} />
            </div>
            <span className="text-[13px] md:text-[14px] font-medium">{post.stats?.likes || 0}</span>
          </button>
          
          <button aria-label="Comment" className="flex items-center gap-1.5 md:gap-2 group text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-full">
            <div className="p-1.5 md:p-2 rounded-full group-hover:bg-primary/10 transition-colors">
              <MessageCircle size={20} className="w-5 h-5" />
            </div>
            <span className="text-[13px] md:text-[14px] font-medium">{post.stats?.comments || 0}</span>
          </button>
          
          <button aria-label="Share" className="flex items-center gap-1.5 md:gap-2 group text-text-secondary-light dark:text-text-secondary-dark hover:text-green-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-full">
            <div className="p-1.5 md:p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
              <Share2 size={20} className="w-5 h-5" />
            </div>
          </button>
        </div>
        
        <button aria-label="Bookmark" className="group text-text-secondary-light dark:text-text-secondary-dark hover:text-yellow-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-full">
          <div className="p-1.5 md:p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
            <Bookmark size={20} className="w-5 h-5" />
          </div>
        </button>
      </div>
    </article>
  );
};

const Feed = ({ posts = [], stories = [] }) => {
  const [activeTab, setActiveTab] = useState('Recent');

  return (
    <div className="h-full flex flex-col pt-4 md:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      
      {/* Stories - Visible on Mobile inline with Feed */}
      <div className="md:hidden">
        <StoriesSection stories={stories} />
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-6 md:gap-8 border-b border-border-light dark:border-border-dark mb-6 md:mb-8 overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 md:pb-4 text-[14px] md:text-[15px] font-medium transition-colors relative whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-t-md",
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

      <CreatePost />

      <div className="pb-24 md:pb-20">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-text-secondary-light dark:text-text-secondary-dark" />
            </div>
            <h3 className="text-[18px] font-semibold mb-2">No posts yet</h3>
            <p className="text-[14px] text-text-secondary-light dark:text-text-secondary-dark max-w-[250px]">
              Be the first to share your thoughts, images, or videos with your network.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
