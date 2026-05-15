import React from 'react';
import LeftSidebar from '../../components/layout/LeftSidebar';
import RightSidebar from '../../components/layout/RightSidebar';
import BottomNavigation from '../../components/layout/BottomNavigation';
import Feed from '../../components/home/Feed';

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full flex justify-center h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Left Sidebar - Hidden on mobile, Icons on tablet, Full on desktop */}
      <div className="hidden md:block w-[80px] xl:w-[280px] h-full flex-shrink-0 transition-all duration-300 z-10">
        <LeftSidebar />
      </div>

      {/* Main Feed - Scrollable */}
      <main className="flex-1 w-full max-w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] h-full overflow-y-auto hide-scrollbar md:border-x border-border-light dark:border-border-dark relative z-0">
        <Feed />
      </main>

      {/* Right Sidebar - Hidden on mobile and tablet, Full on desktop */}
      <div className="hidden lg:block w-[300px] xl:w-[320px] h-full flex-shrink-0 transition-all duration-300 z-10">
        <RightSidebar />
      </div>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation />
    </div>
  );
};

export default Home;
