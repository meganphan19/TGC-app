import React from 'react';
import { motion } from 'motion/react';
import { QrCode, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { UserProfile, Tier } from '../types';

interface PassportProps {
  user: UserProfile;
}

const TIER_CONFIG: Record<Tier, { color: string; icon: any }> = {
  Fan: { color: '#94A3B8', icon: ShieldCheck },
  Expert: { color: '#38BDF8', icon: Sparkles },
  Icon: { color: '#A855F7', icon: Trophy },
  Muse: { color: '#FF007A', icon: Sparkles },
};

export default function Passport({ user }: PassportProps) {
  const { color, icon: Icon } = TIER_CONFIG[user.tier];

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel p-8 flex flex-col items-center justify-between shadow-2xl"
      >
        {/* Background Accent */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20"
          style={{ backgroundColor: color }}
        />

        {/* Header */}
        <div className="w-full flex justify-between items-start">
          <div>
            <h2 className="font-display text-xs uppercase tracking-widest text-tgc-silver/60">Digital Passport</h2>
            <p className="font-display text-xl font-bold tracking-tight mt-1">2026 TGC VIETNAM</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full flex items-center justify-center border border-tgc-silver/20"
          >
            <Icon size={24} style={{ color }} />
          </motion.div>
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-inner shadow-black/20">
            <QrCode size={160} color="#080808" />
          </div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">{user.id}</p>
        </div>

        {/* Footer */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-display text-xs uppercase tracking-wider opacity-40">Identity</p>
              <p className="font-display text-lg font-medium">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-xs uppercase tracking-wider opacity-40">Status</p>
              <p className="font-display text-lg font-bold" style={{ color }}>{user.tier}</p>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-tgc-silver/10" />
          
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
            <span>Points: {user.points}</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-sm grid grid-cols-4 gap-2">
        {['Fan', 'Expert', 'Icon', 'Muse'].map((t) => (
          <div 
            key={t}
            className={`flex flex-col items-center gap-2 p-2 rounded-xl text-[10px] uppercase font-display tracking-tighter ${user.tier === t ? 'bg-tgc-silver text-tgc-black font-bold' : 'opacity-40 text-tgc-silver'}`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
