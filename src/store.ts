import { useState, useEffect } from 'react';
import { UserProfile, Mission, Product, Tier, TicketType } from './types';
import { MOCK_USER, MOCK_MISSIONS, MOCK_PRODUCTS } from './mockData';

const TIER_THRESHOLDS: Record<Tier, number> = {
  'New-Gen': 0,
  'Trendsetter': 1000,
  'Icon': 3000,
  'Muse': 6000,
};

const TICKET_MULTIPLIERS: Record<TicketType, number> = {
  'Standard': 1.0,
  'Priority': 1.2,
  'VVIP': 1.5,
};

export function useTgcStore() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tgc_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: Ensure all new fields exist if loading from old storage
      const merged = { ...MOCK_USER, ...parsed };
      
      // If the saved tier is not in our current config, recalculate it
      if (!TIER_THRESHOLDS[merged.tier as Tier]) {
        if (merged.points >= TIER_THRESHOLDS['Muse']) merged.tier = 'Muse';
        else if (merged.points >= TIER_THRESHOLDS['Icon']) merged.tier = 'Icon';
        else if (merged.points >= TIER_THRESHOLDS['Trendsetter']) merged.tier = 'Trendsetter';
        else merged.tier = 'New-Gen';
      }
      return merged;
    }
    return MOCK_USER;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('tgc_missions');
    return saved ? JSON.parse(saved) : MOCK_MISSIONS;
  });

  const [notification, setNotification] = useState<{message: string; type: 'success' | 'info'} | null>(null);

  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    localStorage.setItem('tgc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tgc_missions', JSON.stringify(missions));
  }, [missions]);

  const addPoints = (basePoints: number, reason: string) => {
    const multiplier = TICKET_MULTIPLIERS[user.ticketType];
    const earned = Math.round(basePoints * multiplier);
    
    setUser(prev => {
      const newPoints = prev.points + earned;
      let newTier = prev.tier;

      // Check for tier upgrade
      if (newPoints >= TIER_THRESHOLDS['Muse']) newTier = 'Muse';
      else if (newPoints >= TIER_THRESHOLDS['Icon']) newTier = 'Icon';
      else if (newPoints >= TIER_THRESHOLDS['Trendsetter']) newTier = 'Trendsetter';

      if (newTier !== prev.tier) {
        setNotification({
          message: `CONGRATS! You are now a ${newTier}!`,
          type: 'success'
        });
      }

      return {
        ...prev,
        points: newPoints,
        tier: newTier
      };
    });
  };

  const completeMission = (id: string) => {
    setMissions(prev => {
      const mission = prev.find(m => m.id === id);
      if (mission && !mission.isCompleted) {
        addPoints(mission.points, `Completed: ${mission.title}`);
        return prev.map(m => m.id === id ? { ...m, isCompleted: true } : m);
      }
      return prev;
    });
  };

  const claimVoucher = (id: string) => {
    setUser(prev => ({
      ...prev,
      vouchers: prev.vouchers.map(v => v.id === id ? { ...v, claimed: true } : v)
    }));
    setNotification({
      message: 'Voucher claimed successfully!',
      type: 'info'
    });
  };

  return {
    user,
    missions,
    products,
    notification,
    setNotification,
    completeMission,
    addPoints,
    claimVoucher
  };
}
