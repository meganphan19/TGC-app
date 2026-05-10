import React from 'react';
import { motion } from 'motion/react';
import { QrCode, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { UserProfile, Tier } from '../types';

interface PassportProps {
  user: UserProfile;
}

const TIER_CONFIG: Record<Tier, { color: string; icon: any; gradient: string }> = {
  'New-Gen': { color: '#94A3B8', icon: ShieldCheck, gradient: 'from-slate-500/20 to-slate-800/20' },
  'Trendsetter': { color: '#38BDF8', icon: Sparkles, gradient: 'from-sky-500/20 to-sky-800/20' },
  'Icon': { color: '#A855F7', icon: Trophy, gradient: 'from-purple-500/20 to-purple-800/20' },
  'Muse': { color: '#FF007A', icon: Sparkles, gradient: 'from-pink-500/20 to-pink-800/20' },
};

export default function Passport({ user }: PassportProps) {
  const [isStaffView, setIsStaffView] = React.useState(false);
  const tierConfig = TIER_CONFIG[user.tier] || TIER_CONFIG['New-Gen'];
  const { color, icon: Icon, gradient } = tierConfig;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-sm aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel p-8 flex flex-col items-center justify-between shadow-2xl transition-all duration-500 ${isStaffView ? 'scale-105' : ''}`}
      >
        {/* Background Accent */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`}
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
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="p-4 bg-white rounded-2xl shadow-inner shadow-black/20 group cursor-pointer" onClick={() => setIsStaffView(!isStaffView)}>
            <QrCode size={isStaffView ? 200 : 160} color="#080808" className="transition-all duration-500" />
          </div>
          {isStaffView && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-12 bg-tgc-pink text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest animate-pulse"
            >
              Staff Verification Mode
            </motion.div>
          )}
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">{user.id}</p>
        </div>

        {/* Footer */}
        <div className="w-full space-y-4 relative z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-display text-xs uppercase tracking-wider opacity-40">Identity</p>
              <p className="font-display text-lg font-medium">{user.name}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-xs uppercase tracking-wider opacity-40">Admission</p>
              <p className="font-display text-sm font-bold text-tgc-pink">{user.ticketType}</p>
              <p className="font-display text-lg font-bold" style={{ color }}>{user.tier}</p>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-tgc-silver/10" />
          
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
            <span>Points: {user.points}</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified
            </span>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-sm grid grid-cols-4 gap-2">
        {['New-Gen', 'Trendsetter', 'Icon', 'Muse'].map((t) => (
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
