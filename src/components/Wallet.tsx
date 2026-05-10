import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Gift, ExternalLink, Clock, CheckCircle, Star } from 'lucide-react';
import { Voucher } from '../types';

interface WalletProps {
  user: UserProfile;
  onClaim: (id: string) => void;
}

const TIER_BENEFITS: Record<Tier, string[]> = {
  'New-Gen': ['Access to all Sponsor Booths', 'Standard Seating'],
  'Trendsetter': ['Priority Entrance', '5% Discount at Official Shop', 'Access to Beauty Zone'],
  'Icon': ['Front-row Potential', 'Backstage Tour Chance', '10% Discount at Official Shop'],
  'Muse': ['VVIP Lounge Access', 'Private Concierge', 'Runway After-party Ticket'],
};

export default function Wallet({ user, onClaim }: WalletProps) {
  const vouchers = user.vouchers || [];
  const activeVouchers = vouchers.filter(v => !v.claimed);
  const claimedVouchers = vouchers.filter(v => v.claimed);
  const benefits = TIER_BENEFITS[user.tier] || [];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Ticket size={100} />
        </div>
        <h3 className="font-display text-xs uppercase tracking-[0.2em] text-tgc-pink font-bold">My Rewards Wallet</h3>
        <p className="text-sm opacity-60 mt-1">Tier benefits and sponsor rewards</p>
      </div>

      <div className="space-y-6">
        {/* Active Vouchers */}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] uppercase tracking-widest opacity-40 px-2">Ready to use</h4>
          {activeVouchers.length === 0 && (
            <div className="p-8 text-center glass-panel rounded-2xl opacity-40 italic text-xs">
              No active vouchers yet. Complete missions to earn more!
            </div>
          )}
          {activeVouchers.map((voucher) => (
            <motion.div 
              key={voucher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-tgc-grey/60 border border-tgc-silver/20 rounded-2xl overflow-hidden flex"
            >
              <div className="w-1/3 bg-tgc-pink flex flex-col items-center justify-center p-4 text-white">
                <span className="text-2xl font-black font-display leading-none">{voucher.discount}</span>
                <span className="text-[10px] uppercase font-bold tracking-tighter opacity-80 mt-1">Discount</span>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-r from-tgc-grey/40 to-transparent flex flex-col justify-between">
                <div>
                  <h5 className="font-display font-bold text-sm">{voucher.brand}</h5>
                  <p className="text-[11px] opacity-60 line-clamp-1">{voucher.title}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-[9px] font-mono opacity-40">
                    <Clock size={10} /> Exp: {voucher.expiry}
                  </div>
                  <button 
                    onClick={() => onClaim(voucher.id)}
                    className="bg-white text-tgc-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full hover:bg-tgc-pink hover:text-white transition-colors"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Claimed/History */}
        <div className="space-y-3">
          <h4 className="font-display text-[10px] uppercase tracking-widest opacity-40 px-2">Recently Used</h4>
          {claimedVouchers.map((voucher) => (
            <div key={voucher.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4 opacity-50 grayscale transition-all hover:grayscale-0">
              <div className="w-10 h-10 rounded-xl bg-tgc-silver/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-500" />
              </div>
              <div className="flex-1">
                <h5 className="font-display font-bold text-sm">{voucher.brand}</h5>
                <p className="text-[10px] uppercase font-mono tracking-widest opacity-40">{voucher.code}</p>
              </div>
              <Gift size={16} className="opacity-20" />
            </div>
          ))}
        </div>

        {/* Benefit Banners */}
        <div className="space-y-3 pt-4">
          <h4 className="font-display text-[10px] uppercase tracking-widest opacity-40 px-2">{user.tier} Privileges</h4>
          <div className="flex flex-col gap-3">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="neo-border rounded-2xl p-4 bg-gradient-to-br from-tgc-pink/10 to-transparent flex gap-4 items-center"
              >
                <div className="w-10 h-10 rounded-full bg-tgc-pink/10 flex items-center justify-center text-tgc-pink">
                  <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <p className="font-display text-xs font-bold">{benefit}</p>
                  <p className="text-[10px] opacity-40 mt-1 uppercase tracking-tighter">Exclusive for {user.tier}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
