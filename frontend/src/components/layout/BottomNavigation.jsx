import React, { useState } from 'react';
import { Home, Compass, MessageSquare, Bell, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { icon: Home, id: 'home' },
  { icon: Compass, id: 'explore' },
  { icon: MessageSquare, id: 'messages' },
  { icon: Bell, id: 'notifications' },
  { icon: User, id: 'profile' },
];

const BottomNavigation = () => {
  const [active, setActive] = useState('home');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1A2235]/80 backdrop-blur-md border-t border-border-light dark:border-border-dark px-6 py-3 z-50 pb-safe">
      <div className="flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative p-2 rounded-full outline-none flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "p-2 rounded-full transition-colors duration-200",
                isActive ? "bg-primary/10 text-primary" : "text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary group-hover:bg-primary/5"
              )}>
                <Icon size={24} className={cn(
                  "transition-transform duration-200",
                  !isActive && "group-hover:scale-110",
                  isActive && "fill-current"
                )} />
              </div>
              {isActive && (
                <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
