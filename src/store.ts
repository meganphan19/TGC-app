import { useState, useEffect } from 'react';
import { UserProfile, Mission, Product } from './types';
import { MOCK_USER, MOCK_MISSIONS, MOCK_PRODUCTS } from './mockData';

export function useTgcStore() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tgc_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('tgc_missions');
    return saved ? JSON.parse(saved) : MOCK_MISSIONS;
  });

  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    localStorage.setItem('tgc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tgc_missions', JSON.stringify(missions));
  }, [missions]);

  const completeMission = (id: string) => {
    setMissions(prev => {
      const mission = prev.find(m => m.id === id);
      if (mission && !mission.isCompleted) {
        const updated = prev.map(m => m.id === id ? { ...m, isCompleted: true } : m);
        setUser(u => ({ ...u, points: u.points + mission.points }));
        return updated;
      }
      return prev;
    });
  };

  return {
    user,
    missions,
    products,
    completeMission,
  };
}
