import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Vote, Share2, MapPin, QrCode } from 'lucide-react';
import { Mission } from '../types';

interface MissionsProps {
  missions: Mission[];
  onComplete: (id: string) => void;
}

export default function Missions({ missions, onComplete }: MissionsProps) {
  const completedCount = missions.filter(m => m.isCompleted).length;
  const progress = (completedCount / missions.length) * 100;

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Progress Card */}
      <div className="glass-panel rounded-2xl p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <QrCode size={80} />
        </div>
        <h3 className="font-display text-sm uppercase tracking-widest text-tgc-pink font-bold">Stamp Rally Progress</h3>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-display font-bold leading-none">{completedCount}</span>
          <span className="text-xl font-display opacity-40 leading-none">/ {missions.length}</span>
        </div>
        <div className="mt-4 h-1.5 w-full bg-tgc-silver/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-tgc-pink"
          />
        </div>
        <p className="mt-4 text-[10px] font-mono uppercase tracking-widest opacity-60">Unlock 'Muse' tier at 5 stamps</p>
      </div>

      {/* Mission List */}
      <div className="space-y-4">
        <h3 className="font-display text-xs uppercase tracking-[0.2em] opacity-40 ml-1">Today's Missions</h3>
        {missions.map((mission, idx) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => !mission.isCompleted && onComplete(mission.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
              mission.isCompleted 
                ? 'bg-tgc-silver/5 border-tgc-silver/10 grayscale' 
                : 'bg-tgc-grey/40 border-tgc-silver/20 cursor-pointer hover:border-tgc-pink/50'
            }`}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
              mission.isCompleted ? 'bg-tgc-silver/10' : 'bg-tgc-pink/10'
            }`}>
              {mission.type === 'Vote' && <Vote className={mission.isCompleted ? 'text-tgc-silver/40' : 'text-tgc-pink'} size={20} />}
              {mission.type === 'Social' && <Share2 className={mission.isCompleted ? 'text-tgc-silver/40' : 'text-tgc-pink'} size={20} />}
              {mission.type === 'CheckIn' && <MapPin className={mission.isCompleted ? 'text-tgc-silver/40' : 'text-tgc-pink'} size={20} />}
              {mission.type === 'Stamp' && <QrCode className={mission.isCompleted ? 'text-tgc-silver/40' : 'text-tgc-pink'} size={20} />}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-display text-sm font-bold ${mission.isCompleted ? 'opacity-40' : 'text-tgc-silver'}`}>
                {mission.title}
              </h4>
              <p className="text-[11px] opacity-40 mt-1 leading-tight">{mission.description}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] font-mono ${mission.isCompleted ? 'text-tgc-silver/20' : 'text-tgc-pink'}`}>
                +{mission.points} P
              </span>
              {mission.isCompleted ? (
                <CheckCircle2 className="text-emerald-500" size={18} />
              ) : (
                <Circle className="text-tgc-silver/20" size={18} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
