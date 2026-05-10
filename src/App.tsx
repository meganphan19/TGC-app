/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, Menu, RefreshCw } from 'lucide-react';
import { useTgcStore } from './store';
import Navigation, { Tab } from './components/Navigation';
import Passport from './components/Passport';
import Missions from './components/Missions';
import Guide from './components/Guide';
import Store from './components/Store';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('passport');
  const [isSyncing, setIsSyncing] = useState(false);
  const { user, missions, products, completeMission } = useTgcStore();

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="min-h-screen pb-32 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-xl flex justify-between items-center p-6 sticky top-0 z-40 bg-tgc-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-tgc-pink rounded-lg flex items-center justify-center font-display font-black text-white text-xs tracking-tighter">
            TGC
          </div>
          <span className="font-display text-[10px] uppercase font-bold tracking-[0.4em] mt-1">Vietnam 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={handleSync}
            animate={isSyncing ? { rotate: 360 } : {}}
            transition={isSyncing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
            className="p-2 glass-panel rounded-full hover:bg-tgc-grey transition-colors relative"
          >
            <RefreshCw size={18} className={isSyncing ? 'text-tgc-pink' : 'text-tgc-silver'} />
            {isSyncing && (
               <motion.span 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono whitespace-nowrap text-tgc-pink"
               >
                 SYNCING...
               </motion.span>
            )}
          </motion.button>
          <button className="p-2 glass-panel rounded-full hover:bg-tgc-grey transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-xl flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full"
          >
            {activeTab === 'passport' && (
              <section className="space-y-6">
                <div className="px-6 space-y-1">
                  <h1 className="font-accent italic text-4xl text-white">Bonjour, {user.name.split(' ')[0]}</h1>
                  <p className="text-xs uppercase tracking-[0.3em] opacity-40 font-display">Welcome to Tokyo Girls Collection</p>
                </div>
                <Passport user={user} />
              </section>
            )}

            {activeTab === 'missions' && (
              <section className="space-y-2">
                <div className="px-6 space-y-1">
                  <h1 className="font-display text-2xl font-black uppercase tracking-tight">Mission Engine</h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-tgc-pink font-bold">Earn points • Unlock Rewards</p>
                </div>
                <Missions missions={missions} onComplete={completeMission} />
              </section>
            )}

            {activeTab === 'guide' && (
              <section className="space-y-2">
                <div className="px-6 space-y-1">
                  <h1 className="font-display text-2xl font-black uppercase tracking-tight">Smart Guide</h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">GPS Live Interactive Map</p>
                </div>
                <div className="px-4">
                  <Guide />
                </div>
              </section>
            )}

            {activeTab === 'store' && (
              <section className="space-y-2">
                <div className="px-6 space-y-1">
                  <h1 className="font-display text-2xl font-black uppercase tracking-tight">O2O Store</h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">Runway to Wardrobe</p>
                </div>
                <Store products={products} />
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

