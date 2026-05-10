import React from 'react';
import { motion } from 'motion/react';
import { User, Target, Map as MapIcon, ShoppingBag } from 'lucide-react';

export type Tab = 'passport' | 'missions' | 'guide' | 'store';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'passport', label: 'Passport', icon: User },
    { id: 'missions', label: 'Missions', icon: Target },
    { id: 'guide', label: 'Guide', icon: MapIcon },
    { id: 'store', label: 'Explore', icon: ShoppingBag },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="bg-tgc-grey/80 backdrop-blur-3xl border border-tgc-silver/20 rounded-full h-16 flex items-center justify-around px-2 shadow-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-14 h-14 group"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-tgc-pink/10 rounded-full border-t border-tgc-pink/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                size={20} 
                className={`transition-colors duration-300 ${isActive ? 'text-tgc-pink' : 'text-tgc-silver opacity-40 group-hover:opacity-100'}`} 
              />
              <span className={`text-[9px] uppercase font-display tracking-widest mt-1 ${isActive ? 'text-tgc-pink opacity-100' : 'opacity-0'} transition-opacity`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
